import { useState } from 'react'

interface Coupon {
  id: number
  name: string
  discountRate: number
  minPurchase: number
  maxDiscount: number
}

interface ComparisonResult {
  coupon: Coupon
  discountAmount: number
  finalAmount: number
  isOptimal: boolean
  optimalPurchaseAmount: number
  rank?: number
}

function CouponComparison() {
  const [coupons, setCoupons] = useState<Coupon[]>([
    { id: 1, name: '쿠폰 1', discountRate: 0, minPurchase: 0, maxDiscount: 0 },
    { id: 2, name: '쿠폰 2', discountRate: 0, minPurchase: 0, maxDiscount: 0 },
    { id: 3, name: '쿠폰 3', discountRate: 0, minPurchase: 0, maxDiscount: 0 },
  ])

  const [purchaseAmount, setPurchaseAmount] = useState<number>(0)
  const [results, setResults] = useState<ComparisonResult[]>([])

  const handleCouponChange = (id: number, field: keyof Omit<Coupon, 'id'>, value: string) => {
    const numValue = field === 'name' ? value : (parseFloat(value) || 0)
    setCoupons(prev => prev.map(coupon => 
      coupon.id === id 
        ? { ...coupon, [field]: numValue }
        : coupon
    ))
  }

  const calculateComparison = () => {
    const validCoupons = coupons.filter(coupon => 
      coupon.discountRate > 0 && coupon.maxDiscount > 0
    )

    const comparisonResults: ComparisonResult[] = validCoupons.map(coupon => {
      let discountAmount = 0
      let finalAmount = purchaseAmount

      if (purchaseAmount >= coupon.minPurchase) {
        const calculatedDiscount = purchaseAmount * (coupon.discountRate / 100)
        discountAmount = Math.min(calculatedDiscount, coupon.maxDiscount)
        finalAmount = purchaseAmount - discountAmount
      }

      const optimalPurchaseAmount = Math.max(
        coupon.minPurchase,
        coupon.maxDiscount / (coupon.discountRate / 100)
      )

      const isOptimal = purchaseAmount >= optimalPurchaseAmount

      return {
        coupon,
        discountAmount,
        finalAmount,
        isOptimal,
        optimalPurchaseAmount,
      }
    })

    // 할인 금액으로 정렬하여 순위 결정
    const sortedResults = [...comparisonResults].sort((a, b) => b.discountAmount - a.discountAmount)
    
    // 원래 쿠폰 순서(1,2,3)로 정렬하되 순위 정보 추가
    const resultsWithRank = comparisonResults.map(result => {
      const rank = sortedResults.findIndex(sorted => sorted.coupon.id === result.coupon.id) + 1
      return { ...result, rank }
    })
    
    setResults(resultsWithRank)
  }

  const getOptimalStrategies = () => {
    const validCoupons = coupons.filter(coupon => 
      coupon.discountRate > 0 && coupon.maxDiscount > 0
    )

    const strategies = validCoupons.map(coupon => {
      const optimalAmount = Math.max(
        coupon.minPurchase,
        coupon.maxDiscount / (coupon.discountRate / 100)
      )
      return {
        coupon,
        optimalAmount,
        maxDiscount: coupon.maxDiscount,
        finalAmount: optimalAmount - coupon.maxDiscount,
      }
    })

    // 최종 결제 금액으로 정렬하여 순위 결정
    const sortedStrategies = [...strategies].sort((a, b) => a.finalAmount - b.finalAmount)
    
    // 원래 쿠폰 순서(1,2,3)로 정렬하되 순위 정보 추가
    return strategies.map(strategy => {
      const rank = sortedStrategies.findIndex(sorted => sorted.coupon.id === strategy.coupon.id) + 1
      return { ...strategy, rank }
    })
  }

  return (
    <div className="space-y-6">
      <div className="rounded-lg bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-gray-900">쿠폰 정보 입력</h2>
        <div className="grid grid-cols-3 gap-4">
          {coupons.map((coupon, index) => (
            <div key={coupon.id} className="space-y-3">
              <div className="text-center">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  쿠폰 {index + 1}
                </label>
                <input
                  type="text"
                  className="block w-full rounded-md border border-gray-300 px-2 py-1.5 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder={`쿠폰 ${index + 1}`}
                  value={coupon.name}
                  onChange={(e) => handleCouponChange(coupon.id, 'name', e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  할인율 (%)
                </label>
                <input
                  type="number"
                  className="block w-full rounded-md border border-gray-300 px-2 py-1.5 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="40"
                  onChange={(e) => handleCouponChange(coupon.id, 'discountRate', e.target.value)}
                />
                <div className="mt-1 flex gap-1">
                  {[10, 20, 30].map((rate) => (
                    <button
                      key={rate}
                      type="button"
                      onClick={() => handleCouponChange(coupon.id, 'discountRate', rate.toString())}
                      className="flex-1 rounded bg-gray-100 px-1.5 py-0.5 text-xs text-gray-600 hover:bg-gray-200"
                    >
                      {rate}%
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  최소 구매금액
                </label>
                <input
                  type="number"
                  className="block w-full rounded-md border border-gray-300 px-2 py-1.5 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="10000"
                  onChange={(e) => handleCouponChange(coupon.id, 'minPurchase', e.target.value)}
                />
                <div className="mt-1 flex flex-wrap gap-1">
                  {[10000, 20000, 50000].map((amount) => (
                    <button
                      key={amount}
                      type="button"
                      onClick={() => handleCouponChange(coupon.id, 'minPurchase', amount.toString())}
                      className="rounded bg-gray-100 px-1.5 py-0.5 text-xs text-gray-600 hover:bg-gray-200"
                    >
                      {amount === 10000 ? '1만' : amount === 20000 ? '2만' : '5만'}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  최대 할인금액
                </label>
                <input
                  type="number"
                  className="block w-full rounded-md border border-gray-300 px-2 py-1.5 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="5000"
                  onChange={(e) => handleCouponChange(coupon.id, 'maxDiscount', e.target.value)}
                />
                <div className="mt-1 flex flex-wrap gap-1">
                  {[2000, 5000, 10000].map((amount) => (
                    <button
                      key={amount}
                      type="button"
                      onClick={() => handleCouponChange(coupon.id, 'maxDiscount', amount.toString())}
                      className="rounded bg-gray-100 px-1.5 py-0.5 text-xs text-gray-600 hover:bg-gray-200"
                    >
                      {amount === 2000 ? '2천' : amount === 5000 ? '5천' : '1만'}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-lg bg-blue-50 p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-blue-900">💡 쿠폰별 최적 전략</h2>
        <div className="grid grid-cols-3 gap-3">
          {getOptimalStrategies().map((strategy) => (
            <div key={strategy.coupon.id} className="rounded-md bg-white p-3">
              <div className="text-center mb-2">
                <span className="font-medium text-gray-900 text-sm">{strategy.coupon.name}</span>
                <div className="mt-1">
                  {strategy.rank === 1 && (
                    <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
                      1위
                    </span>
                  )}
                  {strategy.rank === 2 && (
                    <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-800">
                      2위
                    </span>
                  )}
                  {strategy.rank === 3 && (
                    <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-800">
                      3위
                    </span>
                  )}
                </div>
              </div>
              <div className="space-y-2 text-xs">
                <div>
                  <span className="text-gray-600">최적 구매:</span>
                  <p className="font-medium">{Math.round(strategy.optimalAmount).toLocaleString()}원</p>
                </div>
                <div>
                  <span className="text-gray-600">할인:</span>
                  <p className="font-medium text-red-600">-{Math.round(strategy.maxDiscount).toLocaleString()}원</p>
                </div>
                <div>
                  <span className="text-gray-600">결제:</span>
                  <p className="font-medium text-blue-600">{Math.round(strategy.finalAmount).toLocaleString()}원</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-lg bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-gray-900">특정 금액으로 비교하기</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            구매하려는 금액 (원)
          </label>
          <input
            type="number"
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="예: 15000"
            onChange={(e) => setPurchaseAmount(parseFloat(e.target.value) || 0)}
          />
        </div>
        
        {purchaseAmount > 0 && (
          <button
            onClick={calculateComparison}
            className="w-full rounded-md bg-blue-600 px-4 py-2 text-white font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            쿠폰 비교하기
          </button>
        )}
      </div>

      {results.length > 0 && (
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">
            {Math.round(purchaseAmount).toLocaleString()}원 구매시 비교 결과
          </h2>
          <div className="grid grid-cols-3 gap-3">
            {results.map((result) => (
              <div 
                key={result.coupon.id} 
                className={`rounded-md p-3 ${
                  result.rank === 1 
                    ? 'bg-green-50 border-2 border-green-200' 
                    : 'bg-gray-50 border border-gray-200'
                }`}
              >
                <div className="text-center mb-2">
                  <span className="font-medium text-gray-900 text-sm">{result.coupon.name}</span>
                  <div className="mt-1">
                    {result.rank === 1 && (
                      <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
                        1위
                      </span>
                    )}
                    {result.rank === 2 && (
                      <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-800">
                        2위
                      </span>
                    )}
                    {result.rank === 3 && (
                      <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-800">
                        3위
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="space-y-2 text-xs">
                  <div>
                    <span className="text-gray-600">할인 금액:</span>
                    <p className="font-medium text-red-600">
                      -{Math.round(result.discountAmount).toLocaleString()}원
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-600">최종 금액:</span>
                    <p className="font-medium text-blue-600">
                      {Math.round(result.finalAmount).toLocaleString()}원
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-600">상태:</span>
                    <p className={`font-medium ${result.isOptimal ? 'text-green-600' : 'text-yellow-600'}`}>
                      {result.isOptimal ? '최적' : '개선 가능'}
                    </p>
                  </div>
                </div>

                {!result.isOptimal && result.discountAmount > 0 && (
                  <div className="mt-2 text-xs text-yellow-700">
                    💡 {Math.round(result.optimalPurchaseAmount).toLocaleString()}원 이상 구매시 최대 할인
                  </div>
                )}

                {result.discountAmount === 0 && (
                  <div className="mt-2 text-xs text-red-700">
                    ❌ 최소 구매 금액 {Math.round(result.coupon.minPurchase).toLocaleString()}원 미달
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default CouponComparison