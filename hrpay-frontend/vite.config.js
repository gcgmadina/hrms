import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path' 
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Components from 'unplugin-vue-components/vite'
  import frappeui from 'frappe-ui/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [frappeui(),vue()],

  
   server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8000', // Frappe backend
        changeOrigin: true,
        secure: false,
      }
    }
  },
  setup() {
    const router = useRouter()

    const login = async () => {
      // ...
      router.push('/dashboard')
    }

    return { login }
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), // Alias @ harus didefinisikan
    },
  },plugins: [vue(),
    Components({
      
    }),
    Icons({
      compiler: 'vue3',
    }),
  ], 

  optimizeDeps: {
    include: ['frappe-ui > feather-icons', 'showdown', 'engine.io-client'],
  },

})
