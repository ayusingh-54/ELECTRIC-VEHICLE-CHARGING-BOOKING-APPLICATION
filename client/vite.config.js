import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Allow external connections
    port: 5173,
    proxy: {
      "/api": {
        target: process.env.VITE_BASE_URL || "http://localhost:3000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  build: {
    outDir: "dist",
    assetsDir: "assets",
    sourcemap: false,
    minify: "terser",
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
          router: ["react-router-dom"],
          bootstrap: ["react-bootstrap"],
          icons: ["react-icons"],
        },
      },
    },
  },
  define: {
    "process.env": {},
    // Provide fallback for missing environment variables
    "import.meta.env.VITE_BASE_URL": JSON.stringify(
      process.env.VITE_BASE_URL ||
        "https://electric-vehicle-charging-booking-a.vercel.app"
    ),
  },
  preview: {
    port: 4173,
    host: true,
  },
});
