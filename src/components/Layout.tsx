import { ReactNode } from 'react'
import Navigation from './Navigation'

interface LayoutProps {
  children: ReactNode
}

function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <div className="mx-auto max-w-md px-4 py-6">
        <header className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900">쿠폰 계산기</h1>
          <p className="mt-2 text-sm text-gray-600">
            쿠폰 조건을 입력하고 최적의 할인 금액을 확인하세요
          </p>
        </header>
        <Navigation />
        <main>{children}</main>
      </div>
    </div>
  )
}

export default Layout