import React from 'react';
import { useNavigate } from 'react-router-dom';
import LayoutContainer from '../../components/layout/LayoutContainer';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import ProgressBar from '../../components/common/ProgressBar';
import { useTasks } from '../../context/TaskContext';
import { useTimer } from '../../context/TimerContext';
import { useXP } from '../../context/XPContext';
import { Target, CheckCircle, Clock, TrendingUp, Plus } from 'lucide-react';
import styles from './Dashboard.styles';

const Dashboard = () => {
  const navigate = useNavigate();
  const { getTaskCounts, getCompletedTasksCount } = useTasks();
  const { totalFocusHours, sessionsCompleted } = useTimer();
  const { xpData, streakData } = useXP();

  const taskCounts = getTaskCounts();
  const completedTasks = getCompletedTasksCount();

  const quickActions = [
    { label: 'New Task', icon: Plus, path: '/tasks', onClick: () => navigate('/tasks') },
    { label: 'Start Focus', icon: Clock, path: '/focus', onClick: () => navigate('/focus') },
  ];

  return (
    <LayoutContainer>
      <div style={styles.container}>
        <header style={styles.header}>
          <h1 style={styles.title}>Dashboard</h1>
          <p style={styles.subtitle}>Welcome back! Let's stay focused today.</p>
        </header>

        {/* Summary Cards */}
        <div style={styles.statsGrid}>
          <Card style={styles.statCard}>
            <div style={{ ...styles.statIcon, background: 'rgba(99, 102, 241, 0.16)' }}>
              <Target size={24} color="var(--ff-color-primary)" />
            </div>
            <div style={styles.statContent}>
              <h3 style={styles.statValue}>{taskCounts.total}</h3>
              <p style={styles.statLabel}>Total Tasks</p>
            </div>
          </Card>

          <Card style={styles.statCard}>
            <div style={{ ...styles.statIcon, background: 'rgba(34, 197, 94, 0.16)' }}>
              <CheckCircle size={24} color="var(--ff-color-accent)" />
            </div>
            <div style={styles.statContent}>
              <h3 style={styles.statValue}>{completedTasks}</h3>
              <p style={styles.statLabel}>Completed</p>
            </div>
          </Card>

          <Card style={styles.statCard}>
            <div style={{ ...styles.statIcon, background: 'rgba(249, 115, 22, 0.16)' }}>
              <Clock size={24} color="var(--ff-color-warning)" />
            </div>
            <div style={styles.statContent}>
              <h3 style={styles.statValue}>{parseFloat(totalFocusHours).toFixed(1)}h</h3>
              <p style={styles.statLabel}>Focus Hours</p>
            </div>
          </Card>

          <Card style={styles.statCard}>
            <div style={{ ...styles.statIcon, background: 'rgba(99, 102, 241, 0.16)' }}>
              <TrendingUp size={24} color="var(--ff-color-primary)" />
            </div>
            <div style={styles.statContent}>
              <h3 style={styles.statValue}>Level {xpData.level}</h3>
              <p style={styles.statLabel}>XP: {xpData.currentXP}</p>
            </div>
          </Card>
        </div>

        {/* XP Progress */}
        <Card style={styles.xpCard}>
          <div style={styles.xpHeader}>
            <h2 style={styles.xpTitle}>Level {xpData.level} Progress</h2>
            <span style={styles.xpStreak}>🔥 {streakData.currentStreak} day streak</span>
          </div>
          <ProgressBar value={xpData.currentXP} max={xpData.maxXP} showLabel={true} />
        </Card>

        {/* Quick Actions */}
        <div style={styles.actionsSection}>
          <h2 style={styles.sectionTitle}>Quick Actions</h2>
          <div style={styles.actionsGrid}>
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <Button
                  key={action.label}
                  variant="secondary"
                  fullWidth
                  style={styles.actionButton}
                  onClick={action.onClick}
                >
                  <Icon size={20} style={{ marginRight: '8px' }} />
                  {action.label}
                </Button>
              );
            })}
          </div>
        </div>
      </div>
    </LayoutContainer>
  );
};

export default Dashboard;
