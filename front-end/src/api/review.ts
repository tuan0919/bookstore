import { ApiResponse } from "~/types/api";
import { PageReviewResponse } from "~/types/review";
import axiosInstance from "./axios";
import API_ENDPOINTS from "./endpoint";

export const getBookReviews = async (
  bookId: number,
  page: number,
  size: number
): Promise<ApiResponse<PageReviewResponse>> => {
  const response = await axiosInstance.get<ApiResponse<PageReviewResponse>>(
    `${API_ENDPOINTS.REVIEW.GET_BOOK_REVIEWS(bookId)}?page=${page}&size=${size}`
  );
  return response.data;
};
