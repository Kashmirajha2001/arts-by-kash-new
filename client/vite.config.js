import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    // The workspace root also has node_modules. Force every dependency
    // (including Framer Motion) to use this app's React instance.
    dedupe: ['react', 'react-dom'],
  },
})
