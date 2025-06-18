import { ApiResponse, PageApiResponse } from '@/types/api'
import { OrderDTO } from '@/types/order'
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
