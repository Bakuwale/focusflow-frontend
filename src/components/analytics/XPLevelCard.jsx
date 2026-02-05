import React from 'react';
import { useXP } from '../../context/XPContext';
import Card from '../common/Card';
import ProgressCircle from '../common/ProgressCircle';
import { Trophy, Star } from 'lucide-react';
import styles from './XPLevelCard.styles';

const XPLevelCard = () => {
  const { xpData } = useXP();

  return (
    <Card style={styles.card}>
      <div style={styles.header}>
        <div style={styles.titleSection}>
          <Trophy size={20} style={{ color: 'var(--ff-color-primary)' }} />
          <h3 style={styles.title}>Level Progress</h3>
        </div>
      </div>
      
      <div style={styles.content}>
        <ProgressCircle 
          progress={xpData.progress} 
          size={100}
          color="var(--ff-color-primary)"
        >
          <div style={styles.levelDisplay}>
            <div style={styles.levelNumber}>{xpData.level}</div>
            <div style={styles.levelLabel}>Level</div>
          </div>
        </ProgressCircle>
        
        <div style={styles.stats}>
          <div style={styles.statItem}>
            <Star size={16} style={{ color: 'var(--ff-color-warning)' }} />
            <span style={styles.statValue}>{xpData.currentXP}</span>
            <span style={styles.statLabel}>/ {xpData.maxXP} XP</span>
          </div>
          
          <div style={styles.totalXP}>
            <span style={styles.totalLabel}>Total XP:</span>
            <span style={styles.totalValue}>{xpData.totalXP}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default XPLevelCard;