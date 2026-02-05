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
  const [isFocusMode, setIsFocusMode] = useState(false);

  const intervalRef = useRef(null);
  
  // Use default settings since we removed SettingsContext
  const defaultSettings = {
    workDuration: 25,
    breakDuration: 5,
  };

  // Load sessions and stats from localStorage
  useEffect(() => {
    loadSessionData();
  }, []);

  // Function to reload session data
  const loadSessionData = () => {
    const sessions = storageService.getSessions();
    setSessionsCompleted(sessions.length);
    
    const totalMinutes = sessions.reduce((sum, session) => {
      return sum + (session.duration || 0);
    }, 0);
    setTotalFocusMinutes(totalMinutes);
  };

  // Initialize timer with default settings
  useEffect(() => {
    const workDuration = defaultSettings.workDuration || 25;
    setTimeRemaining(workDuration * 60);
  }, []);

  // Handle timer completion
  const handleTimerComplete = useCallback(() => {
    const workDuration = defaultSettings.workDuration || 25;
    const breakDuration = defaultSettings.breakDuration || 5;

    // Save session if it was a work session (even if not completed)
    if (mode === TIMER_MODE.WORK) {
      const actualDuration = workDuration; // Full duration since it completed naturally
      const session = {
        id: Date.now().toString(),
        duration: actualDuration,
        completedAt: new Date().toISOString(),
        mode: TIMER_MODE.WORK,
        isComplete: true, // Mark as fully completed
      };

      const sessions = storageService.getSessions();
      sessions.push(session);
      storageService.saveSessions(sessions);

      setSessionsCompleted((prev) => prev + 1);
      setTotalFocusMinutes((prev) => prev + actualDuration);

      // Force immediate reload of session data
      setTimeout(() => loadSessionData(), 100);

      // Reward XP for completing focus session (only if fully completed)
      gamificationService.rewardFocusSession();
    }

    // Auto-restart: Switch mode and start new session
    const newMode = mode === TIMER_MODE.WORK ? TIMER_MODE.BREAK : TIMER_MODE.WORK;
    setMode(newMode);
    setTimeRemaining(newMode === TIMER_MODE.WORK ? workDuration * 60 : breakDuration * 60);
    
    // Auto-start the next session
    setState(TIMER_STATE.RUNNING);
    setIsFocusMode(false);
  }, [mode, defaultSettings]);

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
    if (mode === TIMER_MODE.WORK) {
      setIsFocusMode(true);
    }
  };

  // Pause timer
  const pauseTimer = () => {
    setState(TIMER_STATE.PAUSED);
  };

  // End timer session (new function)
  const endTimer = () => {
    // Calculate time spent
    const workDuration = defaultSettings.workDuration || 25;
    const timeSpent = (workDuration * 60 - timeRemaining) / 60;
    
    if (timeSpent >= 0.01) { // Only save if at least 0.6 seconds (0.01 minute) was spent
      const session = {
        id: Date.now().toString(),
        duration: timeSpent,
        completedAt: new Date().toISOString(),
        mode: TIMER_MODE.WORK,
        isComplete: false, // Mark as manually ended
      };

      const sessions = storageService.getSessions();
      sessions.push(session);
      storageService.saveSessions(sessions);

      // Force immediate update of session data
      loadSessionData();
    }

    // Reset to idle state
    const duration = workDuration;
    setTimeRemaining(duration * 60);
    setState(TIMER_STATE.IDLE);
    setIsFocusMode(false);
    
    return timeSpent; // Return time spent for display
  };

  // Reset timer
  const resetTimer = () => {
    const workDuration = defaultSettings.workDuration || 25;
    const breakDuration = defaultSettings.breakDuration || 5;
    const duration = mode === TIMER_MODE.WORK ? workDuration : breakDuration;
    
    setTimeRemaining(duration * 60);
    setState(TIMER_STATE.IDLE);
    setIsFocusMode(false);
  };

  // Switch mode
  const switchMode = (newMode) => {
    const workDuration = defaultSettings.workDuration || 25;
    const breakDuration = defaultSettings.breakDuration || 5;
    const duration = newMode === TIMER_MODE.WORK ? workDuration : breakDuration;
    
    setMode(newMode);
    setTimeRemaining(duration * 60);
    setState(TIMER_STATE.IDLE);
    setIsFocusMode(false);
  };

  // Toggle focus mode manually
  const toggleFocusMode = () => {
    setIsFocusMode(!isFocusMode);
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

  // Get total focus hours (all time)
  const getTotalFocusHours = () => {
    return (totalFocusMinutes / 60).toFixed(1);
  };

  // Get today's focus hours
  const getTodayFocusHours = () => {
    const sessions = storageService.getSessions();
    const today = new Date().toISOString().split('T')[0];
    
    const todaySessions = sessions.filter(session => {
      const sessionDate = new Date(session.completedAt).toISOString().split('T')[0];
      return sessionDate === today;
    });
    
    const todayMinutes = todaySessions.reduce((sum, session) => {
      return sum + (session.duration || 0);
    }, 0);
    
    return (todayMinutes / 60).toFixed(1);
  };

  const value = {
    timeRemaining,
    mode,
    state,
    sessionsCompleted,
    totalFocusMinutes,
    totalFocusHours: getTotalFocusHours(),
    todayFocusHours: getTodayFocusHours(),
    isFocusMode,
    startTimer,
    pauseTimer,
    endTimer,
    resetTimer,
    switchMode,
    toggleFocusMode,
    formatTime,
    refreshData: loadSessionData, // Add refresh function
    isRunning: state === TIMER_STATE.RUNNING,
    isPaused: state === TIMER_STATE.PAUSED,
    isIdle: state === TIMER_STATE.IDLE,
    isCompleted: state === TIMER_STATE.COMPLETED,
  };

  return <TimerContext.Provider value={value}>{children}</TimerContext.Provider>;
};
