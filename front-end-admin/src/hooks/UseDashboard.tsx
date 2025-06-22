import { useEffect, useState } from 'react'
import {
  RecentlyOrderResponseDTO,
  SalesMonthlyReportResponseDTO,
  SummaryDashboardResponseDTO,
  TopSellingProductsResponseDTO,
} from '@/types/chart'
import {
  getRecentlyOrder,
  getSalesMonthlyReport,
  getSummaryDashboard,
  getTopSellingProducts,
} from '@/api/chart'

export function useDashboard() {
  const [monthlySales, setMonthlySales] =
    useState<SalesMonthlyReportResponseDTO | null>(null)
  const [recentlyOrder, setRecentlyOrder] =
    useState<RecentlyOrderResponseDTO | null>(null)
  const [summary, setSummary] = useState<SummaryDashboardResponseDTO | null>(
    null
  )
  const [topSell, setTopSell] = useState<TopSellingProductsResponseDTO | null>(
    null
  )

  useEffect(() => {
    const fetchChart = async () => {
      try {
        const [mSale, rOrder, sum, topSelling] = await Promise.all([
          getSalesMonthlyReport(),
          getRecentlyOrder(),
          getSummaryDashboard(),
          getTopSellingProducts(),
        ])
        setMonthlySales(mSale.result)
        setRecentlyOrder(rOrder.result)
        setSummary(sum.result)
        setTopSell(topSelling.result)
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error)
      }
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
    topSell,
    setTopSell,
  }
}
