// context/CustomerDetailsContext.tsx
import { createContext, useContext, ReactNode } from 'react'
import { useCustomerDetails } from '@/hooks/UseCustomerDetails'

const CustomerDetailsContext = createContext<ReturnType<
  typeof useCustomerDetails
> | null>(null)

export const useCustomerDetailsContext = () => {
  const context = useContext(CustomerDetailsContext)
  if (!context) {
    throw new Error(
      'useCustomerDetailsContext must be used within CustomerDetailsContext'
    )
  }
  return context
}

export const CustomerDetailsProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  const value = useCustomerDetails()

  return (
    <CustomerDetailsContext.Provider value={value}>
      {children}
    </CustomerDetailsContext.Provider>
  )
}
