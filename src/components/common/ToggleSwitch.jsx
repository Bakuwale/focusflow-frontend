import React from 'react';
import { wrapper, sliderBase, sliderChecked, label } from './ToggleSwitch.styles';

const ToggleSwitch = ({ checked, onChange, label: labelText, ...props }) => {
  return (
    <label style={wrapper}>
      <input
        type="checkbox"
        style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }}
        checked={checked}
        onChange={onChange}
        {...props}
      />
      <span style={checked ? sliderChecked : sliderBase}>
        <span style={{
          position: 'absolute',
          top: '4px',
          left: checked ? '24px' : '4px',
          width: '20px',
          height: '20px',
          background: 'white',
          borderRadius: '50%',
          transition: 'left 0.3s ease',
        }}></span>
      </span>
      {labelText && <span style={label}>{labelText}</span>}
    </label>
  );
};

export default ToggleSwitch;
