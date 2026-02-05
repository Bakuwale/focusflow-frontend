import React from 'react';
import BottomNav from './BottomNav';
import styles from './LayoutContainer.styles';

const LayoutContainer = ({ children }) => {
  return (
    <div style={styles.container}>
      <main style={styles.main}>
        {children}
      </main>
      <BottomNav />
    </div>
  );
};

export default LayoutContainer;
