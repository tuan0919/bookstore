import { ApiResponse } from "~/types/api";
import API_ENDPOINTS from "./endpoint";
import axiosInstance from "./axios";

interface LoginParams {
  username: string;
  password: string;
}

export const login = async (
  params: LoginParams
): Promise<ApiResponse<string>> => {
  const { username, password } = params;

  const url = `${API_ENDPOINTS.AUTH.LOGIN}`;
  const res = await axiosInstance.post<ApiResponse<string>>(url, {
    username,
    password,
  });
  return res.data;
};
