export const badgeBase = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontWeight: 600,
  borderRadius: 'var(--ff-radius-pill)',
  textTransform: 'uppercase',
  fontSize: '11px',
  letterSpacing: '0.5px',
};

export const variants = {
  default: {
    background: 'var(--ff-color-surface-soft)',
    color: 'var(--ff-color-text)',
  },
  primary: {
    background: 'var(--ff-color-primary-soft)',
    color: 'var(--ff-color-primary)',
  },
  success: {
    background: 'rgba(34, 197, 94, 0.16)',
    color: 'var(--ff-color-accent)',
  },
  warning: {
    background: 'rgba(249, 115, 22, 0.16)',
    color: 'var(--ff-color-warning)',
  },
  danger: {
    background: 'rgba(239, 68, 68, 0.16)',
    color: 'var(--ff-color-danger)',
  },
};

export const sizes = {
  sm: { padding: '4px 10px', fontSize: '10px' },
  md: { padding: '6px 12px', fontSize: '11px' },
  lg: { padding: '8px 16px', fontSize: '12px' },
};

export default { badgeBase, variants, sizes };
