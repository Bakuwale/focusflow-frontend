export const wrapper = {
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  width: '100%',
};

export const label = {
  fontSize: '14px',
  fontWeight: 600,
  color: 'var(--ff-color-text)',
};

export const input = {
  width: '100%',
  padding: '12px 16px',
  background: 'var(--ff-color-surface-soft)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  borderRadius: 'var(--ff-radius-sm)',
  color: 'var(--ff-color-text)',
  fontSize: '16px',
  transition: 'border-color 0.2s ease',
};

export const inputError = {
  ...input,
  borderColor: 'var(--ff-color-danger)',
};

export const errorText = {
  fontSize: '12px',
  color: 'var(--ff-color-danger)',
};

export default { wrapper, label, input, inputError, errorText };
