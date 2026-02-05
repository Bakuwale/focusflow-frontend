import React, { createContext, useContext, useState, useEffect } from 'react';
import gamificationService from '../services/gamificationService';

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

  // Add XP (called from other contexts)
  const addXP = (amount, reason = '') => {
    const result = gamificationService.addXP(amount, reason);
    loadXPData();
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

  return <XPContext.Provider value={value}>{children}</XPContext.Provider>;
};
