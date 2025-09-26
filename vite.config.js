import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          animations: ['framer-motion', '@studio-freight/lenis']
        }
      }
    }
  },
  optimizeDeps: {
    include: ['framer-motion', '@studio-freight/lenis']
  }
});
