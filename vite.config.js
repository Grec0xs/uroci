import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { apiApp } from './server/apiApp.js';

export default defineConfig({
  base: './',
  plugins: [
    react(),
    {
      name: 'uroci-api-middleware',
      configureServer(server) {
        server.middlewares.use(apiApp);
      },
    },
  ],
  server: {
    port: 5173,
  },
});
