
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite configuration for FocusFlow (React + JS)
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true
  }
});
