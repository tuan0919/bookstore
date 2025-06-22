import { PagePromotionResponse } from "~/types/promotion";
import axiosInstance from "./axios";
import API_ENDPOINTS from "./endpoint";
import { ApiResponse } from "~/types/api";

export const getActivePromotions = async () => {
  const res = await axiosInstance.get<ApiResponse<PagePromotionResponse>>(
    `${API_ENDPOINTS.PROMOTION.GET_ACTIVE}?page=0&size=10`
  );
  return res.data;
};
