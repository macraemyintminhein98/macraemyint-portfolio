import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import tailwindcss from "@tailwindcss/vite";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [tailwindcss(), react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Split Three.js (large) into its own chunk — loads only on Home
          'three-vendor': ['three'],
          // React core
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          // Animation
          'framer': ['framer-motion'],
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
}));
