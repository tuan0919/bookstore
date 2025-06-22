import axiosInstance from "../axios";
import API_ENDPOINTS from "../endpoint";
import { UserDetailsResponseDTO } from "../../types/user";
export const getUserDetails = async (): Promise<UserDetailsResponseDTO> => {
  const url = API_ENDPOINTS.USER.DETAILS.GET;
  const res = await axiosInstance.get(url);
  return res.data;
};
export const addUserDetails = async (fullName: string, phoneNum: string, dateOfBirth: string | null): Promise<UserDetailsResponseDTO> => {
  const url = API_ENDPOINTS.USER.DETAILS.ADD;
  const res = await axiosInstance.post(url, {
    fullName,
    phoneNum,
    dateOfBirth 
  });
  return res.data;
};