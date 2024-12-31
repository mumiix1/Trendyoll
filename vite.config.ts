import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/trendyol': {
        target: 'https://api.trendyol.com/sapigw',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/trendyol/, ''),
        headers: {
          'Connection': 'keep-alive'
        },
        configure: (proxy, _options) => {
          proxy.on('error', (err, _req, _res) => {
            console.log('proxy error', err);
          });
          proxy.on('proxyReq', (proxyReq, req, _res) => {
            console.log('Sending Request to Trendyol:', req.method, req.url);
          });
          proxy.on('proxyRes', (proxyRes, req, _res) => {
            console.log('Received Response from Trendyol:', proxyRes.statusCode, req.url);
          });
        },
      },
      '/api/amazon': {
        target: 'https://sellingpartnerapi.amazon.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/amazon/, ''),
        configure: (proxy, _options) => {
          proxy.on('error', (err, _req, _res) => {
            console.log('proxy error', err);
          });
          proxy.on('proxyReq', (proxyReq, req, _res) => {
            console.log('Sending Request to Amazon:', req.method, req.url);
          });
          proxy.on('proxyRes', (proxyRes, req, _res) => {
            console.log('Received Response from Amazon:', proxyRes.statusCode, req.url);
          });
        },
      }
    }
  }
});