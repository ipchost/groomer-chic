import { defineConfig } from "vite"; // Используем основной vite для билда
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
  // Добавляем эти строки для надежности
  envPrefix: 'VITE_', 
  build: {
    outDir: 'dist',
  }
});