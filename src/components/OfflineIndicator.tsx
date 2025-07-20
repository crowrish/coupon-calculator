import { useState, useEffect } from 'react'

function OfflineIndicator() {
  const [isOnline, setIsOnline] = useState(navigator.onLine)
  const [showOfflineMessage, setShowOfflineMessage] = useState(false)

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true)
      setShowOfflineMessage(false)
    }

    const handleOffline = () => {
      setIsOnline(false)
      setShowOfflineMessage(true)
    }

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  useEffect(() => {
    if (isOnline && showOfflineMessage) {
      const timer = setTimeout(() => {
        setShowOfflineMessage(false)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [isOnline, showOfflineMessage])

  if (!showOfflineMessage && isOnline) return null

  return (
    <div className={`fixed top-4 left-4 right-4 mx-auto max-w-md z-50 transition-all duration-300`}>
      <div className={`rounded-lg p-3 shadow-lg ${
        isOnline 
          ? 'bg-green-600 dark:bg-green-700 text-white' 
          : 'bg-orange-600 dark:bg-orange-700 text-white'
      }`}>
        <div className="flex items-center">
          <div className={`w-2 h-2 rounded-full mr-2 ${
            isOnline ? 'bg-green-300 dark:bg-green-400' : 'bg-orange-300 dark:bg-orange-400'
          }`} />
          <span className="text-sm font-medium">
            {isOnline ? '인터넷에 다시 연결되었습니다' : '오프라인 모드'}
          </span>
        </div>
        {!isOnline && (
          <p className="mt-1 text-xs text-orange-100 dark:text-orange-200">
            인터넷 연결 없이도 앱을 사용할 수 있습니다
          </p>
        )}
      </div>
    </div>
  )
}

export default OfflineIndicator