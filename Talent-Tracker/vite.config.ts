import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, 
    host: true, 
  },
  preview: {
    port: 4173, 
    allowedHosts: ['talent-tracker.onrender.com'] // ✅ Allows Render domain
  }
});
