import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),  // Asegúrate de que esto apunte correctamente a la carpeta src
      '@ui': path.resolve(__dirname, 'src/components/ui'),
    },
  },
})
