
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from '../screens/Dashboard/Dashboard';
import TaskBoard from '../screens/TaskBoard/TaskBoard';
import FocusTimer from '../screens/FocusTimer/FocusTimer';
import Analytics from '../screens/Analytics/Analytics';
import Settings from '../screens/Settings/Settings';

// Application routes for FocusFlow
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/tasks" element={<TaskBoard />} />
      <Route path="/focus" element={<FocusTimer />} />
      <Route path="/analytics" element={<Analytics />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="*" element={<div style={{ padding: '40px', textAlign: 'center', color: 'var(--ff-color-text)' }}>Page Not Found</div>} />
    </Routes>
  );
};

export default AppRoutes;
