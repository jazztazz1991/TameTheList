import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  server: {
    port: 5173, // Use Vite's default port
    proxy: {
      "/api": "http://localhost:3001", // Proxy API requests to your Express server
    },
  },
});
