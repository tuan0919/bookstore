import { isAxiosError } from 'axios'
import { ApiResponse, PageApiResponse } from '@/types/api'
import { OrderDTO, OrderTimeline } from '@/types/order'
import axiosInstance from './axios'
import API_ENDPOINTS from './endpoint'

export const getOrders = async (page: number, size: number) => {
  const res = await axiosInstance.get<PageApiResponse<OrderDTO>>(
    `${API_ENDPOINTS.ORDER.GET_ALL_ORDER}?page=${page}&size=${size}`
  )
  return res.data
}

export const getOrderById = async (orderId: number) => {
  const res = await axiosInstance.get<ApiResponse<OrderDTO>>(
    API_ENDPOINTS.ORDER.GET_ORDER_BY_ID(orderId)
  )
  return res.data
}

export const getOrderTimeline = async (orderId: number) => {
  const res = await axiosInstance.get<ApiResponse<OrderTimeline>>(
    API_ENDPOINTS.ORDER.GET_ORDER_TIMELINE(orderId)
  )
  return res.data
}

export interface SearchOrderParams {
  page?: number
  size?: number
  status?: string
  username?: string
  startDate?: string
  endDate?: string
  minAmount?: number
  maxAmount?: number
  userId?: number
}

export const searchOrder = async (params?: SearchOrderParams) => {
  const res = await axiosInstance.get<PageApiResponse<OrderDTO>>(
    API_ENDPOINTS.ORDER.SEARCH_ALL_ORDER,
    { params }
  )
  return res.data
}

export async function updateOrderStatus(
  orderId: number,
  status:
    | 'PENDING_CONFIRMATION'
    | 'CONFIRMED'
    | 'SHIPPING'
    | 'DELIVERED'
    | 'CANCELED'
): Promise<ApiResponse<string>> {
  try {
    const response = await axiosInstance.put(
      API_ENDPOINTS.ORDER.UPDATE_ORDER_STATUS(orderId),
      { status }
    )
    return response.data
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      const message = error.response?.data?.message || error.message
      throw new Error(message)
    } else {
      // Lỗi không phải từ Axios (hiếm gặp)
      throw new Error('Unexpected error occurred.')
    }
  }
}
