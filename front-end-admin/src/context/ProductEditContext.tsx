// context/ProductEditContext.tsx
import { createContext, useContext, ReactNode } from 'react'
import { useProductEdit } from '@/hooks/UseProductEdit'

type ProductEditContextType = ReturnType<typeof useProductEdit>

const ProductEditContext = createContext<ProductEditContextType | null>(null)

export const useProductEditContext = () => {
  const context = useContext(ProductEditContext)
  if (!context) {
    throw new Error(
      'useProductEditContext must be used within ProductEditProvider'
    )
  }
  return context
}

export const ProductEditProvider = ({ children }: { children: ReactNode }) => {
  const productEdit = useProductEdit()

  return (
    <ProductEditContext.Provider value={productEdit}>
      {children}
    </ProductEditContext.Provider>
  )
}
