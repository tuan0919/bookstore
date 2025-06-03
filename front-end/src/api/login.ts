
import API_ENDPOINTS from "./endpoint";
import axiosInstance from "./axios";
import { UserLoginResponseDTO } from "~/types/user";
export const login = async (username: string, password: string): Promise<UserLoginResponseDTO> => {
  try {
    const response = await axiosInstance.post(API_ENDPOINTS.USER.LOGIN, {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    throw new Error(`Login failed: ${error}`);
  }
};