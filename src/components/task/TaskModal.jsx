import React, { useState, useEffect } from 'react';
import Modal from '../common/Modal';
import Input from '../common/Input';
import Button from '../common/Button';
import { TASK_STATUS, TASK_PRIORITY } from '../../utils/constants';

const TaskModal = ({ isOpen, onClose, task, onSave }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: TASK_STATUS.TODO,
    priority: TASK_PRIORITY.MEDIUM,
    dueDate: '',
  });

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || '',
        description: task.description || '',
        status: task.status || TASK_STATUS.TODO,
        priority: task.priority || TASK_PRIORITY.MEDIUM,
        dueDate: task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : '',
      });
    } else {
      setFormData({
        title: '',
        description: '',
        status: TASK_STATUS.TODO,
        priority: TASK_PRIORITY.MEDIUM,
        dueDate: '',
      });
    }
  }, [task, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    const taskData = {
      ...formData,
      dueDate: formData.dueDate ? new Date(formData.dueDate).toISOString() : null,
    };

    onSave(taskData);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={task ? 'Edit Task' : 'New Task'}>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '16px' }}>
          <Input
            label="Task Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="Enter task title"
            required
          />
        </div>

        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 600, color: 'var(--ff-color-text)' }}>
            Description
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Enter task description"
            style={{
              width: '100%',
              padding: '12px 16px',
              background: 'var(--ff-color-surface-soft)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: 'var(--ff-radius-sm)',
              color: 'var(--ff-color-text)',
              fontSize: '16px',
              minHeight: '100px',
              resize: 'vertical',
              fontFamily: 'inherit',
            }}
          />
        </div>

        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 600, color: 'var(--ff-color-text)' }}>
            Priority
          </label>
          <select
            value={formData.priority}
            onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
            style={{
              width: '100%',
              padding: '12px 16px',
              background: 'var(--ff-color-surface-soft)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: 'var(--ff-radius-sm)',
              color: 'var(--ff-color-text)',
              fontSize: '16px',
            }}
          >
            <option value={TASK_PRIORITY.LOW}>Low</option>
            <option value={TASK_PRIORITY.MEDIUM}>Medium</option>
            <option value={TASK_PRIORITY.HIGH}>High</option>
          </select>
        </div>

        <div style={{ marginBottom: '16px' }}>
          <Input
            label="Due Date"
            type="date"
            value={formData.dueDate}
            onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
          />
        </div>

        {task && (
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 600, color: 'var(--ff-color-text)' }}>
              Status
            </label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              style={{
                width: '100%',
                padding: '12px 16px',
                background: 'var(--ff-color-surface-soft)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: 'var(--ff-radius-sm)',
                color: 'var(--ff-color-text)',
                fontSize: '16px',
              }}
            >
              <option value={TASK_STATUS.TODO}>To Do</option>
              <option value={TASK_STATUS.IN_PROGRESS}>In Progress</option>
              <option value={TASK_STATUS.DONE}>Done</option>
            </select>
          </div>
        )}

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '24px' }}>
          <Button type="button" variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary">
            {task ? 'Update' : 'Create'} Task
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default TaskModal;
