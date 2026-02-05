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

export const chartCard = {
  marginBottom: '24px',
};

export const chartTitle = {
  fontSize: '20px',
  fontWeight: 600,
  color: 'var(--ff-color-text)',
  margin: '0 0 24px 0',
};

export const chartContainer = {
  width: '100%',
  overflowX: 'auto',
};

export const chart = {
  display: 'flex',
  alignItems: 'flex-end',
  justifyContent: 'space-around',
  gap: '12px',
  minHeight: '200px',
  padding: '16px 0',
};

export const chartBar = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '8px',
  minWidth: '50px',
};

export const bar = {
  width: '100%',
  minHeight: '20px',
  borderRadius: 'var(--ff-radius-sm)  var(--ff-radius-sm) 0 0',
  transition: 'height 0.3s ease',
};

export const barLabel = {
  fontSize: '12px',
  color: 'var(--ff-color-text-muted)',
  fontWeight: 600,
};

export const barValue = {
  fontSize: '11px',
  color: 'var(--ff-color-text-muted)',
};

export const historyCard = {
  marginBottom: '24px',
};

export const sectionTitle = {
  fontSize: '20px',
  fontWeight: 600,
  color: 'var(--ff-color-text)',
  margin: '0 0 16px 0',
};

export const historyList = {
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
};

export const historyItem = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '12px 0',
  borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
};

export const historyInfo = {
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
};

export const historyDate = {
  fontSize: '14px',
  color: 'var(--ff-color-text)',
  fontWeight: 500,
};

export const historyDuration = {
  fontSize: '12px',
  color: 'var(--ff-color-text-muted)',
};

export const historyType = {
  fontSize: '12px',
  color: 'var(--ff-color-primary)',
  background: 'var(--ff-color-primary-soft)',
  padding: '4px 10px',
  borderRadius: 'var(--ff-radius-pill)',
  fontWeight: 600,
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
  chartCard,
  chartTitle,
  chartContainer,
  chart,
  chartBar,
  bar,
  barLabel,
  barValue,
  historyCard,
  sectionTitle,
  historyList,
  historyItem,
  historyInfo,
  historyDate,
  historyDuration,
  historyType,
};
