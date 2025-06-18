import { useEffect, useState } from 'react'
import { PromotionResponseDTO } from '@/types/promotion'
import { getAllPromotion } from '@/api/promotion'

export function usePromotion() {
  const [promotions, setPromotions] = useState<PromotionResponseDTO[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState(0)
  const [size, setSize] = useState(5)
  const [totalPage, setTotalPage] = useState(0)
  const [totalElements, setTotalElements] = useState(0)
  const [isLastPage, setIsLastPage] = useState(false)
  const [isFirstPage, setIsFirstPage] = useState(false)
  useEffect(() => {
    const loadPromotions = async () => {
      setIsLoading(true)
      const rs = await getAllPromotion(page, size)
      setPromotions(rs.result.content)
      setTotalPage(rs.result.totalPages)
      setTotalElements(rs.result.totalElements)
      setIsLastPage(rs.result.last)
      setIsFirstPage(rs.result.first)
      setIsLoading(false)
    }
    loadPromotions()
  }, [page, size])
  return {
    promotions,
    isLoading,
    error,
    page,
    size,
    totalPage,
    totalElements,
    isLastPage,
    isFirstPage,
  }
}
