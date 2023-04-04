import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),
  AutoImport({
    resolvers: [ElementPlusResolver()],
  }),
  Components({
    resolvers: [ElementPlusResolver()],
  }),
  ],
  // 反向代理
  server: {
    host: '0.0.0.0',
    open: true,
    hmr: true,
    proxy: {
      '/api': {
        target: 'http://47.97.213.89:8081',
        changeOrigin: true,
        // pathRewrite: {
        //   '^/api': 
        // }
        rewrite: path => path.replace(new RegExp('^' + 'api'), '') // 路径重写
      }
    }
  },
  resolve: {
    alias: {
      '@': path.join(__dirname, 'src')
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        // 两种方式都可以
        additionalData: '@import "@/styles/variable.scss";'
      }
    }
  },
})
