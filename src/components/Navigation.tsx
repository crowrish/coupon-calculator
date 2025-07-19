import { Link, useLocation } from 'react-router-dom'

function Navigation() {
  const location = useLocation()

  return (
    <nav className="mb-6">
      <div className="flex space-x-1 rounded-lg bg-gray-100 p-1">
        <Link
          to="/"
          className={`flex-1 rounded-md px-3 py-2 text-center text-sm font-medium transition-colors ${
            location.pathname === '/'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          단일 쿠폰
        </Link>
        <Link
          to="/compare"
          className={`flex-1 rounded-md px-3 py-2 text-center text-sm font-medium transition-colors ${
            location.pathname === '/compare'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          쿠폰 비교
        </Link>
      </div>
    </nav>
  )
}

export default Navigation