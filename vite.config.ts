import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      // entry: path.resolve("src", 'src/components/index.jsx'),
      entry: path.resolve(__dirname, 'index.ts'),
      name: 'grid',
      fileName: (format) => `index.${format}.js`
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        }
      }
    },
    sourcemap: true,
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "./src/"),
      "src": path.resolve(__dirname, "src/")
    }
  },
  plugins: [react()],
})
