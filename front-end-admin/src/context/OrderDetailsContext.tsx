// context/OrderDetailsContext.tsx
import { createContext, useContext, ReactNode } from 'react'
import { OrderDTO } from '@/api/order'
import { useOrderDetails } from '@/hooks/UseOrderDetails'

interface OrderDetailsContextType {
  order: OrderDTO | null
}

const OrderDetailsContext = createContext<OrderDetailsContextType>({
  order: null,
})

export const useOrderDetailsContext = () => useContext(OrderDetailsContext)

interface OrderDetailsProviderProps {
  children: ReactNode
}

export const OrderDetailsProvider = ({
  children,
}: OrderDetailsProviderProps) => {
  const { order } = useOrderDetails()

  return (
    <OrderDetailsContext.Provider value={{ order }}>
      {children}
    </OrderDetailsContext.Provider>
  )
}
