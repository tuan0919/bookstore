// context/OrderOverviewContext.tsx
import { createContext, useContext, ReactNode } from 'react'
import { useOrderOverview } from '@/hooks/UseOrderOverview'

const OrderOverviewContext = createContext<ReturnType<typeof useOrderOverview>>(
  {} as ReturnType<typeof useOrderOverview>
)

export const useOrderOverviewContext = () => useContext(OrderOverviewContext)

interface OrderOverviewProviderProps {
  children: ReactNode
}

export const OrderOverviewProvider = ({
  children,
}: OrderOverviewProviderProps) => {
  const value = useOrderOverview()

  return (
    <OrderOverviewContext.Provider value={value}>
      {children}
    </OrderOverviewContext.Provider>
  )
}
