import { ApiResponse } from '@/types/api'
import {
  RecentlyOrderResponseDTO,
  SalesMonthlyReportResponseDTO,
  SummaryDashboardResponseDTO,
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
