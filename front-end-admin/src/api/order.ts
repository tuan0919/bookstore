import { ApiResponse, PageApiResponse } from '@/types/api'

import axiosInstance from './axios'
import API_ENDPOINTS from './endpoint'
import { OrderDTO } from '@/types/order'
export interface OrderItem {
  img: string
  bookTitle: string
  price: number
  quantity: number
  discount: number
}

interface ShippingAddress {
  unitNumber: string
  streetNumber: string
  addressLine1: string
  addressLine2: string
  city: string
  region: string
  postalCode: string
}

export interface OrderDTO {
  orderId: number
  orderDate: string // ISO format, consider using Date if parsed
  totalAmount: number
  paymentMethodName: string
  items: OrderItem[]
  status: string
  shippingAddress: ShippingAddress
}


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
