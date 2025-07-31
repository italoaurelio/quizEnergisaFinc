import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // Importante para o Electron
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        manualChunks: undefined
      }
    },
    copyPublicDir: true // Garantir que arquivos públicos sejam copiados
  },
  server: {
    port: 5173,
    strictPort: true
  },
  publicDir: 'public' // Definir explicitamente o diretório público
})
