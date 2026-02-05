const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px',
  },
  
  timeDisplay: {
    display: 'flex',
    alignItems: 'center',
    fontFamily: 'monospace',
    fontSize: '48px',
    fontWeight: 700,
    color: 'var(--ff-color-text)',
    lineHeight: 1,
  },
  
  minutes: {
    minWidth: '80px',
    textAlign: 'right',
  },
  
  separator: {
    margin: '0 8px',
    opacity: 0.7,
  },
  
  seconds: {
    minWidth: '80px',
    textAlign: 'left',
  },
  
  modeLabel: {
    fontSize: '14px',
    color: 'var(--ff-color-text-muted)',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    fontWeight: 500,
  },
};

export default styles;