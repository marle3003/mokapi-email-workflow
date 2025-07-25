import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  root: path.resolve(__dirname, 'frontend'),
  plugins: [vue()],
  build: {
    outDir: path.resolve(__dirname, 'frontend/dist'), // 👈 build output goes to /dist
    emptyOutDir: true,
  },
})
