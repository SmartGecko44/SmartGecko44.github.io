import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

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
})
