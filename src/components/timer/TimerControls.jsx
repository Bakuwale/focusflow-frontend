import React, { useState } from 'react';
import { useTimer } from '../../context/TimerContext';

const TimerControls = () => {
  const { 
    isRunning, 
    isPaused, 
    isIdle, 
    startTimer, 
    pauseTimer, 
    endTimer,
    resetTimer,
    toggleFocusMode,
    mode
  } = useTimer();

  const [endMessage, setEndMessage] = useState('');
  const [showEndMessage, setShowEndMessage] = useState(false);

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

  const handleStart = () => {
    startTimer();
    setShowEndMessage(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
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
          maxWidth: '300px'
        }}>
          ✅ {endMessage}
          <br />
          <span style={{ fontSize: '12px', opacity: 0.8 }}>
            Time recorded in analytics and dashboard.
          </span>
        </div>
      )}

      {/* Button Controls */}
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        {isIdle ? (
          // Only Start button when idle
          <button
            onClick={handleStart}
            style={{
              padding: '12px 24px',
              background: 'var(--ff-color-primary)',
              color: 'white',
              border: 'none',
              borderRadius: 'var(--ff-radius-sm)',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: 600
            }}
          >
            ▶️ Start
          </button>
        ) : isRunning ? (
          // Only Pause button when running
          <button
            onClick={pauseTimer}
            style={{
              padding: '12px 24px',
              background: 'var(--ff-color-surface)',
              color: 'var(--ff-color-text)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: 'var(--ff-radius-sm)',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: 600
            }}
          >
            ⏸️ Pause
          </button>
        ) : isPaused ? (
          // Resume, End, and Reset buttons when paused
          <>
            <button
              onClick={handleStart}
              style={{
                padding: '12px 20px',
                background: 'var(--ff-color-primary)',
                color: 'white',
                border: 'none',
                borderRadius: 'var(--ff-radius-sm)',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 600
              }}
            >
              ▶️ Resume
            </button>
            
            <button
              onClick={handleEnd}
              style={{
                padding: '12px 20px',
                background: 'var(--ff-color-accent)',
                color: 'white',
                border: 'none',
                borderRadius: 'var(--ff-radius-sm)',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 600
              }}
            >
              ⏹️ End
            </button>
            
            <button
              onClick={handleReset}
              style={{
                padding: '12px 20px',
                background: 'transparent',
                color: 'var(--ff-color-text-muted)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: 'var(--ff-radius-sm)',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 600
              }}
            >
              🔄 Reset
            </button>
          </>
        ) : null}
      </div>
      
      {mode === 'work' && isIdle && (
        <button
          onClick={toggleFocusMode}
          style={{
            padding: '8px 16px',
            background: 'transparent',
            color: 'var(--ff-color-primary)',
            border: '1px solid var(--ff-color-primary)',
            borderRadius: 'var(--ff-radius-sm)',
            cursor: 'pointer',
            fontSize: '14px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          👁️ Focus Mode
        </button>
      )}
    </div>
  );
};

export default TimerControls;