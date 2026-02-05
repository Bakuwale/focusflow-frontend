export const wrapper = {
  width: '100%',
};

export const labelWrapper = {
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '8px',
  fontSize: '14px',
};

export const label = {
  color: 'var(--ff-color-text-muted)',
};

export const value = {
  color: 'var(--ff-color-text)',
  fontWeight: 600,
};

export const track = {
  width: '100%',
  height: '8px',
  background: 'var(--ff-color-surface-soft)',
  borderRadius: 'var(--ff-radius-pill)',
  overflow: 'hidden',
};

export const fill = {
  height: '100%',
  background: 'linear-gradient(90deg, var(--ff-color-primary), var(--ff-color-accent))',
  borderRadius: 'var(--ff-radius-pill)',
  transition: 'width 0.3s ease',
};

export default { wrapper, labelWrapper, label, value, track, fill };
