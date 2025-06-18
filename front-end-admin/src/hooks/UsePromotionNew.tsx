import { useState } from 'react'
import { toast } from 'sonner'
import { createNewPromotion } from '@/api/promotion'

export function usePromotionNew() {
  const [promotionName, setPromotionName] = useState<string>('')
  const [discountPercentage, setDiscountPercentage] = useState<number>(10)
  const [startDate, setStartDate] = useState<string>('')
  const [endDate, setEndDate] = useState<string>('')
  const [categoryIds, setCategoryIds] = useState<number[]>([])
  const submit = async () => {
    const dto = {
      promotionName,
      discountPercentage,
      startDate,
      endDate,
      categoryIds,
    }
    try {
      await createNewPromotion(dto)

      toast('Thao tác thành công!', {
        description: 'Thêm mới khuyến mãi thành công.',
        action: {
          label: 'Xác nhận',
          onClick: () => {},
        },
        position: 'top-center',
      })
    } catch (error: any) {
      toast('Thao tác thất bại!', {
        description: `Có lỗi xảy ra: ${error.message || 'Không rõ nguyên nhân.'}`,
        action: {
          label: 'Xác nhận',
          onClick: () => {},
        },
        position: 'top-center',
      })
    }
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
