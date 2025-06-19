import axiosInstance from "../axios";
import API_ENDPOINTS from "../endpoint";
import { AddressRequestDTO } from "../../types/user";
export const addUserAddress = async (address: AddressRequestDTO): Promise<any> => {
  const url = API_ENDPOINTS.USER.ADDRESS.ADD;
  const res = await axiosInstance.post(url, address);
  return res.data;
};
export const updateUserAddress = async (userAddressId: number, address: AddressRequestDTO): Promise<any> => {
  const url = API_ENDPOINTS.USER.ADDRESS.UPDATE(userAddressId);
  const res = await axiosInstance.put(url, address);
  return res.data;
};
export const getUserAddresses = async (): Promise<any> => {
  const url = API_ENDPOINTS.USER.ADDRESS.GET;
  const res = await axiosInstance.get(url);
  return res.data;
};