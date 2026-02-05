import storageService from './storageService';
import { XP_REWARDS, XP_PER_LEVEL } from '../utils/constants';
import { isSameDay, getStartOfDay } from '../utils/dateUtils';

// Gamification service for XP, levels, and streaks

class GamificationService {
  // Calculate level from total XP
  calculateLevel(totalXP) {
    return Math.floor(totalXP / XP_PER_LEVEL) + 1;
  }

  // Calculate XP progress for current level
  calculateXPProgress(totalXP) {
    const level = this.calculateLevel(totalXP);
    const xpForCurrentLevel = (level - 1) * XP_PER_LEVEL;
    const xpInCurrentLevel = totalXP - xpForCurrentLevel;
    const xpNeededForNextLevel = XP_PER_LEVEL;
    const progress = (xpInCurrentLevel / xpNeededForNextLevel) * 100;
    
    return {
      level,
      currentXP: xpInCurrentLevel,
      maxXP: xpNeededForNextLevel,
      progress: Math.min(progress, 100),
      totalXP,
    };
  }

  // Add XP and update level
  addXP(amount, reason = '') {
    const xpData = storageService.getXPData();
    const newTotalXP = xpData.totalXP + amount;
    const newLevel = this.calculateLevel(newTotalXP);
    
    const updatedXPData = {
      ...xpData,
      totalXP: newTotalXP,
      level: newLevel,
      currentXP: newTotalXP - ((newLevel - 1) * XP_PER_LEVEL),
    };

    storageService.saveXPData(updatedXPData);
    
    // Check for level up
    const leveledUp = newLevel > xpData.level;
    
    return {
      ...updatedXPData,
      leveledUp,
      xpGained: amount,
      reason,
    };
  }

  // Reward for completing a task
  rewardTaskCompletion() {
    return this.addXP(XP_REWARDS.TASK_COMPLETED, 'Task completed');
  }

  // Reward for completing a focus session
  rewardFocusSession() {
    return this.addXP(XP_REWARDS.FOCUS_SESSION, 'Focus session completed');
  }

  // Update streak
  updateStreak() {
    const streakData = storageService.getStreakData();
    const today = getStartOfDay();
    const lastActiveDate = streakData.lastActiveDate 
      ? getStartOfDay(new Date(streakData.lastActiveDate))
      : null;

    let newStreak = streakData.currentStreak;
    let longestStreak = streakData.longestStreak;

    if (!lastActiveDate) {
      // First time
      newStreak = 1;
    } else if (isSameDay(today, lastActiveDate)) {
      // Already active today, keep streak
      newStreak = streakData.currentStreak;
    } else {
      const daysDiff = Math.floor((today - lastActiveDate) / (1000 * 60 * 60 * 24));
      if (daysDiff === 1) {
        // Consecutive day
        newStreak = streakData.currentStreak + 1;
      } else {
        // Streak broken
        newStreak = 1;
      }
    }

    if (newStreak > longestStreak) {
      longestStreak = newStreak;
    }

    const updatedStreakData = {
      currentStreak: newStreak,
      longestStreak,
      lastActiveDate: today.toISOString(),
    };

    storageService.saveStreakData(updatedStreakData);

    // Reward for daily streak
    if (newStreak > streakData.currentStreak) {
      this.addXP(XP_REWARDS.DAILY_STREAK, 'Daily streak');
    }

    return updatedStreakData;
  }

  // Get current XP data
  getXPData() {
    const xpData = storageService.getXPData();
    return this.calculateXPProgress(xpData.totalXP);
  }

  // Get streak data
  getStreakData() {
    return storageService.getStreakData();
  }
}

export default new GamificationService();
