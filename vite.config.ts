/*
 * @Author: xiaoman
 * @Date: 2025-03-05 09:15:31
 * @LastEditors: xiaoman
 * @Description: 
 */
import { join } from "path";
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": join(__dirname, "./src/"),
    },
  },
})
