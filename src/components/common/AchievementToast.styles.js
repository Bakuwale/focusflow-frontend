const styles = {
  container: (isVisible) => ({
    position: 'fixed',
    top: '20px',
    right: '20px',
    zIndex: 10000,
    transform: isVisible ? 'translateX(0)' : 'translateX(100%)',
    opacity: isVisible ? 1 : 0,
    transition: 'all 0.3s ease-in-out',
  }),
  
  toast: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    padding: '16px 20px',
    background: 'linear-gradient(135deg, var(--ff-color-primary), var(--ff-color-secondary))',
    borderRadius: 'var(--ff-radius-lg)',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    minWidth: '300px',
    maxWidth: '400px',
  },
  
  icon: {
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 'var(--ff-radius-full)',
    padding: '8px',
  },
  
  content: {
    flex: 1,
    color: 'white',
  },
  
  title: {
    fontSize: '16px',
    fontWeight: 600,
    marginBottom: '4px',
  },
  
  message: {
    fontSize: '14px',
    opacity: 0.9,
    lineHeight: 1.4,
  },
  
  xp: {
    fontSize: '12px',
    fontWeight: 600,
    marginTop: '4px',
    padding: '2px 8px',
    background: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 'var(--ff-radius-sm)',
    display: 'inline-block',
  },
};

export default styles;