// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: [
        'favicon.ico',
        'apple-touch-icon.png',
        'assets/logo.png'
      ],
      manifest: {
        name: 'Settlers Inn',
        short_name: 'Settlers',
        start_url: '/',
        display: 'standalone',
        background_color: '#0d1117',
        theme_color: '#9fef00',
        description: 'Authentic dishes & cozy stays — Where Settlers Still Eat Like Kings.',
        icons: [
          {
            src: 'assets/logo.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any maskable',
          },
          {
            src: 'assets/logo.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
          {
            src: 'favicon.ico',
            sizes: '48x48',
            type: 'image/x-icon'
          }
        ],
        lang: 'en-KE',
        dir: 'ltr',
        orientation: 'portrait',
        scope: '/',
        categories: ['food', 'hospitality', 'restaurant', 'hotel'],
        screenshots: [
          {
            src: 'assets/preview1.png',
            sizes: '540x720',
            type: 'image/png'
          },
          {
            src: 'assets/preview2.png',
            sizes: '540x720',
            type: 'image/png'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,svg}'],
        globIgnores: [
          '**/assets/settlers.mp4',
          '**/*.{jpg,jpeg,png,webp,gif}'
        ],
        maximumFileSizeToCacheInBytes: 2 * 1024 * 1024,
        runtimeCaching: [
          {
            urlPattern: ({ request }) => request.destination === 'image',
            handler: 'CacheFirst',
            options: {
              cacheName: 'image-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 15,
              },
            },
          },
          {
            urlPattern: ({ request }) =>
              ['style', 'script', 'worker'].includes(request.destination),
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'static-resources',
            },
          },
          {
            urlPattern: ({ url }) => url.pathname.startsWith('/assets/'),
            handler: 'CacheFirst',
            options: {
              cacheName: 'asset-cache',
              expiration: {
                maxEntries: 30,
                maxAgeSeconds: 60 * 60 * 24 * 7,
              },
            },
          },
        ],
        skipWaiting: true,
        clientsClaim: true,
      },
      devOptions: {
        enabled: true,
        type: 'module',
      },
    }),
  ],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },

  build: {
    outDir: 'dist',
    sourcemap: false,
    emptyOutDir: true,
    minify: 'esbuild',
    chunkSizeWarningLimit: 1000,
  },
});
