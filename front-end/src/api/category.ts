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

export async function getCategories() {
  const response = await axiosInstance.get(API_ENDPOINTS.CATEGORY.CATEGORY);
  if (response.status !== 200) {
    throw new Error("Failed to fetch categories");
  }
  return response.data.result.categoryResponseDTOs.children;
}
export async function getGenre() {
  const response = await axiosInstance.get(API_ENDPOINTS.CATEGORY.CATEGORY);
  if (response.status !== 200) {
    throw new Error("Failed to fetch genres");
  }
  return response.data.result.genreResponseDTOs;
}
