import React from 'react';
import { wrapper, label, input, inputError, errorText } from './Input.styles';

const Input = ({ 
  label: labelText, 
  type = 'text', 
  placeholder, 
  value, 
  onChange,
  error,
  style = {},
  ...props 
}) => {
  return (
    <div style={wrapper}>
      {labelText && <label style={label}>{labelText}</label>}
      <input
        type={type}
        style={{ ...(error ? inputError : input), ...style }}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        {...props}
      />
      {error && <span style={errorText}>{error}</span>}
    </div>
  );
};

export default Input;
