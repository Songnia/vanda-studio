import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { inspectAttr } from 'kimi-plugin-inspect-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const appMode = process.env.VITE_APP_MODE || 'public';

  return {
    base: '/',
    plugins: [inspectAttr(), react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    build: {
      outDir: appMode === 'admin' ? 'dist-admin' : 'dist-public',
      rollupOptions: {
        input: appMode === 'admin' ? 'index-admin.html' : 'index-public.html',
        output: {
          // Rename the HTML entry to index.html in the output
          entryFileNames: 'assets/[name]-[hash].js',
          chunkFileNames: 'assets/[name]-[hash].js',
          assetFileNames: 'assets/[name]-[hash][extname]',
        },
      },
    },
  };
});

