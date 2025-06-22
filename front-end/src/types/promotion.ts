import { Pageable } from "./api";

export interface PromotionResponseDTO {
  promotionId: number;
  discountPercentage: number;
  promotionName: string;
  startDate: string;
  endDate: string;
  status: string;
  categories: {
    categoryName: string;
    categoryId: number;
  }[];
}

export interface PagePromotionResponse {
  content: PromotionResponseDTO[];
  pageable: Pageable;
  last: boolean;
  totalElements: number;
  totalPages: number;
  first: boolean;
  numberOfElements: number;
  size: number;
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  empty: boolean;
}
