import { useEffect, useState } from 'react'
import { getOrders, OrderDTO } from '@/api/order'

export function useOrderOverview(initialPage = 0, initialSize = 5) {
  const [orders, setOrders] = useState<OrderDTO[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState(initialPage)
  const [size, setSize] = useState(initialSize)
  const [totalPage, setTotalPage] = useState(0)
  const [totalElements, setTotalElements] = useState(0)
  const [isLastPage, setIsLastPage] = useState(false)
  const [isFirstPage, setIsFirstPage] = useState(false)
  useEffect(() => {
    const loadOrders = async () => {
      setIsLoading(true)
      const rs = await getOrders(page, size)
      setOrders(rs.result.content)
      setTotalPage(rs.result.totalPages)
      setTotalElements(rs.result.totalElements)
      setIsLastPage(rs.result.last)
      setIsFirstPage(rs.result.first)
      setIsLoading(false)
    }
    loadOrders()
  }, [page, size])
  return {
    orders,
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
