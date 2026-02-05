import React, { useState } from 'react';
import Card from '../common/Card';
import { Trash2 } from 'lucide-react';
import styles from './TaskCard.styles';

const TaskCard = ({ task, onClick, onDelete }) => {
  const [isDeleteHovered, setIsDeleteHovered] = useState(false);

  const handleDelete = (e) => {
    e.stopPropagation();
    if (onDelete) {
      onDelete(task);
    }
  };

  const deleteButtonStyle = {
    ...styles.deleteButton,
    ...(isDeleteHovered && {
      color: 'var(--ff-color-danger)',
      background: 'rgba(239, 68, 68, 0.1)',
      opacity: 1,
    }),
  };

  return (
    <Card style={styles.card} onClick={onClick}>
      <div style={styles.header}>
        <h3 style={styles.title}>{task.title}</h3>
        <div style={styles.headerActions}>
          {onDelete && (
            <button
              onClick={handleDelete}
              onMouseEnter={() => setIsDeleteHovered(true)}
              onMouseLeave={() => setIsDeleteHovered(false)}
              style={deleteButtonStyle}
              title="Delete task"
            >
              <Trash2 size={14} />
            </button>
          )}
        </div>
      </div>
      
      {task.description && (
        <p style={styles.description}>{task.description}</p>
      )}
    </Card>
  );
};

export default TaskCard;
