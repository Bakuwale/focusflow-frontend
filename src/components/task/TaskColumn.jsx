import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import TaskCard from './TaskCard';
import styles from './TaskColumn.styles';

// Sortable Task Card wrapper
const SortableTaskCard = ({ task, onTaskClick, onDeleteTask }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: task.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <TaskCard task={task} onClick={() => onTaskClick && onTaskClick(task)} onDelete={() => onDeleteTask && onDeleteTask(task)} />
    </div>
  );
};

const TaskColumn = ({ id, title, tasks = [], count, onTaskClick, onDeleteTask }) => {
  const { setNodeRef, isOver } = useDroppable({
    id: id || title,
  });

  const columnStyle = {
    ...styles.column,
    ...(isOver && { background: 'rgba(99, 102, 241, 0.1)' }),
  };

  return (
    <div ref={setNodeRef} style={columnStyle}>
      <div style={styles.header}>
        <h2 style={styles.title}>{title}</h2>
        <span style={styles.count}>{count || tasks.length}</span>
      </div>
      <SortableContext items={tasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
        <div style={styles.tasksList}>
          {tasks.map((task) => (
            <SortableTaskCard
              key={task.id}
              task={task}
              onTaskClick={onTaskClick}
              onDeleteTask={onDeleteTask}
            />
          ))}
        </div>
      </SortableContext>
    </div>
  );
};

export default TaskColumn;
