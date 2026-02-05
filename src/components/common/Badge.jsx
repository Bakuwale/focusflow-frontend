import React from 'react';
import { badgeBase, variants, sizes } from './Badge.styles';

const Badge = ({ children, variant = 'default', size = 'md', style = {}, ...props }) => {
  const badgeStyle = {
    ...badgeBase,
    ...variants[variant],
    ...sizes[size],
    ...style,
  };

  return (
    <span style={badgeStyle} {...props}>
      {children}
    </span>
  );
};

export default Badge;
