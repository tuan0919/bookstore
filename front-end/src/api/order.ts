import axiosInstance from "./axios";
import API_ENDPOINTS from "./endpoint";
import { OrderRequestDTO } from "~/types/order";
export const getOrder = async (page: number) => {
  
    const response = await axiosInstance.get(`${API_ENDPOINTS.ORDER.GET(page,10)}`);
    return response.data;
  
};
export const createOrder = async (orderData: OrderRequestDTO) => {
  try {
    const response = await axiosInstance.post(API_ENDPOINTS.ORDER.CREATE, orderData);
    return response.data;
  } catch (error) {
    throw new Error(`Lỗi tạo đơn hàng: ${error}`);
  }
};
export const cancelOrder = async (orderId: number) => {
  try {
    const response = await axiosInstance.delete(`${API_ENDPOINTS.ORDER.CANCEL(orderId.toString())}`);
    return response.data;
  } catch (error) {
    throw new Error(`Lỗi hủy đơn hàng: ${error}`);
  }
}