export const container = {
  width: '100%',
  height: '100%',
};

export const header = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  marginBottom: '24px',
  gap: '16px',
  flexWrap: 'wrap',
};

export const title = {
  fontSize: '32px',
  fontWeight: 700,
  color: 'var(--ff-color-text)',
  margin: '0 0 8px 0',
};

export const subtitle = {
  fontSize: '16px',
  color: 'var(--ff-color-text-muted)',
  margin: 0,
};

export const addButton = {
  display: 'flex',
  alignItems: 'center',
};

export const board = {
  display: 'flex',
  flexDirection: 'row',
  gap: '16px',
  overflowX: 'auto',
  paddingBottom: '16px',
  // On mobile, columns will stack due to min-width constraint
};

export default {
  container,
  header,
  title,
  subtitle,
  addButton,
  board,
};
