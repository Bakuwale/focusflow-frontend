import React from 'react';
import Card from '../common/Card';
import { Calendar, TrendingUp, TrendingDown } from 'lucide-react';
import analyticsService from '../../services/analyticsService';
import styles from './WeeklyProgressCard.styles';

const WeeklyProgressCard = () => {
  const weeklyProgress = analyticsService.getWeeklyProgress();
  const isImprovement = weeklyProgress.improvement >= 0;

  const formatMinutes = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  return (
    <Card style={styles.card}>
      <div style={styles.header}>
        <div style={styles.titleSection}>
          <Calendar size={20} style={{ color: 'var(--ff-color-primary)' }} />
          <h3 style={styles.title}>Weekly Progress</h3>
        </div>
      </div>
      
      <div style={styles.content}>
        <div style={styles.mainStat}>
          <div style={styles.thisWeek}>
            <span style={styles.label}>This Week</span>
            <span style={styles.value}>{formatMinutes(weeklyProgress.thisWeek)}</span>
          </div>
          
          <div style={styles.comparison}>
            <div style={styles.improvementBadge(isImprovement)}>
              {isImprovement ? (
                <TrendingUp size={14} />
              ) : (
                <TrendingDown size={14} />
              )}
              <span>{Math.abs(weeklyProgress.improvement)}%</span>
            </div>
          </div>
        </div>
        
        <div style={styles.stats}>
          <div style={styles.statItem}>
            <span style={styles.statLabel}>Last Week</span>
            <span style={styles.statValue}>{formatMinutes(weeklyProgress.lastWeek)}</span>
          </div>
          
          <div style={styles.statItem}>
            <span style={styles.statLabel}>Daily Average</span>
            <span style={styles.statValue}>{formatMinutes(weeklyProgress.dailyAverage)}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default WeeklyProgressCard;