export const nav = {
  position: 'fixed',
  bottom: 0,
  left: 0,
  right: 0,
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
  background: 'var(--ff-color-surface)',
  borderTop: '1px solid rgba(255, 255, 255, 0.1)',
  padding: '12px 0',
  paddingBottom: 'calc(12px + env(safe-area-inset-bottom))',
  zIndex: 1000,
  boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.3)',
};

export const navItem = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '4px',
  padding: '8px 16px',
  color: 'var(--ff-color-text-muted)',
  textDecoration: 'none',
  transition: 'color 0.2s ease',
  fontSize: '12px',
  minWidth: '60px',
};

export const navItemActive = {
  color: 'var(--ff-color-primary)',
};

export const navLabel = {
  fontSize: '11px',
  fontWeight: 500,
};

export default { nav, navItem, navItemActive, navLabel };
