import { Pageable } from "./api";

export interface ReviewBookResponseDTO {
  review_id: number;
  rating: number;
  review_text: string;
  review_type: "BOOK" | "COLLECTION";
  book_id: number;
  collection_id: "string" | null;
  created_at: "string";
  user: {
    id: number;
    username: string;
  };
}

export interface BookReviewOverallResponse {
  bookId: number;
  avgScore: number;
  total: number;
  rates: number[];
}

export interface PageReviewResponse {
  content: ReviewBookResponseDTO[];
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
