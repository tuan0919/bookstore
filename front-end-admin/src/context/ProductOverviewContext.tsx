// context/ProductOverviewContext.tsx
import { createContext, useContext, ReactNode } from 'react'
import { BookOverviewDTO } from '@/api/book'
import { useBookOverview } from '@/hooks/UseBookOverview'

interface ProductOverviewContext {
  overviewBooks: BookOverviewDTO[]
  isLoading: boolean
  error: string | null
  page: number
  size: number
  totalPage: number
  totalElements: number
  isLastPage?: boolean
  isFirstPage?: boolean
  goToNextPage: () => void
  goToPreviousPage: () => void
}

const ProductOverviewContext = createContext<ProductOverviewContext>({
  overviewBooks: [],
  isLoading: false,
  error: null,
  page: 0,
  size: 5,
  totalPage: 0,
  totalElements: 0,
  isLastPage: false,
  isFirstPage: false,
  goToNextPage: () => {},
  goToPreviousPage: () => {},
})

export const useProductOverviewContext = () =>
  useContext(ProductOverviewContext)

interface ProductOverviewProviderProps {
  children: ReactNode
}

export const ProductOverviewProvider = ({
  children,
}: ProductOverviewProviderProps) => {
  const {
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
  } = useBookOverview()

  return (
    <ProductOverviewContext.Provider
      value={{
        overviewBooks: booksOverview,
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
      }}
    >
      {children}
    </ProductOverviewContext.Provider>
  )
}
