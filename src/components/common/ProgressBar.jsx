import React from 'react';
import { wrapper, labelWrapper, label, value, track, fill } from './ProgressBar.styles';

const ProgressBar = ({ value: progressValue, max = 100, showLabel = false, ...props }) => {
  const percentage = Math.min((progressValue / max) * 100, 100);
  
  return (
    <div style={wrapper} {...props}>
      {showLabel && (
        <div style={labelWrapper}>
          <span style={label}>Progress</span>
          <span style={value}>{Math.round(percentage)}%</span>
        </div>
      )}
      <div style={track}>
        <div 
          style={{ ...fill, width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
