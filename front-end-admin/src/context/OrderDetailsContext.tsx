// context/OrderDetailsContext.tsx
import { createContext, useContext, ReactNode } from 'react'
import { useOrderDetails } from '@/hooks/UseOrderDetails'

const OrderDetailsContext = createContext<ReturnType<typeof useOrderDetails>>(
  {} as ReturnType<typeof useOrderDetails>
)

export const useOrderDetailsContext = () => useContext(OrderDetailsContext)

interface OrderDetailsProviderProps {
  children: ReactNode
}

export const OrderDetailsProvider = ({
  children,
}: OrderDetailsProviderProps) => {
  const value = useOrderDetails()

  return (
    <OrderDetailsContext.Provider value={value}>
      {children}
    </OrderDetailsContext.Provider>
  )
}
