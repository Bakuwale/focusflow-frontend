import React, { createContext, useContext, useState, useEffect } from 'react';
import gamificationService from '../services/gamificationService';
import AchievementToast from '../components/common/AchievementToast';

const XPContext = createContext();

export const useXP = () => {
  const context = useContext(XPContext);
  if (!context) {
    throw new Error('useXP must be used within a XPProvider');
  }
  return context;
};

export const XPProvider = ({ children }) => {
  const [xpData, setXPData] = useState({
    level: 1,
    currentXP: 0,
    maxXP: 500,
    progress: 0,
    totalXP: 0,
  });

  const [streakData, setStreakData] = useState({
    currentStreak: 0,
    longestStreak: 0,
    lastActiveDate: null,
  });

  const [currentAchievement, setCurrentAchievement] = useState(null);

  // Load XP and streak data on mount
  useEffect(() => {
    loadXPData();
    loadStreakData();
  }, []);

  const loadXPData = () => {
    const data = gamificationService.getXPData();
    setXPData(data);
  };

  const loadStreakData = () => {
    const data = gamificationService.getStreakData();
    setStreakData(data);
  };

  // Show achievement notification
  const showAchievement = (type, title, message, xp) => {
    setCurrentAchievement({ type, title, message, xp });
  };

  // Add XP (called from other contexts)
  const addXP = (amount, reason = '') => {
    const result = gamificationService.addXP(amount, reason);
    loadXPData();
    
    // Show achievement notification
    if (result.leveledUp) {
      showAchievement(
        'level_up',
        `Level Up! 🎉`,
        `You've reached level ${result.level}!`,
        amount
      );
    } else if (reason === 'Task completed') {
      showAchievement(
        'task_completed',
        'Task Completed! ✅',
        'Great job staying productive!',
        amount
      );
    } else if (reason === 'Focus session completed') {
      showAchievement(
        'focus_session',
        'Focus Session Complete! 🎯',
        'You stayed focused for a full session!',
        amount
      );
    }
    
    return result;
  };

  // Update streak (called when completing tasks or sessions)
  const updateStreak = () => {
    const result = gamificationService.updateStreak();
    setStreakData(result);
    loadXPData(); // Reload XP in case streak reward was given
    return result;
  };

  const value = {
    xpData,
    streakData,
    addXP,
    updateStreak,
    refresh: () => {
      loadXPData();
      loadStreakData();
    },
  };

  return (
    <XPContext.Provider value={value}>
      {children}
      <AchievementToast 
        achievement={currentAchievement}
        onClose={() => setCurrentAchievement(null)}
      />
    </XPContext.Provider>
  );
};
