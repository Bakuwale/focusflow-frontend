import React, { useState, useEffect } from 'react';
import { Trophy, Star, Zap } from 'lucide-react';
import styles from './AchievementToast.styles';

const AchievementToast = ({ achievement, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (achievement) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(onClose, 300); // Wait for animation to complete
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [achievement, onClose]);

  if (!achievement) return null;

  const getIcon = () => {
    switch (achievement.type) {
      case 'level_up':
        return <Trophy size={24} />;
      case 'task_completed':
        return <Star size={24} />;
      case 'focus_session':
        return <Zap size={24} />;
      default:
        return <Star size={24} />;
    }
  };

  return (
    <div style={styles.container(isVisible)}>
      <div style={styles.toast}>
        <div style={styles.icon}>
          {getIcon()}
        </div>
        <div style={styles.content}>
          <div style={styles.title}>{achievement.title}</div>
          <div style={styles.message}>{achievement.message}</div>
          {achievement.xp && (
            <div style={styles.xp}>+{achievement.xp} XP</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AchievementToast;