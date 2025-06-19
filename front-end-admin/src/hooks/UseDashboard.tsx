import { useEffect, useState } from 'react'
import {
  RecentlyOrderResponseDTO,
  SalesMonthlyReportResponseDTO,
  SummaryDashboardResponseDTO,
} from '@/types/chart'
import {
  getRecentlyOrder,
  getSalesMonthlyReport,
  getSummaryDashboard,
} from '@/api/chart'

export function useDashboard() {
  const [monthlySales, setMonthlySales] =
    useState<SalesMonthlyReportResponseDTO | null>(null)
  const [recentlyOrder, setRecentlyOrder] =
    useState<RecentlyOrderResponseDTO | null>(null)
  const [summary, setSummary] = useState<SummaryDashboardResponseDTO | null>(
    null
  )
  useEffect(() => {
    const fetchChart = async () => {
      const mSale = await getSalesMonthlyReport()
      const rOrder = await getRecentlyOrder()
      const sum = await getSummaryDashboard()
      setMonthlySales(mSale.result)
      setRecentlyOrder(rOrder.result)
      setSummary(sum.result)
    }
    fetchChart()
  }, [])
  return {
    summary,
    setSummary,
    monthlySales,
    setMonthlySales,
    recentlyOrder,
    setRecentlyOrder,
  }
}
