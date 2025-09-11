// client/vite.config.js

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/postcss'

export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
  server: {
    proxy: {
      // Cualquier petición que empiece con '/api' será redirigida
      '/api': {
        target: 'http://localhost:5000', // El servidor del backend
        changeOrigin: true,
      },
    }
  }
})