import axiosInstance from "./axios";
import API_ENDPOINTS from "./endpoint";
import { CartItemPropertyResponseDTO} from "../types/cart";
export const createPaypalOrder = async (data: CartItemPropertyResponseDTO []): Promise<any> => {
  const url = API_ENDPOINTS.PAYPAL.CREATE_ORDER;
  const res = await axiosInstance.post(url, data);
  return res.data;
};
export const capturePaypalOrder = async (orderId: string): Promise<any> => {
  const url = API_ENDPOINTS.PAYPAL.CAPTURE_ORDER(orderId);
  const res = await axiosInstance.post(url);
  return res.data;
}