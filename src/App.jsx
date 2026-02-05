
import React from 'react';
import AppRoutes from './routes/AppRoutes';
import { TaskProvider } from './context/TaskContext';
import { TimerProvider } from './context/TimerContext';
import { XPProvider } from './context/XPContext';
import FocusMode from './components/timer/FocusMode';

// Root application shell for FocusFlow
// Wraps app with all context providers
const App = () => {
  return (
    <div className="app-root">
      <XPProvider>
        <TaskProvider>
          <TimerProvider>
            <AppRoutes />
            <FocusMode />
          </TimerProvider>
        </TaskProvider>
      </XPProvider>
    </div>
  );
};

export default App;
