import { defineConfig } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import Unocss from 'unocss/vite'
import Vue from '@vitejs/plugin-vue'
import * as path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [
    Vue(),
    AutoImport({
      imports: [
        'vue',
        'vue-router',
      ],
      dts: './src/types/auto-imports.d.ts'
    }),
    Unocss({
      rules: [
        ['b-1', { border: '1px solid #000' }],
      ]
    })
  ],
  server: {
    host: '0.0.0.0'
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  }
})
