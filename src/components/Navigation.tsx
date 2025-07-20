import { Link, useLocation } from 'react-router-dom'

function Navigation() {
  const location = useLocation()

  return (
    <nav className="mb-6">
      <div className="flex space-x-1 rounded-lg bg-gray-100 dark:bg-gray-800 p-1">
        <Link
          to="/"
          className={`flex-1 rounded-md px-3 py-2 text-center text-sm font-medium transition-colors ${
            location.pathname === '/'
              ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm'
              : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
          }`}
        >
          단일 쿠폰
        </Link>
        <Link
          to="/compare"
          className={`flex-1 rounded-md px-3 py-2 text-center text-sm font-medium transition-colors ${
            location.pathname === '/compare'
              ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm'
              : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
          }`}
        >
          쿠폰 비교
        </Link>
      </div>
    </nav>
  )
}

export default Navigation