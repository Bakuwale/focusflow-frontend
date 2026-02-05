import React from 'react';
import { X } from 'lucide-react';
import styles from './Modal.styles';

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div style={styles.header}>
          {title && <h2 style={styles.title}>{title}</h2>}
          <button style={styles.closeButton} onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        <div style={styles.content}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
