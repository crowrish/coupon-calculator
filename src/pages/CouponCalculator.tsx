import { useState, useEffect, useCallback } from 'react'

interface CouponData {
  discountRate: number
  minPurchase: number
  maxDiscount: number
  purchaseAmount: number
}

function CouponCalculator() {
  const [couponData, setCouponData] = useState<CouponData>({
    discountRate: 0,
    minPurchase: 0,
    maxDiscount: 0,
    purchaseAmount: 0,
  })

  const [result, setResult] = useState<{
    discountAmount: number
    finalAmount: number
    isOptimal: boolean
  } | null>(null)

  const [optimalInfo, setOptimalInfo] = useState<{
    optimalAmount: number
    maxDiscountAmount: number
  } | null>(null)

  const calculateDiscount = useCallback(() => {
    const { discountRate, minPurchase, maxDiscount, purchaseAmount } = couponData

    if (purchaseAmount < minPurchase) {
      setResult({
        discountAmount: 0,
        finalAmount: purchaseAmount,
        isOptimal: false,
      })
      return
    }

    const calculatedDiscount = purchaseAmount * (discountRate / 100)
    const actualDiscount = Math.min(calculatedDiscount, maxDiscount)
    const finalAmount = purchaseAmount - actualDiscount

    const optimalPurchaseAmount = maxDiscount / (discountRate / 100)
    const isOptimal = purchaseAmount >= optimalPurchaseAmount

    setResult({
      discountAmount: actualDiscount,
      finalAmount,
      isOptimal,
    })
  }, [couponData])

  const calculateOptimalInfo = useCallback(() => {
    const { discountRate, minPurchase, maxDiscount } = couponData
    
    if (discountRate > 0 && maxDiscount > 0) {
      const optimalAmount = Math.max(minPurchase, maxDiscount / (discountRate / 100))
      setOptimalInfo({
        optimalAmount,
        maxDiscountAmount: maxDiscount,
      })
    } else {
      setOptimalInfo(null)
    }
  }, [couponData])

  useEffect(() => {
    calculateOptimalInfo()
  }, [calculateOptimalInfo])

  useEffect(() => {
    if (couponData.purchaseAmount > 0) {
      calculateDiscount()
    } else {
      setResult(null)
    }
  }, [calculateDiscount, couponData.purchaseAmount])

  const handleInputChange = (field: keyof CouponData, value: string) => {
    const numValue = parseFloat(value) || 0
    setCouponData(prev => ({ ...prev, [field]: numValue }))
  }

  const formatKoreanWon = (amount: number) => {
    if (amount === 0) return ''
    if (amount >= 10000) {
      const man = Math.floor(amount / 10000)
      const remainder = amount % 10000
      if (remainder === 0) {
        return `(${man}만원)`
      } else {
        return `(${man}만${(remainder / 1000).toLocaleString()}천원)`
      }
    } else if (amount >= 1000) {
      return `(${(amount / 1000).toLocaleString()}천원)`
    } else {
      return `(${amount}원)`
    }
  }

  const resetAll = () => {
    setCouponData({
      discountRate: 0,
      minPurchase: 0,
      maxDiscount: 0,
      purchaseAmount: 0,
    })
    setResult(null)
    setOptimalInfo(null)
  }

  return (
    <div className="space-y-6">
      <div className="rounded-lg bg-white dark:bg-gray-800 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">쿠폰 조건</h2>
          <button
            onClick={resetAll}
            className="rounded-md bg-gray-200 dark:bg-gray-600 px-3 py-1.5 text-xs font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
          >
            초기화
          </button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              할인율 (%)
            </label>
            <input
              type="number"
              className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="예: 40"
              value={couponData.discountRate || ''}
              onChange={(e) => handleInputChange('discountRate', e.target.value)}
            />
            <div className="mt-2 flex flex-wrap gap-2">
              {[5, 10, 15, 20, 25, 30, 50].map((rate) => (
                <button
                  key={rate}
                  type="button"
                  onClick={() => handleInputChange('discountRate', rate.toString())}
                  className="rounded-md bg-gray-100 dark:bg-gray-600 px-2 py-1 text-xs font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition-colors"
                >
                  {rate}%
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              최소 구매 금액 {formatKoreanWon(couponData.minPurchase) || '(원)'}
            </label>
            <input
              type="number"
              className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="예: 10000"
              value={couponData.minPurchase || ''}
              onChange={(e) => handleInputChange('minPurchase', e.target.value)}
            />
            <div className="mt-2 flex flex-wrap gap-2">
              {[5000, 10000, 20000, 30000, 50000].map((amount) => (
                <button
                  key={amount}
                  type="button"
                  onClick={() => handleInputChange('minPurchase', amount.toString())}
                  className="rounded-md bg-gray-100 dark:bg-gray-600 px-2 py-1 text-xs font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition-colors"
                >
                  {amount.toLocaleString()}원
                </button>
              ))}
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => handleInputChange('minPurchase', (couponData.minPurchase + 1000).toString())}
                className="rounded-md bg-blue-100 dark:bg-blue-900 px-2 py-1 text-xs font-medium text-blue-700 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition-colors"
              >
                +1,000원
              </button>
              <button
                type="button"
                onClick={() => handleInputChange('minPurchase', (couponData.minPurchase + 10000).toString())}
                className="rounded-md bg-blue-100 dark:bg-blue-900 px-2 py-1 text-xs font-medium text-blue-700 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition-colors"
              >
                +10,000원
              </button>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              최대 할인 금액 {formatKoreanWon(couponData.maxDiscount) || '(원)'}
            </label>
            <input
              type="number"
              className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="예: 5000"
              value={couponData.maxDiscount || ''}
              onChange={(e) => handleInputChange('maxDiscount', e.target.value)}
            />
            <div className="mt-2 flex flex-wrap gap-2">
              {[1000, 2000, 5000, 10000, 20000].map((amount) => (
                <button
                  key={amount}
                  type="button"
                  onClick={() => handleInputChange('maxDiscount', amount.toString())}
                  className="rounded-md bg-gray-100 dark:bg-gray-600 px-2 py-1 text-xs font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition-colors"
                >
                  {amount.toLocaleString()}원
                </button>
              ))}
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => handleInputChange('maxDiscount', (couponData.maxDiscount + 1000).toString())}
                className="rounded-md bg-blue-100 dark:bg-blue-900 px-2 py-1 text-xs font-medium text-blue-700 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition-colors"
              >
                +1,000원
              </button>
              <button
                type="button"
                onClick={() => handleInputChange('maxDiscount', (couponData.maxDiscount + 10000).toString())}
                className="rounded-md bg-blue-100 dark:bg-blue-900 px-2 py-1 text-xs font-medium text-blue-700 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition-colors"
              >
                +10,000원
              </button>
            </div>
          </div>
        </div>
      </div>

      {optimalInfo && (
        <div className="rounded-lg bg-blue-50 dark:bg-blue-900/20 p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-blue-900 dark:text-blue-300">💡 최적 할인 정보</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-blue-700 dark:text-blue-400">최대 할인을 받는 구매 금액:</span>
              <span className="font-bold text-blue-900 dark:text-blue-300">
                {Math.round(optimalInfo.optimalAmount).toLocaleString()}원
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-blue-700 dark:text-blue-400">받을 수 있는 최대 할인:</span>
              <span className="font-bold text-red-600">
                -{Math.round(optimalInfo.maxDiscountAmount).toLocaleString()}원
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-blue-700 dark:text-blue-400">최종 결제 금액:</span>
              <span className="font-bold text-blue-900 dark:text-blue-300">
                {Math.round(optimalInfo.optimalAmount - optimalInfo.maxDiscountAmount).toLocaleString()}원
              </span>
            </div>
          </div>
        </div>
      )}

      <div className="rounded-lg bg-white dark:bg-gray-800 p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">구매 금액 (선택사항)</h2>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            구매하려는 금액 (원)
          </label>
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            입력하면 실시간으로 할인 금액을 계산합니다
          </p>
          <input
            type="number"
            className="mt-2 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="예: 12500"
            value={couponData.purchaseAmount || ''}
            onChange={(e) => handleInputChange('purchaseAmount', e.target.value)}
          />
          <div className="mt-2 flex flex-wrap gap-2">
            {[10000, 15000, 20000, 30000, 50000].map((amount) => (
              <button
                key={amount}
                type="button"
                onClick={() => handleInputChange('purchaseAmount', amount.toString())}
                className="rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition-colors"
              >
                {amount.toLocaleString()}원
              </button>
            ))}
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => handleInputChange('purchaseAmount', (couponData.purchaseAmount + 1000).toString())}
              className="rounded-md bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition-colors"
            >
              +1,000원
            </button>
            <button
              type="button"
              onClick={() => handleInputChange('purchaseAmount', (couponData.purchaseAmount + 10000).toString())}
              className="rounded-md bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition-colors"
            >
              +10,000원
            </button>
          </div>
        </div>
      </div>

      {result && (
        <div className="rounded-lg bg-white dark:bg-gray-800 p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">실제 할인 계산 결과</h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-700 dark:text-gray-300">구매 금액:</span>
              <span className="font-medium text-gray-900 dark:text-white">
                {Math.round(couponData.purchaseAmount).toLocaleString()}원
              </span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-700 dark:text-gray-300">할인 금액:</span>
              <span className="font-medium text-red-600">
                -{Math.round(result.discountAmount).toLocaleString()}원
              </span>
            </div>
            
            <div className="flex justify-between border-t pt-3">
              <span className="text-gray-900 dark:text-white font-semibold">최종 결제 금액:</span>
              <span className="font-bold text-lg text-blue-600">
                {Math.round(result.finalAmount).toLocaleString()}원
              </span>
            </div>
            
            {result.isOptimal && result.discountAmount > 0 && (
              <div className="mt-4 rounded-md bg-green-50 dark:bg-green-900/20 p-3">
                <p className="text-sm text-green-800 dark:text-green-300">
                  ✅ 최적의 할인을 받고 있습니다!
                </p>
              </div>
            )}
            
            {!result.isOptimal && result.discountAmount > 0 && (
              <div className="mt-4 rounded-md bg-yellow-50 dark:bg-yellow-900/20 p-3">
                <p className="text-sm text-yellow-800 dark:text-yellow-300">
                  💡 더 많은 할인을 받으려면 {Math.round(couponData.maxDiscount / (couponData.discountRate / 100)).toLocaleString()}원 이상 구매하세요.
                </p>
              </div>
            )}
            
            {result.discountAmount === 0 && (
              <div className="mt-4 rounded-md bg-red-50 dark:bg-red-900/20 p-3">
                <p className="text-sm text-red-800 dark:text-red-300">
                  ❌ 최소 구매 금액 {Math.round(couponData.minPurchase).toLocaleString()}원을 충족하지 않아 할인을 받을 수 없습니다.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default CouponCalculator