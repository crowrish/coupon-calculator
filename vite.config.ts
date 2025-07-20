import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}']
      },
      includeAssets: ['favicon-16x16.png', 'favicon-32x32.png', 'apple-touch-icon.png'],
      manifest: {
        name: '쿠폰 계산기',
        short_name: '쿠폰계산기',
        description: '쿠폰의 조건을 입력하면 최적의 할인 금액을 계산해주는 간단한 웹 앱입니다.',
        theme_color: '#3b82f6',
        background_color: '#ffffff',
        display: 'standalone',
        orientation: 'portrait',
        scope: '/coupon-calculator/',
        start_url: '/coupon-calculator/',
        display_override: ['window-controls-overlay', 'standalone'],
        launch_handler: {
          client_mode: 'navigate-new'
        },
        icons: [
          {
            src: 'icon-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'icon-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
  base: '/coupon-calculator/',
})