import { defineConfig } from 'vitest/config'  // Import from 'vitest/config' instead of 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// Extend Vite config to include Vitest settings
export default defineConfig({
  plugins: [react()],
  root: resolve(__dirname, 'gxcko.me'),
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'gxcko.me/index.html'),
      },
    },
  },
  test: {
    globals: true,  // Enable global variables like `describe` and `it` without imports
    environment: 'jsdom',  // Use jsdom to simulate a browser environment for React testHelpers
    setupFiles: './vitest.setup.ts',  // Optional: add any setup you need before testHelpers
    coverage: {
      reporter: ['text', 'json', 'html'],  // Generate test coverage reports in different formats
    },
  },
})
