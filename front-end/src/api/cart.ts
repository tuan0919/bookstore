import API_ENDPOINTS from "./endpoint";
import axiosInstance from "./axios";
import { CartResponseDTO, CartItemResponseDTO } from "~/types/cart";
export const getCart = async (): Promise<CartResponseDTO> => {
  try {
    const response = await axiosInstance.get(API_ENDPOINTS.CART.GET);
    return response.data;
  } catch (error) {
    throw new Error(
      `Lỗi fetch giỏ hàng: ${error}`
    );
  }
};
export const addToCart = async (
  productId: string,
  quantity: number
): Promise<CartItemResponseDTO> => {
  try {
    const response = await axiosInstance.post(API_ENDPOINTS.CART.ADD, {
      productId,
      quantity,
    });
    return  response.data
  } catch (error) {
    throw new Error(`Lỗi thêm sản phẩm vào giỏ hàng: ${error}`)
  }
};
export const removeFromCart = async (
  productId: string
): Promise<CartItemResponseDTO> => {
  try {
    const response = await axiosInstance.delete(`${API_ENDPOINTS.CART.REMOVE}/${productId}`);
    return response.data
  } catch (error) {
    throw new Error(`Lỗi xóa sản phẩm ra giỏ hàng: ${error}`)
  }
};