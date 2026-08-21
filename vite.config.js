import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  // Thêm phần này vào để nhận diện file HTML có tên tùy chỉnh
  build: {
    rollupOptions: {
      input: {
        main: './index.html', // Thay tên file của bạn vào đây
      },
    },
  },
})