// context/PromotionOverviewContext.tsx
import { createContext, useContext, ReactNode } from 'react'
import { usePromotion } from '@/hooks/UsePromotion'

const PromotionOverviewContext = createContext<ReturnType<typeof usePromotion>>(
  {} as ReturnType<typeof usePromotion>
)

export const usePromotionOverviewContext = () =>
  useContext(PromotionOverviewContext)

export const PromotionOverviewProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  const value = usePromotion()
  return (
    <PromotionOverviewContext.Provider value={value}>
      {children}
    </PromotionOverviewContext.Provider>
  )
}
