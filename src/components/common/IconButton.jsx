import React from 'react';
import styles from './IconButton.styles';

const IconButton = ({ 
  children, 
  variant = 'default', 
  size = 'md', 
  disabled = false,
  onClick,
  title,
  style = {},
  ...props 
}) => {
  const buttonStyle = {
    ...styles.base,
    ...styles.variants[variant],
    ...styles.sizes[size],
    ...(disabled && styles.disabled),
    ...style,
  };

  return (
    <button
      type="button"
      style={buttonStyle}
      onClick={onClick}
      disabled={disabled}
      title={title}
      {...props}
    >
      {children}
    </button>
  );
};

export default IconButton;