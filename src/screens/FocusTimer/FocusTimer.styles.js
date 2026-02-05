export const container = {
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

export const header = {
  textAlign: 'center',
  marginBottom: '40px',
  width: '100%',
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

export const timerWrapper = {
  width: '100%',
  maxWidth: '500px',
};

export const timerCard = {
  textAlign: 'center',
  padding: '40px 24px',
};

export const modeIndicator = {
  marginBottom: '24px',
};

export const modeBadge = {
  display: 'inline-flex',
  alignItems: 'center',
  padding: '8px 16px',
  background: 'var(--ff-color-primary-soft)',
  color: 'var(--ff-color-primary)',
  borderRadius: 'var(--ff-radius-pill)',
  fontSize: '14px',
  fontWeight: 600,
};

export const timerDisplay = {
  margin: '32px 0',
};

export const timeText = {
  fontSize: 'clamp(48px, 12vw, 72px)',
  fontWeight: 700,
  color: 'var(--ff-color-text)',
  fontFamily: 'monospace',
  letterSpacing: '4px',
  lineHeight: 1,
};

export const controls = {
  display: 'flex',
  gap: '12px',
  justifyContent: 'center',
  marginTop: '32px',
  flexWrap: 'wrap',
};

export const controlButton = {
  display: 'flex',
  alignItems: 'center',
  minWidth: '140px',
  justifyContent: 'center',
};

export const stats = {
  marginTop: '40px',
  paddingTop: '24px',
  borderTop: '1px solid rgba(255, 255, 255, 0.1)',
};

export const statItem = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

export const statLabel = {
  fontSize: '14px',
  color: 'var(--ff-color-text-muted)',
};

export const statValue = {
  fontSize: '20px',
  fontWeight: 700,
  color: 'var(--ff-color-text)',
};

export const completedMessage = {
  marginTop: '24px',
  padding: '16px',
  background: 'rgba(99, 102, 241, 0.1)',
  borderRadius: 'var(--ff-radius-sm)',
  textAlign: 'center',
};

export const completedText = {
  fontSize: '16px',
  color: 'var(--ff-color-text)',
  margin: '0 0 12px 0',
  fontWeight: 600,
};

export const switchButton = {
  marginTop: '8px',
};

export default {
  container,
  header,
  title,
  subtitle,
  timerWrapper,
  timerCard,
  modeIndicator,
  modeBadge,
  timerDisplay,
  timeText,
  controls,
  controlButton,
  stats,
  statItem,
  statLabel,
  statValue,
  completedMessage,
  completedText,
  switchButton,
};
