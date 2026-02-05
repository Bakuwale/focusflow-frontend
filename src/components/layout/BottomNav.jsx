import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, CheckSquare, Timer, BarChart3 } from 'lucide-react';
import styles from './BottomNav.styles';

const BottomNav = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', icon: Home, label: 'Dashboard' },
    { path: '/tasks', icon: CheckSquare, label: 'Tasks' },
    { path: '/focus', icon: Timer, label: 'Focus' },
    { path: '/analytics', icon: BarChart3, label: 'Analytics' },
  ];

  return (
    <nav style={styles.nav}>
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = location.pathname === item.path;
        return (
          <Link
            key={item.path}
            to={item.path}
            style={{
              ...styles.navItem,
              ...(isActive && styles.navItemActive),
            }}
          >
            <Icon size={22} />
            <span style={styles.navLabel}>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
};

export default BottomNav;
