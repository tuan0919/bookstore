import { ApiResponse } from '@/types/api'
import {
  RecentlyOrderResponseDTO,
  SalesMonthlyReportResponseDTO,
  SummaryAboutCustomerResponseDTO,
  SummaryDashboardResponseDTO,
  TopSellingProductsResponseDTO,
} from '@/types/chart'
import axiosInstance from './axios'
import API_ENDPOINTS from './endpoint'

export const getSalesMonthlyReport = async () => {
  const res = await axiosInstance.get<
    ApiResponse<SalesMonthlyReportResponseDTO>
  >(API_ENDPOINTS.CHART.GET_SALES_MONTHLY)
  return res.data
}

export const getRecentlyOrder = async () => {
  const res = await axiosInstance.get<ApiResponse<RecentlyOrderResponseDTO>>(
    API_ENDPOINTS.CHART.GET_RECENTLY_ORDERS
  )
  return res.data
}

export const getSummaryDashboard = async () => {
  const res = await axiosInstance.get<ApiResponse<SummaryDashboardResponseDTO>>(
    API_ENDPOINTS.CHART.GET_SUMMARY_DASHBOARD
  )
  return res.data
}

export const getSummaryAboutCustomer = async (customerId: number) => {
  const res = await axiosInstance.get<
    ApiResponse<SummaryAboutCustomerResponseDTO>
  >(`${API_ENDPOINTS.CHART.GET_SUMMARY_ABOUT_CUSTOMER}?userId=${customerId}`)
  return res.data
}

export const getTopSellingProducts = async () => {
  const res = await axiosInstance.get<
    ApiResponse<TopSellingProductsResponseDTO>
  >(`${API_ENDPOINTS.CHART.GET_TOP_SELLING_PRODUCT}`)
  return res.data
}
