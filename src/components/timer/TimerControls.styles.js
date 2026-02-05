const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '16px',
  },
  
  mainControls: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  
  playButton: {
    minWidth: '120px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
  },
  
  pauseButton: {
    minWidth: '120px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
  },
  
  focusControls: {
    display: 'flex',
    alignItems: 'center',
  },
  
  focusButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '14px',
    color: 'var(--ff-color-primary)',
    border: '1px solid rgba(var(--ff-color-primary-rgb), 0.3)',
    ':hover': {
      background: 'rgba(var(--ff-color-primary-rgb), 0.1)',
    },
  },
};

export default styles;