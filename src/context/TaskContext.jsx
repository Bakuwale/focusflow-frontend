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
      priority: taskData.priority || 'medium',
      dueDate: taskData.dueDate || null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setTasks((prevTasks) => [...prevTasks, newTask]);
    return newTask;
  };

  // Update an existing task
  const updateTask = (taskId, updates) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId
          ? { ...task, ...updates, updatedAt: new Date().toISOString() }
          : task
      )
    );
  };

  // Delete a task
  const deleteTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  // Move task to a different status/column
  const moveTask = (taskId, newStatus) => {
    updateTask(taskId, { status: newStatus });
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

  // Get completed tasks count
  const getCompletedTasksCount = () => {
    return getTasksByStatus(TASK_STATUS.DONE).length;
  };

  const value = {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    moveTask,
    getTasksByStatus,
    getTaskCounts,
    getCompletedTasksCount,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};
