export const column = {
  flex: '1 1 280px',
  minWidth: '280px',
  maxWidth: '100%',
  background: 'var(--ff-color-surface-soft)',
  borderRadius: 'var(--ff-radius-md)',
  padding: '16px',
  display: 'flex',
  flexDirection: 'column',
  maxHeight: 'calc(100vh - 200px)',
};

export const header = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '16px',
  paddingBottom: '12px',
  borderBottom: '2px solid rgba(255, 255, 255, 0.1)',
};

export const title = {
  margin: 0,
  fontSize: '18px',
  fontWeight: 700,
  color: 'var(--ff-color-text)',
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
};

export const count = {
  background: 'var(--ff-color-primary-soft)',
  color: 'var(--ff-color-primary)',
  padding: '4px 10px',
  borderRadius: 'var(--ff-radius-pill)',
  fontSize: '12px',
  fontWeight: 600,
};

export const tasksList = {
  flex: 1,
  overflowY: 'auto',
  paddingRight: '8px',
};

export default { column, header, title, count, tasksList };
