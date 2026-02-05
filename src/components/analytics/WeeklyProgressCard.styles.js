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
    gap: '20px',
  },
  
  mainStat: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  
  thisWeek: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  
  label: {
    fontSize: '14px',
    color: 'var(--ff-color-text-muted)',
  },
  
  value: {
    fontSize: '28px',
    fontWeight: 700,
    color: 'var(--ff-color-text)',
  },
  
  comparison: {
    display: 'flex',
    alignItems: 'center',
  },
  
  improvementBadge: (isImprovement) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    padding: '6px 12px',
    borderRadius: 'var(--ff-radius-sm)',
    fontSize: '14px',
    fontWeight: 600,
    background: isImprovement 
      ? 'rgba(34, 197, 94, 0.1)' 
      : 'rgba(239, 68, 68, 0.1)',
    color: isImprovement 
      ? '#22c55e' 
      : '#ef4444',
    border: `1px solid ${isImprovement ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)'}`,
  }),
  
  stats: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px',
    paddingTop: '16px',
    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
  },
  
  statItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  
  statLabel: {
    fontSize: '12px',
    color: 'var(--ff-color-text-muted)',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  
  statValue: {
    fontSize: '16px',
    fontWeight: 600,
    color: 'var(--ff-color-text)',
  },
};

export default styles;