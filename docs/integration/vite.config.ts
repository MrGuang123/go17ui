import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "src/components"),
      "@go17/components": path.resolve(__dirname, "../../packages/components/src"),
      "@go17/hooks": path.resolve(__dirname, "../../packages/hooks/src")
    }
  },
  optimizeDeps: {
    exclude: ["@go17/components", "@go17/hooks"]
  },
  server: {
    port: 5173
  }
});
