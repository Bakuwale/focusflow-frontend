import React from 'react';
import { useTimer } from '../../context/TimerContext';
import styles from './TimerDisplay.styles';

const TimerDisplay = () => {
  const { formatTime, mode } = useTimer();
  const time = formatTime();

  return (
    <div style={styles.container}>
      <div style={styles.timeDisplay}>
        <span style={styles.minutes}>{time.minutes}</span>
        <span style={styles.separator}>:</span>
        <span style={styles.seconds}>{time.seconds}</span>
      </div>
      <div style={styles.modeLabel}>
        {mode === 'work' ? 'Focus Time' : 'Break Time'}
      </div>
    </div>
  );
};

export default TimerDisplay;