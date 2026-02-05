import React from 'react';
import { buttonBase, variants, sizes } from './Button.styles';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  fullWidth = false,
  disabled = false,
  onClick,
  type = 'button',
  style = {},
  ...props 
}) => {
  const buttonStyle = {
    ...buttonBase,
    ...variants[variant],
    ...sizes[size],
    ...(fullWidth && { width: '100%' }),
    ...(disabled && { opacity: 0.5, cursor: 'not-allowed', pointerEvents: 'none' }),
    ...style,
  };

  return (
    <button
      type={type}
      style={buttonStyle}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
