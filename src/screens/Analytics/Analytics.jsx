import React from 'react';
import LayoutContainer from '../../components/layout/LayoutContainer';
import Card from '../../components/common/Card';
import { useTasks } from '../../context/TaskContext';
import { useTimer } from '../../context/TimerContext';
import { useXP } from '../../context/XPContext';
import analyticsService from '../../services/analyticsService';
import { formatDateTime } from '../../utils/dateUtils';
import { BarChart3, TrendingUp, Clock, Target } from 'lucide-react';
import styles from './Analytics.styles';

const Analytics = () => {
  const { getCompletedTasksCount } = useTasks();
  const { totalFocusHours } = useTimer();
  const { streakData } = useXP();

  const tasksCompleted = getCompletedTasksCount();
  const weeklyData = analyticsService.getWeeklyData();
  const weeklyProductivity = analyticsService.getProductivityPercentage();
  const recentSessions = analyticsService.getRecentSessions(5);

  const stats = {
    totalFocusHours: parseFloat(totalFocusHours),
    tasksCompleted,
    weeklyProductivity: Math.round(weeklyProductivity),
    currentStreak: streakData.currentStreak,
  };

  return (
    <LayoutContainer>
      <div style={styles.container}>
        <header style={styles.header}>
          <h1 style={styles.title}>Analytics</h1>
          <p style={styles.subtitle}>Track your productivity journey</p>
        </header>

        {/* Summary Cards */}
        <div style={styles.statsGrid}>
          <Card style={styles.statCard}>
            <div style={{ ...styles.statIcon, background: 'rgba(99, 102, 241, 0.16)' }}>
              <Clock size={24} color="var(--ff-color-primary)" />
            </div>
            <div style={styles.statContent}>
              <h3 style={styles.statValue}>{stats.totalFocusHours}h</h3>
              <p style={styles.statLabel}>Total Focus Hours</p>
            </div>
          </Card>

          <Card style={styles.statCard}>
            <div style={{ ...styles.statIcon, background: 'rgba(34, 197, 94, 0.16)' }}>
              <Target size={24} color="var(--ff-color-accent)" />
            </div>
            <div style={styles.statContent}>
              <h3 style={styles.statValue}>{stats.tasksCompleted}</h3>
              <p style={styles.statLabel}>Tasks Completed</p>
            </div>
          </Card>

          <Card style={styles.statCard}>
            <div style={{ ...styles.statIcon, background: 'rgba(249, 115, 22, 0.16)' }}>
              <TrendingUp size={24} color="var(--ff-color-warning)" />
            </div>
            <div style={styles.statContent}>
              <h3 style={styles.statValue}>{stats.weeklyProductivity}%</h3>
              <p style={styles.statLabel}>Weekly Productivity</p>
            </div>
          </Card>

          <Card style={styles.statCard}>
            <div style={{ ...styles.statIcon, background: 'rgba(99, 102, 241, 0.16)' }}>
              <BarChart3 size={24} color="var(--ff-color-primary)" />
            </div>
            <div style={styles.statContent}>
              <h3 style={styles.statValue}>{stats.currentStreak}</h3>
              <p style={styles.statLabel}>Day Streak</p>
            </div>
          </Card>
        </div>

        {/* Weekly Chart */}
        <Card style={styles.chartCard}>
          <h2 style={styles.chartTitle}>Weekly Focus Hours</h2>
          <div style={styles.chartContainer}>
            <div style={styles.chart}>
              {weeklyData.map((item, index) => {
                const maxHours = Math.max(...weeklyData.map(d => d.hours));
                const height = (item.hours / maxHours) * 100;
                return (
                  <div key={index} style={styles.chartBar}>
                    <div
                      style={{
                        ...styles.bar,
                        height: `${height}%`,
                        background: 'linear-gradient(180deg, var(--ff-color-primary), var(--ff-color-accent))',
                      }}
                    ></div>
                    <span style={styles.barLabel}>{item.day}</span>
                    <span style={styles.barValue}>{item.hours}h</span>
                  </div>
                );
              })}
            </div>
          </div>
        </Card>

        {/* Session History */}
        <Card style={styles.historyCard}>
          <h2 style={styles.sectionTitle}>Recent Sessions</h2>
          <div style={styles.historyList}>
            {recentSessions.length > 0 ? (
              recentSessions.map((session) => (
                <div key={session.id} style={styles.historyItem}>
                  <div style={styles.historyInfo}>
                    <span style={styles.historyDate}>
                      {formatDateTime(new Date(session.completedAt))}
                    </span>
                    <span style={styles.historyDuration}>{session.duration} minutes</span>
                  </div>
                  <span style={styles.historyType}>
                    {session.mode === 'work' ? 'Work Session' : 'Break'}
                  </span>
                </div>
              ))
            ) : (
              <div style={{ padding: '20px', textAlign: 'center', color: 'var(--ff-color-text-muted)' }}>
                No sessions yet. Start focusing to see your history here!
              </div>
            )}
          </div>
        </Card>
      </div>
    </LayoutContainer>
  );
};

export default Analytics;
