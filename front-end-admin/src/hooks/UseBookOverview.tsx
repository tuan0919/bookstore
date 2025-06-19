// hooks/useBookOverview.ts
import { useEffect, useState } from 'react'
import { BookOverviewDTO, getBooksOverview } from '@/api/book'

export function useBookOverview(initialPage = 0, initialSize = 5) {
  const [booksOverview, setBooksOverview] = useState<BookOverviewDTO[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState(initialPage)
  const [size, setSize] = useState(initialSize)
  const [totalPage, setTotalPage] = useState(0)
  const [totalElements, setTotalElements] = useState(0)
  const [isLastPage, setIsLastPage] = useState(false)
  const [isFirstPage, setIsFirstPage] = useState(false)

  useEffect(() => {
    const loadBooks = async () => {
      setIsLoading(true)
      try {
        const rs = await getBooksOverview({ page, size })
        setBooksOverview(rs.result.content)
        setTotalPage(rs.result.totalPages)
        setTotalElements(rs.result.totalElements)
        setIsLastPage(rs.result.last)
        setIsFirstPage(rs.result.first)
      } catch (_) {
        setError('Failed to load books overview')
      } finally {
        setIsLoading(false)
      }
    }

    loadBooks()
  }, [page, size])

  const goToNextPage = () => {
    if (page < totalPage - 1) {
      setPage((prevPage) => prevPage + 1)
    }
  }

  const goToPreviousPage = () => {
    if (page > 0) {
      setPage((prevPage) => prevPage - 1)
    }
  }

  return {
    booksOverview,
    isLoading,
    error,
    page,
    size,
    totalPage,
    totalElements,
    isLastPage,
    isFirstPage,
    goToNextPage,
    goToPreviousPage,
  }
}
