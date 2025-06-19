// context/PromotionNewContext.tsx
import { createContext, useContext, ReactNode } from 'react'
import { usePromotionNew } from '@/hooks/UsePromotionNew'

const PromotionNewContext = createContext<ReturnType<typeof usePromotionNew>>(
  {} as ReturnType<typeof usePromotionNew>
)

export const usePromotionNewContext = () => useContext(PromotionNewContext)

export const PromotionNewProvider = ({ children }: { children: ReactNode }) => {
  const value = usePromotionNew()
  return (
    <PromotionNewContext.Provider value={value}>
      {children}
    </PromotionNewContext.Provider>
  )
}
