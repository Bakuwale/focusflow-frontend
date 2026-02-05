import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import storageService from '../services/storageService';
import gamificationService from '../services/gamificationService';
import { TIMER_MODE, TIMER_STATE } from '../utils/constants';

const TimerContext = createContext();

export const useTimer = () => {
  const context = useContext(TimerContext);
  if (!context) {
    throw new Error('useTimer must be used within a TimerProvider');
  }
  return context;
};

export const TimerProvider = ({ children }) => {
  const [timeRemaining, setTimeRemaining] = useState(25 * 60); // in seconds
  const [mode, setMode] = useState(TIMER_MODE.WORK);
  const [state, setState] = useState(TIMER_STATE.IDLE);
  const [sessionsCompleted, setSessionsCompleted] = useState(0);
  const [totalFocusMinutes, setTotalFocusMinutes] = useState(0);

  const intervalRef = useRef(null);
  const settings = storageService.getSettings();

  // Load sessions and stats from localStorage
  useEffect(() => {
    const sessions = storageService.getSessions();
    setSessionsCompleted(sessions.length);
    
    const totalMinutes = sessions.reduce((sum, session) => {
      return sum + (session.duration || 0);
    }, 0);
    setTotalFocusMinutes(totalMinutes);
  }, []);

  // Initialize timer with settings
  useEffect(() => {
    const workDuration = settings.workDuration || 25;
    setTimeRemaining(workDuration * 60);
  }, [settings.workDuration]);

  // Handle timer completion
  const handleTimerComplete = useCallback(() => {
    const workDuration = settings.workDuration || 25;
    const breakDuration = settings.breakDuration || 5;

    // Save session if it was a work session
    if (mode === TIMER_MODE.WORK) {
      const session = {
        id: Date.now().toString(),
        duration: workDuration,
        completedAt: new Date().toISOString(),
        mode: TIMER_MODE.WORK,
      };

      const sessions = storageService.getSessions();
      sessions.push(session);
      storageService.saveSessions(sessions);

      setSessionsCompleted((prev) => prev + 1);
      setTotalFocusMinutes((prev) => prev + workDuration);

      // Reward XP for completing focus session
      gamificationService.rewardFocusSession();
    }

    // Switch mode
    const newMode = mode === TIMER_MODE.WORK ? TIMER_MODE.BREAK : TIMER_MODE.WORK;
    setMode(newMode);
    setTimeRemaining(newMode === TIMER_MODE.WORK ? workDuration * 60 : breakDuration * 60);
    setState(TIMER_STATE.COMPLETED);
  }, [mode, settings]);

  // Timer countdown logic
  useEffect(() => {
    if (state === TIMER_STATE.RUNNING) {
      intervalRef.current = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            // Timer completed
            handleTimerComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [state, handleTimerComplete]);

  // Start timer
  const startTimer = () => {
    setState(TIMER_STATE.RUNNING);
  };

  // Pause timer
  const pauseTimer = () => {
    setState(TIMER_STATE.PAUSED);
  };

  // Reset timer
  const resetTimer = () => {
    const workDuration = settings.workDuration || 25;
    const breakDuration = settings.breakDuration || 5;
    const duration = mode === TIMER_MODE.WORK ? workDuration : breakDuration;
    
    setTimeRemaining(duration * 60);
    setState(TIMER_STATE.IDLE);
  };

  // Switch mode
  const switchMode = (newMode) => {
    const workDuration = settings.workDuration || 25;
    const breakDuration = settings.breakDuration || 5;
    const duration = newMode === TIMER_MODE.WORK ? workDuration : breakDuration;
    
    setMode(newMode);
    setTimeRemaining(duration * 60);
    setState(TIMER_STATE.IDLE);
  };

  // Format time as MM:SS
  const formatTime = () => {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    return {
      minutes: String(minutes).padStart(2, '0'),
      seconds: String(seconds).padStart(2, '0'),
      total: `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`,
    };
  };

  // Get total focus hours
  const getTotalFocusHours = () => {
    return (totalFocusMinutes / 60).toFixed(1);
  };

  const value = {
    timeRemaining,
    mode,
    state,
    sessionsCompleted,
    totalFocusMinutes,
    totalFocusHours: getTotalFocusHours(),
    startTimer,
    pauseTimer,
    resetTimer,
    switchMode,
    formatTime,
    isRunning: state === TIMER_STATE.RUNNING,
    isPaused: state === TIMER_STATE.PAUSED,
    isIdle: state === TIMER_STATE.IDLE,
    isCompleted: state === TIMER_STATE.COMPLETED,
  };

  return <TimerContext.Provider value={value}>{children}</TimerContext.Provider>;
};
