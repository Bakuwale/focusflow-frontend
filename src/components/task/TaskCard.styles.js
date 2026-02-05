export const card = {
  marginBottom: '12px',
  cursor: 'pointer',
  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
};

export const header = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  marginBottom: '8px',
  gap: '8px',
};

export const headerActions = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
};

export const deleteButton = {
  background: 'transparent',
  border: 'none',
  color: 'var(--ff-color-text-muted)',
  cursor: 'pointer',
  padding: '6px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 'var(--ff-radius-xs)',
  transition: 'all 0.2s ease',
  opacity: 0.7,
};

export const title = {
  margin: 0,
  fontSize: '16px',
  fontWeight: 600,
  color: 'var(--ff-color-text)',
  flex: 1,
};

export const description = {
  margin: '8px 0',
  fontSize: '14px',
  color: 'var(--ff-color-text-muted)',
  lineHeight: '1.5',
};

export const footer = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: '12px',
  paddingTop: '12px',
  borderTop: '1px solid rgba(255, 255, 255, 0.05)',
};

export const meta = {
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  color: 'var(--ff-color-text-muted)',
};

export const metaText = {
  fontSize: '12px',
};

export default { card, header, title, description, footer, meta, metaText };
