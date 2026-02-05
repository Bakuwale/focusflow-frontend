export const container = {
  width: '100%',
};

export const header = {
  marginBottom: '32px',
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

export const statsGrid = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
  gap: '16px',
  marginBottom: '24px',
};

export const statCard = {
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
  padding: '20px',
};

export const statIcon = {
  width: '48px',
  height: '48px',
  borderRadius: 'var(--ff-radius-md)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
};

export const statContent = {
  flex: 1,
};

export const statValue = {
  fontSize: '24px',
  fontWeight: 700,
  color: 'var(--ff-color-text)',
  margin: '0 0 4px 0',
};

export const statLabel = {
  fontSize: '14px',
  color: 'var(--ff-color-text-muted)',
  margin: 0,
};

export const xpCard = {
  marginBottom: '32px',
};

export const xpHeader = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '16px',
};

export const xpTitle = {
  fontSize: '20px',
  fontWeight: 600,
  color: 'var(--ff-color-text)',
  margin: 0,
};

export const xpStreak = {
  fontSize: '14px',
  color: 'var(--ff-color-warning)',
  fontWeight: 600,
};

export const actionsSection = {
  marginBottom: '24px',
};

export const sectionTitle = {
  fontSize: '20px',
  fontWeight: 600,
  color: 'var(--ff-color-text)',
  margin: '0 0 16px 0',
};

export const actionsGrid = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
  gap: '12px',
};

export const actionButton = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

export default {
  container,
  header,
  title,
  subtitle,
  statsGrid,
  statCard,
  statIcon,
  statContent,
  statValue,
  statLabel,
  xpCard,
  xpHeader,
  xpTitle,
  xpStreak,
  actionsSection,
  sectionTitle,
  actionsGrid,
  actionButton,
};
