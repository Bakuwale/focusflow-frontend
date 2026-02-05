import React, { useEffect, useState } from 'react';
import LayoutContainer from '../../components/layout/LayoutContainer';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { useTimer } from '../../context/TimerContext';
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
    endTimer,
    resetTimer,
    switchMode,
    formatTime,
    isRunning,
    isPaused,
    isIdle,
    isCompleted,
  } = useTimer();

  const [endMessage, setEndMessage] = useState('');
  const [showEndMessage, setShowEndMessage] = useState(false);

  // Handle timer completion notification
  useEffect(() => {
    if (isCompleted) {
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
  }, [isCompleted, mode]);

  // Request notification permission on mount
  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  const handleStart = () => {
    startTimer();
    setShowEndMessage(false);
  };

  const handlePause = () => {
    pauseTimer();
  };

  const handleEnd = () => {
    const timeSpent = endTimer();
    const totalSeconds = Math.round(timeSpent * 60); // Convert minutes to seconds
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    
    let message = '';
    if (hours > 0) {
      message = `You spent ${hours} hour${hours > 1 ? 's' : ''}`;
      if (minutes > 0) {
        message += `, ${minutes} minute${minutes > 1 ? 's' : ''}`;
      }
      if (seconds > 0) {
        message += `, and ${seconds} second${seconds > 1 ? 's' : ''}`;
      }
      message += ' in focus mode.';
    } else if (minutes > 0) {
      message = `You spent ${minutes} minute${minutes > 1 ? 's' : ''}`;
      if (seconds > 0) {
        message += ` and ${seconds} second${seconds > 1 ? 's' : ''}`;
      }
      message += ' in focus mode.';
    } else {
      message = `You spent ${seconds} second${seconds > 1 ? 's' : ''} in focus mode.`;
    }
    
    setEndMessage(message);
    setShowEndMessage(true);
    
    // Hide message after 5 seconds
    setTimeout(() => {
      setShowEndMessage(false);
    }, 5000);
  };

  const handleReset = () => {
    resetTimer();
    setShowEndMessage(false);
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

            {/* End Session Message */}
            {showEndMessage && (
              <div style={{
                padding: '16px',
                background: 'rgba(34, 197, 94, 0.1)',
                border: '1px solid rgba(34, 197, 94, 0.3)',
                borderRadius: 'var(--ff-radius-sm)',
                color: 'var(--ff-color-accent)',
                textAlign: 'center',
                fontSize: '14px',
                fontWeight: 500,
                margin: '16px 0'
              }}>
                ✅ {endMessage}
                <br />
                <span style={{ fontSize: '12px', opacity: 0.8 }}>
                  Time recorded in analytics and dashboard.
                </span>
              </div>
            )}

            <div style={styles.controls}>
              {isIdle ? (
                // Only Start button when idle
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
                // Only Pause button when running
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={handlePause}
                  style={styles.controlButton}
                >
                  <Pause size={24} style={{ marginRight: '8px' }} />
                  Pause
                </Button>
              ) : isPaused ? (
                // Resume, End, and Reset buttons when paused
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
                  <Button
                    variant="primary"
                    size="md"
                    onClick={handleStart}
                  >
                    <Play size={20} style={{ marginRight: '6px' }} />
                    Resume
                  </Button>
                  
                  <Button
                    variant="secondary"
                    size="md"
                    onClick={handleEnd}
                    style={{ background: 'var(--ff-color-accent)', color: 'white' }}
                  >
                    End Session
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="md"
                    onClick={handleReset}
                  >
                    <RotateCcw size={20} style={{ marginRight: '6px' }} />
                    Reset
                  </Button>
                </div>
              ) : null}
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
