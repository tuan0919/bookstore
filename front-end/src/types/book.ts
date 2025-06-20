import { Pageable } from "./api";

export interface PageBookResponseDTO {
  bookId: number;
  title: string;
  price: number;
  discountedPrice: number;
  discountPercentage: number;
  averageRating: number;
  imageUrl: string;
}

export interface PageBookResponse {
  content: PageBookResponseDTO[];
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

export interface ReviewDTO {
  userName: string;
  rating: number;
  reviewText: string;
  reviewDate: string;
}

export interface BookDetailsDTO {
  bookId: number;
  title: string;
  publisher: string;
  publishYear: string;
  weight: number;
  productCode: string;
  supplier: string;
  author: string;
  language: string;
  pageCount: number;
  translator: string;
  size: string;
  format: string;
  age: string;
  description: string;
  qtyInStock: number;
  price: number;
  discountedPrice: number;
  imageUrls: string[];
  reviews: ReviewDTO[];
}

export interface ListBookDetailsDTO {
  books: BookDetailsDTO[];
}

export interface CategoryResponseDTO {
  id: number;
  name: string;
  children: CategoryResponseDTO[]; // đệ quy
}

interface GenreResponseDTO {
  id: number;
  name: string;
}

export interface SummaryAboutBook {
  categoryResponseDTOs: CategoryResponseDTO;
  genreResponseDTOs: GenreResponseDTO[];
}
