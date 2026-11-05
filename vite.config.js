import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  const proxy = {
    "/api": {
      target: "http://api.favorit-parts.ru",
      changeOrigin: true,
      rewrite: (path) => {
        const url = new URL(path, "http://localhost");
        url.pathname = "/hs/hsprice/";
        url.searchParams.set("key", env.FAVORIT_API_KEY || "");
        return url.pathname + url.search;
      },
    },
  };

  return {
    plugins: [react()],
    server: { proxy },
    preview: { proxy },
  };
});
