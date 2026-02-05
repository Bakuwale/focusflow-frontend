const styles = {
  card: {
    padding: '24px',
    background: 'var(--ff-color-surface)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
  },
  
  header: {
    marginBottom: '20px',
  },
  
  titleSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  
  title: {
    fontSize: '18px',
    fontWeight: 600,
    color: 'var(--ff-color-text)',
    margin: 0,
  },
  
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '20px',
  },
  
  levelDisplay: {
    textAlign: 'center',
  },
  
  levelNumber: {
    fontSize: '28px',
    fontWeight: 700,
    color: 'var(--ff-color-primary)',
    lineHeight: 1,
  },
  
  levelLabel: {
    fontSize: '12px',
    color: 'var(--ff-color-text-muted)',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  
  stats: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '12px',
    width: '100%',
  },
  
  statItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  
  statValue: {
    fontSize: '16px',
    fontWeight: 600,
    color: 'var(--ff-color-text)',
  },
  
  statLabel: {
    fontSize: '14px',
    color: 'var(--ff-color-text-muted)',
  },
  
  totalXP: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 16px',
    background: 'rgba(var(--ff-color-primary-rgb), 0.1)',
    borderRadius: 'var(--ff-radius-sm)',
    border: '1px solid rgba(var(--ff-color-primary-rgb), 0.2)',
  },
  
  totalLabel: {
    fontSize: '14px',
    color: 'var(--ff-color-text-muted)',
  },
  
  totalValue: {
    fontSize: '16px',
    fontWeight: 600,
    color: 'var(--ff-color-primary)',
  },
};

export default styles;