import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    TanStackRouterVite({ autoCodeSplitting: true }),
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), // `@` を `src` にマッピング
    },
  },
  server: {
    proxy: {
      "/ws": {
        target: "http://localhost:8080", // バックエンドのアドレス
        changeOrigin: true,
      },
    },
  },
});
