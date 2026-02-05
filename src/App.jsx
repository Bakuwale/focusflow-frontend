
import React from 'react';
import AppRoutes from './routes/AppRoutes';
import { TaskProvider } from './context/TaskContext';
import { TimerProvider } from './context/TimerContext';
import { SettingsProvider } from './context/SettingsContext';
import { XPProvider } from './context/XPContext';

// Root application shell for FocusFlow
// Wraps app with all context providers
const App = () => {
  return (
    <div className="app-root">
      <SettingsProvider>
        <XPProvider>
          <TaskProvider>
            <TimerProvider>
              <AppRoutes />
            </TimerProvider>
          </TaskProvider>
        </XPProvider>
      </SettingsProvider>
    </div>
  );
};

export default App;
