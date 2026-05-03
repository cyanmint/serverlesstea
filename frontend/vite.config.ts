import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: './',
  define: {
    'import.meta.env.VITE_API_URL': JSON.stringify(process.env.VITE_API_URL ?? process.env.WORKER_URL ?? 'https://git-devel.cyanmint.workers.dev'),
  },
  plugins: [react()],
})
