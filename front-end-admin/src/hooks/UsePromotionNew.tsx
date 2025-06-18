import { useState } from 'react'

export function usePromotionNew() {
  const [promotionName, setPromotionName] = useState<string>('')
  const [discountPercentage, setDiscountPercentage] = useState<number>(10)
  const [startDate, setStartDate] = useState<string>('')
  const [endDate, setEndDate] = useState<string>('')
  const [categoryIds, setCategoryIds] = useState<number[]>([])
  const submit = async () => {
    return console.log({
      promotionName,
      discountPercentage,
      startDate,
      endDate,
      categoryIds,
    })
  }
  return {
    promotionName,
    setPromotionName,
    discountPercentage,
    setDiscountPercentage,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    categoryIds,
    setCategoryIds,
    submit,
  }
}
