import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  base: '/',
  define: {
    'import.meta.env.VITE_ENVIRONMENT': JSON.stringify(mode)
  }
}))
