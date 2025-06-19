export interface PromotionResponseDTO {
  promotionId: number
  discountPercentage: number
  promotionName: string
  startDate: string
  endDate: string
  status: string
  categories: {
    categoryName: string
    categoryId: number
  }[]
}

export interface PromotionCreateRequest {
  discountPercentage: number
  promotionName: string
  startDate: string
  endDate: string
  categoryIds: number[]
}
