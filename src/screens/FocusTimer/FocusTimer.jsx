import React, { useEffect } from 'react';
import LayoutContainer from '../../components/layout/LayoutContainer';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { useTimer } from '../../context/TimerContext';
import { useSettings } from '../../context/SettingsContext';
import { TIMER_MODE } from '../../utils/constants';
import { Play, Pause, RotateCcw, Coffee } from 'lucide-react';
import styles from './FocusTimer.styles';

const FocusTimer = () => {
  const {
    timeRemaining,
    mode,
    state,
    sessionsCompleted,
    startTimer,
    pauseTimer,
    resetTimer,
    switchMode,
    formatTime,
    isRunning,
    isPaused,
    isIdle,
    isCompleted,
  } = useTimer();

  const { settings } = useSettings();

  // Handle timer completion notification
  useEffect(() => {
    if (isCompleted && settings.notifications) {
      // Browser notification
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification(
          mode === TIMER_MODE.WORK ? 'Focus Session Complete!' : 'Break Time Over!',
          {
            body: mode === TIMER_MODE.WORK 
              ? 'Great work! Time for a break.' 
              : 'Break time is over. Ready to focus?',
            icon: '/favicon.ico',
          }
        );
      }
    }
  }, [isCompleted, mode, settings.notifications]);

  // Request notification permission on mount
  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default' && settings.notifications) {
      Notification.requestPermission();
    }
  }, [settings.notifications]);

  const handleStart = () => {
    startTimer();
  };

  const handlePause = () => {
    pauseTimer();
  };

  const handleReset = () => {
    resetTimer();
  };

  const handleModeSwitch = () => {
    const newMode = mode === TIMER_MODE.WORK ? TIMER_MODE.BREAK : TIMER_MODE.WORK;
    switchMode(newMode);
  };

  const time = formatTime();

  return (
    <LayoutContainer>
      <div style={styles.container}>
        <header style={styles.header}>
          <h1 style={styles.title}>Focus Timer</h1>
          <p style={styles.subtitle}>Stay focused, stay productive</p>
        </header>

        <div style={styles.timerWrapper}>
          <Card style={styles.timerCard}>
            <div style={styles.modeIndicator}>
              {mode === TIMER_MODE.WORK ? (
                <span style={styles.modeBadge}>Work Session</span>
              ) : (
                <span style={{ ...styles.modeBadge, background: 'rgba(34, 197, 94, 0.16)', color: 'var(--ff-color-accent)' }}>
                  <Coffee size={16} style={{ marginRight: '6px' }} />
                  Break Time
                </span>
              )}
            </div>

            <div style={styles.timerDisplay}>
              <div style={styles.timeText}>
                {time.total}
              </div>
            </div>

            <div style={styles.controls}>
              {isIdle || isCompleted ? (
                <Button
                  variant="primary"
                  size="lg"
                  onClick={handleStart}
                  style={styles.controlButton}
                >
                  <Play size={24} style={{ marginRight: '8px' }} />
                  Start
                </Button>
              ) : isRunning ? (
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={handlePause}
                  style={styles.controlButton}
                >
                  <Pause size={24} style={{ marginRight: '8px' }} />
                  Pause
                </Button>
              ) : (
                <Button
                  variant="primary"
                  size="lg"
                  onClick={handleStart}
                  style={styles.controlButton}
                >
                  <Play size={24} style={{ marginRight: '8px' }} />
                  Resume
                </Button>
              )}
              
              <Button
                variant="ghost"
                size="lg"
                onClick={handleReset}
                style={styles.controlButton}
                disabled={isRunning}
              >
                <RotateCcw size={24} style={{ marginRight: '8px' }} />
                Reset
              </Button>
            </div>

            {isCompleted && (
              <div style={styles.completedMessage}>
                <p style={styles.completedText}>
                  {mode === TIMER_MODE.WORK 
                    ? '🎉 Great work! Session completed!' 
                    : 'Break time is over. Ready to focus?'}
                </p>
                <Button
                  variant="secondary"
                  onClick={handleModeSwitch}
                  style={styles.switchButton}
                >
                  Switch to {mode === TIMER_MODE.WORK ? 'Break' : 'Work'}
                </Button>
              </div>
            )}

            <div style={styles.stats}>
              <div style={styles.statItem}>
                <span style={styles.statLabel}>Sessions Today</span>
                <span style={styles.statValue}>{sessionsCompleted}</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </LayoutContainer>
  );
};

export default FocusTimer;
