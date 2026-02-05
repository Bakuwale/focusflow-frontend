import React, { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import storageService from '../services/storageService';
import { TASK_STATUS } from '../utils/constants';

const TaskContext = createContext();

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  // Load tasks from localStorage on mount
  useEffect(() => {
    const savedTasks = storageService.getTasks();
    setTasks(savedTasks);
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    if (tasks.length > 0 || storageService.getTasks().length > 0) {
      storageService.saveTasks(tasks);
    }
  }, [tasks]);

  // Add a new task
  const addTask = (taskData) => {
    const newTask = {
      id: uuidv4(),
      title: taskData.title || '',
      description: taskData.description || '',
      status: taskData.status || TASK_STATUS.TODO,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setTasks((prevTasks) => [...prevTasks, newTask]);
    return newTask;
  };

  // Update an existing task
  const updateTask = (taskId, updates, onTaskCompleted) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === taskId) {
          const updatedTask = { ...task, ...updates, updatedAt: new Date().toISOString() };
          
          // Check if task was just completed
          if (task.status !== TASK_STATUS.DONE && updates.status === TASK_STATUS.DONE) {
            if (onTaskCompleted) {
              onTaskCompleted();
            }
          }
          
          return updatedTask;
        }
        return task;
      })
    );
  };

  // Delete a task
  const deleteTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  // Move task to a different status/column
  const moveTask = (taskId, newStatus, onTaskCompleted) => {
    updateTask(taskId, { status: newStatus }, onTaskCompleted);
  };

  // Get tasks by status
  const getTasksByStatus = (status) => {
    return tasks.filter((task) => task.status === status);
  };

  // Get task counts
  const getTaskCounts = () => {
    return {
      total: tasks.length,
      todo: getTasksByStatus(TASK_STATUS.TODO).length,
      inProgress: getTasksByStatus(TASK_STATUS.IN_PROGRESS).length,
      done: getTasksByStatus(TASK_STATUS.DONE).length,
    };
  };

  // Get completed tasks count (daily)
  const getCompletedTasksCount = () => {
    const today = new Date().toISOString().split('T')[0];
    return tasks.filter(task => {
      if (task.status !== TASK_STATUS.DONE) return false;
      const taskDate = new Date(task.updatedAt).toISOString().split('T')[0];
      return taskDate === today;
    }).length;
  };

  // Get today's task counts
  const getTodayTaskCounts = () => {
    const today = new Date().toISOString().split('T')[0];
    const todayTasks = tasks.filter(task => {
      const taskDate = new Date(task.createdAt).toISOString().split('T')[0];
      return taskDate === today;
    });

    return {
      total: todayTasks.length,
      todo: todayTasks.filter(task => task.status === TASK_STATUS.TODO).length,
      inProgress: todayTasks.filter(task => task.status === TASK_STATUS.IN_PROGRESS).length,
      done: todayTasks.filter(task => task.status === TASK_STATUS.DONE).length,
    };
  };

  const value = {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    moveTask,
    getTasksByStatus,
    getTaskCounts,
    getTodayTaskCounts,
    getCompletedTasksCount,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};
