import path from "path"
import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vite.dev/config/
export default defineConfig({
  plugins: [svelte()],
  root: './src',
  envDir: '../',
  build: {
    rollupOptions: {
      input: {
        'index': '/index.html',
        'blog': '/blog.html',
        'blog-post': '/blog-post.html',
        'dj': '/dj.html',
        'gallery': '/gallery.html',
        'gallery-photo': '/gallery-photo.html',
        'micron': '/micron.html',
        'cleaner': '/cleaner.html',
        'cleaner-unknown': '/cleaner-unknown.html',
      },
      output: {
        dir: './dist',
      },
    }
  },
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "./src/components"),
      "@services": path.resolve(__dirname, "./src/services"),
      "@pages": path.resolve(__dirname, "./src/pages"),
    },
  },
})
