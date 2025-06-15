import { ApiResponse } from "~/types/api";
import {
  BookReviewOverallResponse,
  PageReviewResponse,
  ReviewBookResponseDTO,
} from "~/types/review";
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

export const getBookReviewOverall = async (
  bookId: number
): Promise<ApiResponse<BookReviewOverallResponse>> => {
  const response = await axiosInstance.get(
    API_ENDPOINTS.REVIEW.GET_REVIEW_OVERALL(bookId)
  );
  return response.data;
};

export const addNewReview = async (
  review_text: string,
  rating: number,
  bookId: number
): Promise<ApiResponse<ReviewBookResponseDTO>> => {
  const response = await axiosInstance.post(
    API_ENDPOINTS.REVIEW.CREATE_REVIEW_FOR_BOOK,
    {
      review_text,
      rating,
      book_id: bookId,
      review_type: "BOOK",
      collection_id: null,
    }
  );
  return response.data;
};
