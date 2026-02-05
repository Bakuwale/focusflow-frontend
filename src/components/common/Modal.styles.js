export const overlay = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: 'rgba(0, 0, 0, 0.75)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 10000,
  padding: '20px',
};

export const modal = {
  background: 'var(--ff-color-surface)',
  borderRadius: 'var(--ff-radius-lg)',
  width: '100%',
  maxWidth: '500px',
  maxHeight: '90vh',
  overflow: 'auto',
  boxShadow: 'var(--ff-shadow-soft)',
};

export const header = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '24px',
  borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
};

export const title = {
  margin: 0,
  fontSize: '24px',
  fontWeight: 700,
  color: 'var(--ff-color-text)',
};

export const closeButton = {
  background: 'transparent',
  border: 'none',
  color: 'var(--ff-color-text-muted)',
  cursor: 'pointer',
  padding: '4px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 'var(--ff-radius-xs)',
  transition: 'background 0.2s ease',
};

export const content = {
  padding: '24px',
};

export default { overlay, modal, header, title, closeButton, content };
