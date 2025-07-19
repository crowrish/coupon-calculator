import { useState } from 'react'

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

  const calculateDiscount = () => {
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
  }

  const handleInputChange = (field: keyof CouponData, value: string) => {
    const numValue = parseFloat(value) || 0
    setCouponData(prev => ({ ...prev, [field]: numValue }))
  }

  return (
    <div className="space-y-6">
      <div className="rounded-lg bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-gray-900">쿠폰 조건</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              할인율 (%)
            </label>
            <input
              type="number"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="예: 40"
              onChange={(e) => handleInputChange('discountRate', e.target.value)}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">
              최소 구매 금액 (원)
            </label>
            <input
              type="number"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="예: 10000"
              onChange={(e) => handleInputChange('minPurchase', e.target.value)}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">
              최대 할인 금액 (원)
            </label>
            <input
              type="number"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="예: 5000"
              onChange={(e) => handleInputChange('maxDiscount', e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="rounded-lg bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-gray-900">구매 금액</h2>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            구매하려는 금액 (원)
          </label>
          <input
            type="number"
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="예: 12500"
            onChange={(e) => handleInputChange('purchaseAmount', e.target.value)}
          />
        </div>
        
        <button
          onClick={calculateDiscount}
          className="mt-4 w-full rounded-md bg-blue-600 px-4 py-2 text-white font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        >
          할인 금액 계산하기
        </button>
      </div>

      {result && (
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">계산 결과</h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-700">구매 금액:</span>
              <span className="font-medium">
                {couponData.purchaseAmount.toLocaleString()}원
              </span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-700">할인 금액:</span>
              <span className="font-medium text-red-600">
                -{result.discountAmount.toLocaleString()}원
              </span>
            </div>
            
            <div className="flex justify-between border-t pt-3">
              <span className="text-gray-900 font-semibold">최종 결제 금액:</span>
              <span className="font-bold text-lg text-blue-600">
                {result.finalAmount.toLocaleString()}원
              </span>
            </div>
            
            {result.isOptimal && result.discountAmount > 0 && (
              <div className="mt-4 rounded-md bg-green-50 p-3">
                <p className="text-sm text-green-800">
                  ✅ 최적의 할인을 받고 있습니다!
                </p>
              </div>
            )}
            
            {!result.isOptimal && result.discountAmount > 0 && (
              <div className="mt-4 rounded-md bg-yellow-50 p-3">
                <p className="text-sm text-yellow-800">
                  💡 더 많은 할인을 받으려면 {(couponData.maxDiscount / (couponData.discountRate / 100)).toLocaleString()}원 이상 구매하세요.
                </p>
              </div>
            )}
            
            {result.discountAmount === 0 && (
              <div className="mt-4 rounded-md bg-red-50 p-3">
                <p className="text-sm text-red-800">
                  ❌ 최소 구매 금액 {couponData.minPurchase.toLocaleString()}원을 충족하지 않아 할인을 받을 수 없습니다.
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