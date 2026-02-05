import React from 'react';
import Badge from '../common/Badge';
import Card from '../common/Card';
import { Calendar, Flag, Trash2 } from 'lucide-react';
import { getRelativeDate } from '../../utils/dateUtils';
import styles from './TaskCard.styles';

const TaskCard = ({ task, onClick, onDelete }) => {
  const priorityColors = {
    high: 'danger',
    medium: 'warning',
    low: 'default',
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    if (onDelete) {
      onDelete(task);
    }
  };

  const formatDueDate = () => {
    if (!task.dueDate) return null;
    return getRelativeDate(new Date(task.dueDate));
  };

  return (
    <Card style={styles.card} onClick={onClick}>
      <div style={styles.header}>
        <h3 style={styles.title}>{task.title}</h3>
        <div style={styles.headerActions}>
          {task.priority && (
            <Badge variant={priorityColors[task.priority] || 'default'} size="sm">
              <Flag size={10} style={{ marginRight: '4px' }} />
              {task.priority}
            </Badge>
          )}
          {onDelete && (
            <button
              onClick={handleDelete}
              style={styles.deleteButton}
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
      
      <div style={styles.footer}>
        {task.dueDate && (
          <div style={styles.meta}>
            <Calendar size={14} />
            <span style={styles.metaText}>{formatDueDate()}</span>
          </div>
        )}
      </div>
    </Card>
  );
};

export default TaskCard;
