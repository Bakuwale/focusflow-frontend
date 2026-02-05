import React from 'react';
import LayoutContainer from '../../components/layout/LayoutContainer';
import Card from '../../components/common/Card';
import Input from '../../components/common/Input';
import ToggleSwitch from '../../components/common/ToggleSwitch';
import Button from '../../components/common/Button';
import { useSettings } from '../../context/SettingsContext';
import { useTimer } from '../../context/TimerContext';
import { Moon, Sun, RotateCcw } from 'lucide-react';
import styles from './Settings.styles';

const Settings = () => {
  const { settings, updateSetting, resetSettings } = useSettings();
  const { resetTimer } = useTimer();

  const handleSave = () => {
    // Settings are auto-saved via context
    resetTimer(); // Reset timer to apply new durations
    alert('Settings saved successfully!');
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all settings to defaults?')) {
      resetSettings();
      resetTimer();
      alert('Settings reset to defaults!');
    }
  };

  return (
    <LayoutContainer>
      <div style={styles.container}>
        <header style={styles.header}>
          <h1 style={styles.title}>Settings</h1>
          <p style={styles.subtitle}>Customize your FocusFlow experience</p>
        </header>

        {/* Timer Settings */}
        <Card style={styles.section}>
          <h2 style={styles.sectionTitle}>Timer Settings</h2>
          <div style={styles.formGroup}>
            <Input
              label="Work Duration (minutes)"
              type="number"
              value={settings.workDuration}
              onChange={(e) => updateSetting('workDuration', Number(e.target.value))}
              min="1"
              max="60"
            />
          </div>
          <div style={styles.formGroup}>
            <Input
              label="Break Duration (minutes)"
              type="number"
              value={settings.breakDuration}
              onChange={(e) => updateSetting('breakDuration', Number(e.target.value))}
              min="1"
              max="30"
            />
          </div>
        </Card>

        {/* Appearance */}
        <Card style={styles.section}>
          <h2 style={styles.sectionTitle}>Appearance</h2>
          <div style={styles.settingItem}>
            <div style={styles.settingInfo}>
              <div style={styles.settingLabel}>
                {settings.darkMode ? <Moon size={20} /> : <Sun size={20} />}
                <span style={styles.settingText}>Dark Mode</span>
              </div>
              <p style={styles.settingDescription}>
                Toggle between dark and light theme
              </p>
            </div>
            <ToggleSwitch
              checked={settings.darkMode}
              onChange={(e) => updateSetting('darkMode', e.target.checked)}
            />
          </div>
        </Card>

        {/* Notifications */}
        <Card style={styles.section}>
          <h2 style={styles.sectionTitle}>Notifications</h2>
          <div style={styles.settingItem}>
            <div style={styles.settingInfo}>
              <span style={styles.settingText}>Enable Notifications</span>
              <p style={styles.settingDescription}>
                Get notified when timer sessions complete
              </p>
            </div>
            <ToggleSwitch
              checked={settings.notifications}
              onChange={(e) => updateSetting('notifications', e.target.checked)}
            />
          </div>
        </Card>

        {/* Actions */}
        <div style={styles.actions}>
          <Button
            variant="primary"
            fullWidth
            onClick={handleSave}
            style={styles.saveButton}
          >
            Save Settings
          </Button>
          <Button
            variant="ghost"
            fullWidth
            onClick={handleReset}
            style={styles.resetButton}
          >
            <RotateCcw size={18} style={{ marginRight: '8px' }} />
            Reset to Defaults
          </Button>
        </div>
      </div>
    </LayoutContainer>
  );
};

export default Settings;
