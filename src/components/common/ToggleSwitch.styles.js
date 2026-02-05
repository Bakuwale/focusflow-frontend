export const wrapper = {
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  cursor: 'pointer',
  userSelect: 'none',
};

export const input = {
  position: 'absolute',
  opacity: 0,
  width: 0,
  height: 0,
};

export const sliderBase = {
  position: 'relative',
  width: '48px',
  height: '28px',
  background: 'var(--ff-color-surface-soft)',
  borderRadius: 'var(--ff-radius-pill)',
  transition: 'background 0.3s ease',
  flexShrink: 0,
};

export const sliderChecked = {
  ...sliderBase,
  background: 'var(--ff-color-primary)',
};

export const label = {
  fontSize: '16px',
  color: 'var(--ff-color-text)',
  fontWeight: 500,
};

export default { wrapper, input, sliderBase, sliderChecked, label };
