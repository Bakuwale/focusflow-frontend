import storageService from './storageService';
import { getStartOfDay, isSameDay, getDaysDifference } from '../utils/dateUtils';
import dayjs from 'dayjs';

// Analytics service for calculating statistics

class AnalyticsService {
  // Get all sessions
  getSessions() {
    return storageService.getSessions();
  }

  // Get total focus hours
  getTotalFocusHours() {
    const sessions = this.getSessions();
    const totalMinutes = sessions.reduce((sum, session) => {
      return sum + (session.duration || 0);
    }, 0);
    return (totalMinutes / 60).toFixed(1);
  }

  // Get sessions for a specific date range
  getSessionsByDateRange(startDate, endDate) {
    const sessions = this.getSessions();
    return sessions.filter((session) => {
      const sessionDate = new Date(session.completedAt);
      return sessionDate >= startDate && sessionDate <= endDate;
    });
  }

  // Get weekly data (last 7 days)
  getWeeklyData() {
    const today = getStartOfDay();
    const weekAgo = dayjs(today).subtract(6, 'days').toDate();
    
    const sessions = this.getSessionsByDateRange(weekAgo, today);
    
    // Group by day
    const dailyData = {};
    for (let i = 0; i < 7; i++) {
      const date = dayjs(today).subtract(6 - i, 'days');
      const dayKey = date.format('ddd');
      dailyData[dayKey] = {
        day: dayKey,
        hours: 0,
        sessions: 0,
      };
    }

    sessions.forEach((session) => {
      const sessionDate = getStartOfDay(new Date(session.completedAt));
      const dayKey = dayjs(sessionDate).format('ddd');
      if (dailyData[dayKey]) {
        dailyData[dayKey].hours += session.duration / 60;
        dailyData[dayKey].sessions += 1;
      }
    });

    return Object.values(dailyData);
  }

  // Get today's sessions
  getTodaySessions() {
    const today = getStartOfDay();
    const tomorrow = dayjs(today).add(1, 'day').toDate();
    return this.getSessionsByDateRange(today, tomorrow);
  }

  // Get sessions count for today
  getTodaySessionsCount() {
    return this.getTodaySessions().length;
  }

  // Get productivity percentage (based on sessions completed vs goal)
  getProductivityPercentage(goal = 4) {
    const todayCount = this.getTodaySessionsCount();
    return Math.min((todayCount / goal) * 100, 100);
  }

  // Get recent sessions (last N sessions)
  getRecentSessions(limit = 10) {
    const sessions = this.getSessions();
    return sessions
      .sort((a, b) => new Date(b.completedAt) - new Date(a.completedAt))
      .slice(0, limit);
  }
}

export default new AnalyticsService();
