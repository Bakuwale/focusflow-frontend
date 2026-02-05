const styles = {
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: 'none',
    borderRadius: 'var(--ff-radius-sm)',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    fontFamily: 'inherit',
    outline: 'none',
    ':focus': {
      outline: '2px solid var(--ff-color-primary)',
      outlineOffset: '2px',
    },
  },
  
  variants: {
    default: {
      background: 'var(--ff-color-surface-soft)',
      color: 'var(--ff-color-text)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      ':hover': {
        background: 'var(--ff-color-surface-hover)',
      },
    },
    
    primary: {
      background: 'var(--ff-color-primary)',
      color: 'white',
      ':hover': {
        background: 'var(--ff-color-primary-hover)',
      },
    },
    
    ghost: {
      background: 'transparent',
      color: 'var(--ff-color-text-muted)',
      ':hover': {
        background: 'rgba(255, 255, 255, 0.1)',
        color: 'var(--ff-color-text)',
      },
    },
    
    danger: {
      background: 'transparent',
      color: 'var(--ff-color-danger)',
      ':hover': {
        background: 'rgba(239, 68, 68, 0.1)',
      },
    },
  },
  
  sizes: {
    sm: {
      padding: '6px',
      fontSize: '14px',
    },
    
    md: {
      padding: '8px',
      fontSize: '16px',
    },
    
    lg: {
      padding: '12px',
      fontSize: '18px',
    },
  },
  
  disabled: {
    opacity: 0.5,
    cursor: 'not-allowed',
    pointerEvents: 'none',
  },
};

export default styles;