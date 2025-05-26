import { ApiResponse } from "~/types/api";
import API_ENDPOINTS from "./endpoint";
import axiosInstance from "./axios";
import { CategoryChainDTO } from "~/types/category";

export const getCategoryChainOfBook = async (
  bookId: number
): Promise<ApiResponse<CategoryChainDTO>> => {
  const url = `${API_ENDPOINTS.CATEGORY.CHAIN_FOR_BOOK}?bookId=${bookId}`;
  const res = await axiosInstance.get<ApiResponse<CategoryChainDTO>>(url);
  return res.data;
};
