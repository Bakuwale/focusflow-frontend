// Application constants

export const TASK_STATUS = {
  TODO: 'todo',
  IN_PROGRESS: 'inProgress',
  DONE: 'done',
};

export const TIMER_MODE = {
  WORK: 'work',
  BREAK: 'break',
};

export const TIMER_STATE = {
  IDLE: 'idle',
  RUNNING: 'running',
  PAUSED: 'paused',
  COMPLETED: 'completed',
};

// XP rewards
export const XP_REWARDS = {
  TASK_COMPLETED: 50,
  FOCUS_SESSION: 100,
  DAILY_STREAK: 25,
};

// Level progression (XP required per level)
export const XP_PER_LEVEL = 500;

// Default timer durations (in minutes)
export const DEFAULT_WORK_DURATION = 25;
export const DEFAULT_BREAK_DURATION = 5;
