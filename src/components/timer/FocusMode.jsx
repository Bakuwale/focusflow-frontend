import React from 'react';
import { useTimer } from '../../context/TimerContext';

const FocusMode = () => {
  const { isFocusMode, toggleFocusMode, formatTime, mode } = useTimer();

  if (!isFocusMode) return null;

  const time = formatTime();

  return (
    <div style={{
      position: 'fixed',
      top: '20px',
      right: '20px',
      zIndex: 1000,
      background: 'var(--ff-color-surface)',
      border: '2px solid var(--ff-color-primary)',
      borderRadius: 'var(--ff-radius-lg)',
      padding: '20px',
      minWidth: '200px',
      textAlign: 'center',
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)',
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '12px'
      }}>
        <span style={{
          fontSize: '14px',
          color: 'var(--ff-color-primary)',
          fontWeight: 600
        }}>
          {mode === 'work' ? '🎯 Focus Time' : '☕ Break Time'}
        </span>
        <button
          onClick={toggleFocusMode}
          style={{
            background: 'transparent',
            border: 'none',
            color: 'var(--ff-color-text-muted)',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          ×
        </button>
      </div>
      
      <div style={{
        fontSize: '32px',
        fontWeight: 700,
        color: 'var(--ff-color-text)',
        fontFamily: 'monospace',
        marginBottom: '8px'
      }}>
        {time.total}
      </div>
      
      <div style={{
        fontSize: '12px',
        color: 'var(--ff-color-text-muted)',
        fontStyle: 'italic'
      }}>
        {mode === 'work' ? 'Stay focused!' : 'Take a break!'}
      </div>
    </div>
  );
};

export default FocusMode;