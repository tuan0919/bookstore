import { createContext, useContext, ReactNode } from 'react'
import { useDashboard } from '@/hooks/UseDashboard'

const DashboardContext = createContext<ReturnType<typeof useDashboard>>(
  {} as ReturnType<typeof useDashboard>
)

export const useDashboardContext = () => useContext(DashboardContext)

export const DashboardContextProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  const value = useDashboard()
  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  )
}
