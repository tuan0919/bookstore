import { ApiResponse } from "~/types/api";
import API_ENDPOINTS from "./endpoint";
import {
  BookDetailsDTO,
  ListBookDetailsDTO,
  PageBookResponse,
  SummaryAboutBook,
} from "~/types/book";
import axiosInstance from "./axios";

interface SearchBookParams {
  context?: string;
  categoryId?: number;
  minPrice?: number;
  maxPrice?: number;
  page?: number;
  size?: number;
}

export const searchBooks = async (
  params: SearchBookParams
): Promise<ApiResponse<PageBookResponse>> => {
  const queryParams = new URLSearchParams();

  const { context, categoryId, minPrice, maxPrice, page, size } = params;

  if (context) queryParams.append("context", context);
  if (categoryId !== undefined)
    queryParams.append("categoryId", categoryId.toString());
  if (minPrice !== undefined)
    queryParams.append("minPrice", minPrice.toString());
  if (maxPrice !== undefined)
    queryParams.append("maxPrice", maxPrice.toString());
  if (page !== undefined) queryParams.append("page", page.toString());
  if (size !== undefined) queryParams.append("size", size.toString());

  const url = `${API_ENDPOINTS.BOOK.SEARCH_V2}?${queryParams.toString()}`;
  const res = await axiosInstance.get<ApiResponse<PageBookResponse>>(url);
  return res.data;
};

export const searchBooks_v2 = async (
  params: SearchBookParams
): Promise<ApiResponse<PageBookResponse>> => {
  const queryParams = new URLSearchParams();

  const { context, categoryId, minPrice, maxPrice, page, size } = params;

  if (context !== undefined) queryParams.append("context", context);
  if (categoryId !== undefined)
    queryParams.append("categoryId", categoryId.toString());
  if (minPrice !== undefined)
    queryParams.append("minPrice", minPrice.toString());
  if (maxPrice !== undefined)
    queryParams.append("maxPrice", maxPrice.toString());
  if (page !== undefined) queryParams.append("page", page.toString());
  if (size !== undefined) queryParams.append("size", size.toString());

  const url = `${API_ENDPOINTS.BOOK.SEARCH_V2}?${queryParams.toString()}`;
  const res = await axiosInstance.get<ApiResponse<PageBookResponse>>(url);
  return res.data;
};

export const getTopWeeklyBooks = async (): Promise<
  ApiResponse<ListBookDetailsDTO>
> => {
  const url = `${API_ENDPOINTS.BOOK.TOP_WEEKLY}`;
  const res = await axiosInstance.get<ApiResponse<ListBookDetailsDTO>>(url);
  return res.data;
};

export const getBookDetails = async (
  bookId: number
): Promise<ApiResponse<BookDetailsDTO>> => {
  const url = `${API_ENDPOINTS.BOOK.DETAILS(bookId)}`;
  const res = await axiosInstance.get<ApiResponse<BookDetailsDTO>>(url);
  return res.data;
};

export const getSummaryAboutBook = async () => {
  const resp = await axiosInstance.get<ApiResponse<SummaryAboutBook>>(
    API_ENDPOINTS.BOOK.SUMMARY_ABOUT_BOOK
  );
  return resp.data;
};
