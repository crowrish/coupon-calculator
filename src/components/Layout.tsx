import { ReactNode } from 'react'
import Navigation from './Navigation'
import ScrollToTop from './ScrollToTop'

interface LayoutProps {
  children: ReactNode
}

function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50 font-sans flex flex-col">
      <div className="mx-auto max-w-md px-4 py-6 flex-1">
        <header className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900">쿠폰 계산기</h1>
          <p className="mt-2 text-sm text-gray-600">
            쿠폰 조건을 입력하고 최적의 할인 금액을 확인하세요
          </p>
        </header>
        <Navigation />
        <main>{children}</main>
      </div>
      <footer className="bg-gray-100 border-t border-gray-200">
        <div className="mx-auto max-w-md px-4 py-3">
          <div className="text-center text-xs text-gray-500">
            <p>© 2025 쿠폰 계산기. MIT License.</p>
            <p className="mt-1">
              <a 
                href="https://github.com/crowrish/coupon-calculator" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                GitHub
              </a>
              {' · '}
              <a 
                href="https://github.com/crowrish/coupon-calculator/blob/main/LICENSE" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                License
              </a>
            </p>
          </div>
        </div>
      </footer>
      <ScrollToTop />
    </div>
  )
}

export default Layout