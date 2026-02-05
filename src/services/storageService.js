// Storage service for localStorage operations
// Provides a clean API for persisting and retrieving data

const STORAGE_KEYS = {
  TASKS: 'focusflow_tasks',
  TIMER_SESSIONS: 'focusflow_timer_sessions',
  XP_DATA: 'focusflow_xp_data',
  STREAK_DATA: 'focusflow_streak_data',
};

class StorageService {
  // Generic get/set methods
  get(key, defaultValue = null) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error(`Error reading from localStorage key "${key}":`, error);
      return defaultValue;
    }
  }

  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error(`Error writing to localStorage key "${key}":`, error);
      return false;
    }
  }

  remove(key) {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
      return false;
    }
  }

  clear() {
    try {
      Object.values(STORAGE_KEYS).forEach(key => {
        localStorage.removeItem(key);
      });
      return true;
    } catch (error) {
      console.error('Error clearing localStorage:', error);
      return false;
    }
  }

  // Task-specific methods
  getTasks() {
    return this.get(STORAGE_KEYS.TASKS, []);
  }

  saveTasks(tasks) {
    return this.set(STORAGE_KEYS.TASKS, tasks);
  }

  // Timer sessions
  getSessions() {
    return this.get(STORAGE_KEYS.TIMER_SESSIONS, []);
  }

  saveSessions(sessions) {
    return this.set(STORAGE_KEYS.TIMER_SESSIONS, sessions);
  }

  // XP data
  getXPData() {
    return this.get(STORAGE_KEYS.XP_DATA, {
      currentXP: 0,
      level: 1,
      totalXP: 0,
    });
  }

  saveXPData(xpData) {
    return this.set(STORAGE_KEYS.XP_DATA, xpData);
  }

  // Streak data
  getStreakData() {
    return this.get(STORAGE_KEYS.STREAK_DATA, {
      currentStreak: 0,
      longestStreak: 0,
      lastActiveDate: null,
    });
  }

  saveStreakData(streakData) {
    return this.set(STORAGE_KEYS.STREAK_DATA, streakData);
  }
}

export default new StorageService();
