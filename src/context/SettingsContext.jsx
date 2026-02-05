import React, { createContext, useContext, useState, useEffect } from 'react';
import storageService from '../services/storageService';

const SettingsContext = createContext();

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState({
    workDuration: 25,
    breakDuration: 5,
    darkMode: true,
    notifications: true,
  });

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedSettings = storageService.getSettings();
    setSettings(savedSettings);
  }, []);

  // Save settings to localStorage whenever they change
  useEffect(() => {
    storageService.saveSettings(settings);
  }, [settings]);

  // Update a setting
  const updateSetting = (key, value) => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      [key]: value,
    }));
  };

  // Update multiple settings at once
  const updateSettings = (newSettings) => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      ...newSettings,
    }));
  };

  // Reset to defaults
  const resetSettings = () => {
    const defaultSettings = {
      workDuration: 25,
      breakDuration: 5,
      darkMode: true,
      notifications: true,
    };
    setSettings(defaultSettings);
  };

  const value = {
    settings,
    updateSetting,
    updateSettings,
    resetSettings,
  };

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
};
