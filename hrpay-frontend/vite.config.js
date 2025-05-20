import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import Icons from 'unplugin-icons/vite'
import Components from 'unplugin-vue-components/vite'
// import frappeui from 'frappe-ui/vite'
const frappeUI = await import('frappe-ui/vite');


export default defineConfig({
  plugins: [
    frappeui(),
    vue(),
    Components(),
    Icons({ compiler: 'vue3' }),
  ],

  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false,
      },
    },
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },

  optimizeDeps: {
    include: ['frappe-ui', 'feather-icons', 'showdown', 'engine.io-client'],
  },
})
