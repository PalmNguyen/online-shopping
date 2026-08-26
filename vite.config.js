import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'
import glob from 'fast-glob'

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        // Quét chuẩn tất cả các file HTML trong thư mục components
        ...Object.fromEntries(
          glob.sync('src/components/**/*.html').map(file => [
            file.replace(/^src\/components\//, '').replace(/\.html$/, ''),
            resolve(import.meta.dirname, file)
          ])
        )
      },
    },
  },
})