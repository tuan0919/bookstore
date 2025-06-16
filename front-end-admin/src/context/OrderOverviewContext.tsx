// context/OrderOverviewContext.tsx
import { createContext, useContext, ReactNode } from 'react'
import { OrderDTO } from '@/api/order'
import { useOrderOverview } from '@/hooks/UseOrderOverview'

interface OrderOverviewContextType {
  orders: OrderDTO[]
  isLoading: boolean
  error: string | null
  page: number
  size: number
  totalPage: number
  totalElements: number
  isLastPage: boolean
  isFirstPage: boolean
}

const OrderOverviewContext = createContext<OrderOverviewContextType>({
  orders: [],
  isLoading: false,
  error: null,
  page: 0,
  size: 5,
  totalPage: 0,
  totalElements: 0,
  isLastPage: false,
  isFirstPage: false,
})

export const useOrderOverviewContext = () => useContext(OrderOverviewContext)

interface OrderOverviewProviderProps {
  children: ReactNode
}

export const OrderOverviewProvider = ({
  children,
}: OrderOverviewProviderProps) => {
  const {
    orders,
    isLoading,
    error,
    page,
    size,
    totalPage,
    totalElements,
    isLastPage,
    isFirstPage,
  } = useOrderOverview()

  return (
    <OrderOverviewContext.Provider
      value={{
        orders,
        isLoading,
        error,
        page,
        size,
        totalPage,
        totalElements,
        isLastPage,
        isFirstPage,
      }}
    >
      {children}
    </OrderOverviewContext.Provider>
  )
}
