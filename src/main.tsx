import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename="/coupon-calculator">
      <App />
    </BrowserRouter>
  </StrictMode>,
)

// PWA Service Worker 등록
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/coupon-calculator/sw.js')
      .then((registration) => {
        console.log('SW registered: ', registration)
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError)
      })
  })
}

// 상태 표시줄 스타일 다크모드 대응
const updateStatusBarStyle = () => {
  const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  const metaTag = document.querySelector('meta[name="apple-mobile-web-app-status-bar-style"]')
  if (metaTag) {
    metaTag.setAttribute('content', isDark ? 'black-translucent' : 'default')
  }
}

// 초기 설정
updateStatusBarStyle()

// 다크모드 변경 감지
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', updateStatusBarStyle)

// PWA 창 크기 제어
if (window.matchMedia('(display-mode: standalone)').matches) {
  // PWA 모드에서 실행 중일 때
  const resizeWindow = () => {
    if (window.outerWidth > 450) {
      try {
        window.resizeTo(414, Math.max(window.outerHeight, 800))
      } catch (e) {
        // 일부 브라우저에서는 resizeTo가 제한될 수 있음
        console.log('Window resize not allowed')
      }
    }
  }
  
  // 페이지 로드 시 크기 조정
  window.addEventListener('load', resizeWindow)
  
  // 창 크기 변경 시에도 체크
  window.addEventListener('resize', () => {
    setTimeout(resizeWindow, 100)
  })
}