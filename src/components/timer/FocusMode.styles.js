const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.95)',
    zIndex: 9999,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backdropFilter: 'blur(10px)',
  },
  
  container: {
    background: 'var(--ff-color-surface)',
    borderRadius: 'var(--ff-radius-lg)',
    padding: '40px',
    maxWidth: '500px',
    width: '90%',
    textAlign: 'center',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
  },
  
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '32px',
  },
  
  title: {
    fontSize: '24px',
    fontWeight: 600,
    color: 'var(--ff-color-text)',
    margin: 0,
  },
  
  closeButton: {
    background: 'transparent',
    border: 'none',
    color: 'var(--ff-color-text-muted)',
    cursor: 'pointer',
    padding: '8px',
    borderRadius: 'var(--ff-radius-sm)',
    transition: 'all 0.2s ease',
    ':hover': {
      background: 'rgba(255, 255, 255, 0.1)',
      color: 'var(--ff-color-text)',
    },
  },
  
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '24px',
  },
  
  modeIndicator: {
    fontSize: '18px',
    fontWeight: 500,
    color: 'var(--ff-color-primary)',
    padding: '12px 24px',
    background: 'rgba(var(--ff-color-primary-rgb), 0.1)',
    borderRadius: 'var(--ff-radius-full)',
    border: '1px solid rgba(var(--ff-color-primary-rgb), 0.2)',
  },
  
  controls: {
    display: 'flex',
    justifyContent: 'center',
  },
  
  motivationText: {
    fontSize: '16px',
    color: 'var(--ff-color-text-muted)',
    fontStyle: 'italic',
    maxWidth: '300px',
    lineHeight: 1.5,
  },
  
  footer: {
    marginTop: '32px',
    paddingTop: '24px',
    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
  },
  
  minimizeButton: {
    background: 'transparent',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    color: 'var(--ff-color-text-muted)',
    padding: '8px 16px',
    borderRadius: 'var(--ff-radius-sm)',
    cursor: 'pointer',
    fontSize: '14px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    margin: '0 auto',
    transition: 'all 0.2s ease',
    ':hover': {
      background: 'rgba(255, 255, 255, 0.1)',
      color: 'var(--ff-color-text)',
    },
  },
};

export default styles;