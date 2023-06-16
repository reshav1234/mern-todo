import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  build: {
    rollupOptions: {
      input: 'src/main.jsx',
    },
  },
  plugins: [react()],
  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "axios"
    ],
  },
  server: {
    watch: {
      usePolling: true,
    },
    host: true,
    strictPort: true,
    port: 5173,
  },
});
