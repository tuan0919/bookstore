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
  order: {
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

export interface SummaryAboutCustomerResponseDTO {
  totalOrders: number
  totalPayAmounts: number
  frequency: { name: string; amount: number }[]
}

export interface TopSellingProductsResponseDTO {
  totalElements: number
  elements: TopSellingProductElement[]
}

export interface TopSellingProductElement {
  top: number
  showName: string
  product: TopSellingProductInfo | null
}

export interface TopSellingProductInfo {
  productId: number
  productName: string
  thumbnail: string
  lastSellDate: string // dạng "dd-MM-yyyy"
  lastOrderId: number
  quantity: number
}
