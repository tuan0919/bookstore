import axiosInstance from "../axios";
import API_ENDPOINTS from "../endpoint";
import { UserDetailsResponseDTO } from "../../types/user";
export const getUserDetails = async (): Promise<UserDetailsResponseDTO> => {
  const url = API_ENDPOINTS.USER.DETAILS.GET;
  const res = await axiosInstance.get(url);
  return res.data;
};