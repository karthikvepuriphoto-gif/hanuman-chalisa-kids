import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: '/hanuman-chalisa-kids/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'icons/icon-192.png', 'icons/icon-512.png'],
      manifest: {
        name: 'Hanuman Chalisa',
        short_name: 'Hanuman Chalisa',
        description: "Hanuman's story, verse by verse — a gentle way for children to learn the Hanuman Chalisa.",
        theme_color: '#C8482A',
        background_color: '#FFF6EA',
        display: 'standalone',
        orientation: 'any',
        start_url: '/hanuman-chalisa-kids/',
        scope: '/hanuman-chalisa-kids/',
        icons: [
          { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
          { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,ico,woff,woff2,webmanifest}'],
        maximumFileSizeToCacheInBytes: 3 * 1024 * 1024,
        navigateFallback: 'index.html',
        // Audio is cached by public/audio-cache.js so range requests still seek.
        importScripts: ['audio-cache.js'],
      },
    }),
  ],
})
