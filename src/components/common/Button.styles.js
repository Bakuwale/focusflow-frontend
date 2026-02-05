export const buttonBase = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontWeight: 600,
  borderRadius: 'var(--ff-radius-sm)',
  transition: 'all 0.2s ease',
  cursor: 'pointer',
  touchAction: 'manipulation',
  WebkitTapHighlightColor: 'transparent',
  border: 'none',
};

export const variants = {
  primary: {
    background: 'var(--ff-color-primary)',
    color: 'white',
  },
  secondary: {
    background: 'var(--ff-color-surface)',
    color: 'var(--ff-color-text)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
  },
  ghost: {
    background: 'transparent',
    color: 'var(--ff-color-text)',
  },
};

export const sizes = {
  sm: { padding: '8px 16px', fontSize: '14px' },
  md: { padding: '12px 24px', fontSize: '16px' },
  lg: { padding: '16px 32px', fontSize: '18px' },
};

export default { buttonBase, variants, sizes };
