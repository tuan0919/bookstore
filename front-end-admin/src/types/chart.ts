export interface SalesMonthlyReportResponseDTO {
  sales: {
    name: string
    total: number
  }[]
}

export interface RecentlyOrderResponseDTO {
  recentlyOrders: {
    username: string
    email: string
    totalAmount: number
  }[]
  totalOrdersInMonth: number
}

export interface SummaryDashboardResponseDTO {
  profit: {
    total: number
    thisMonth: number
    diffPercent: number
  }
  customer: {
    total: number
    thisMonth: number
    diffPercent: number
  }
  mostSellInMonth: {
    thumbnail: string
    title: string
    soldAmount: number
  }
}
