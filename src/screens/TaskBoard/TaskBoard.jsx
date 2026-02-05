import React, { useState } from 'react';
import { DndContext, closestCorners, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import LayoutContainer from '../../components/layout/LayoutContainer';
import TaskColumn from '../../components/task/TaskColumn';
import TaskModal from '../../components/task/TaskModal';
import Button from '../../components/common/Button';
import { useTasks } from '../../context/TaskContext';
import { useXP } from '../../context/XPContext';
import { TASK_STATUS } from '../../utils/constants';
import { Plus } from 'lucide-react';
import styles from './TaskBoard.styles';

const TaskBoard = () => {
  const { tasks, addTask, updateTask, deleteTask, moveTask, getTasksByStatus, getTaskCounts } = useTasks();
  const { addXP, updateStreak } = useXP();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const todoTasks = getTasksByStatus(TASK_STATUS.TODO);
  const inProgressTasks = getTasksByStatus(TASK_STATUS.IN_PROGRESS);
  const doneTasks = getTasksByStatus(TASK_STATUS.DONE);
  const taskCounts = getTaskCounts();

  const handleAddTask = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleSaveTask = (taskData) => {
    if (editingTask) {
      // Update existing task
      const wasDone = editingTask.status === TASK_STATUS.DONE;
      const isNowDone = taskData.status === TASK_STATUS.DONE;
      
      updateTask(editingTask.id, taskData);
      
      // Award XP if task was just completed
      if (!wasDone && isNowDone) {
        addXP(50, 'Task completed');
        updateStreak();
      }
    } else {
      // Create new task
      addTask(taskData);
    }
  };

  const handleDeleteTask = (task) => {
    if (window.confirm(`Are you sure you want to delete "${task.title}"?`)) {
      deleteTask(task.id);
    }
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    // Check if dragging to a column (status change)
    const statusMap = {
      [TASK_STATUS.TODO]: TASK_STATUS.TODO,
      [TASK_STATUS.IN_PROGRESS]: TASK_STATUS.IN_PROGRESS,
      [TASK_STATUS.DONE]: TASK_STATUS.DONE,
    };

    // Find which column the task was dropped on
    let newStatus = null;
    if (overId === TASK_STATUS.TODO || overId === TASK_STATUS.IN_PROGRESS || overId === TASK_STATUS.DONE) {
      newStatus = overId;
    } else {
      // Dropped on another task, find its status
      const overTask = tasks.find(t => t.id === overId);
      if (overTask) {
        newStatus = overTask.status;
      }
    }

    if (newStatus) {
      const activeTask = tasks.find(t => t.id === activeId);
      if (activeTask && activeTask.status !== newStatus) {
        const wasDone = activeTask.status === TASK_STATUS.DONE;
        const isNowDone = newStatus === TASK_STATUS.DONE;
        
        moveTask(activeId, newStatus);
        
        // Award XP if task was just completed
        if (!wasDone && isNowDone) {
          addXP(50, 'Task completed');
          updateStreak();
        }
      }
    }
  };

  return (
    <LayoutContainer>
      <div style={styles.container}>
        <header style={styles.header}>
          <div>
            <h1 style={styles.title}>Task Board</h1>
            <p style={styles.subtitle}>Organize and track your tasks</p>
          </div>
          <Button onClick={handleAddTask} style={styles.addButton}>
            <Plus size={20} style={{ marginRight: '8px' }} />
            Add Task
          </Button>
        </header>

        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragEnd={handleDragEnd}
        >
          <div style={styles.board}>
            <TaskColumn
              id={TASK_STATUS.TODO}
              title="To Do"
              tasks={todoTasks}
              count={taskCounts.todo}
              onTaskClick={handleEditTask}
              onDeleteTask={handleDeleteTask}
            />
            <TaskColumn
              id={TASK_STATUS.IN_PROGRESS}
              title="In Progress"
              tasks={inProgressTasks}
              count={taskCounts.inProgress}
              onTaskClick={handleEditTask}
              onDeleteTask={handleDeleteTask}
            />
            <TaskColumn
              id={TASK_STATUS.DONE}
              title="Done"
              tasks={doneTasks}
              count={taskCounts.done}
              onTaskClick={handleEditTask}
              onDeleteTask={handleDeleteTask}
            />
          </div>
        </DndContext>

        <TaskModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setEditingTask(null);
          }}
          task={editingTask}
          onSave={handleSaveTask}
        />
      </div>
    </LayoutContainer>
  );
};

export default TaskBoard;
