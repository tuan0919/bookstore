// src/constants/endpoint.ts

const API_ENDPOINTS = {
  BOOK: {
    SEARCH: "/api/book/category",
    TOP_WEEKLY: "/api/book/top-weekly",
    DETAILS: (bookId: number) => `/api/book/${bookId}`,
  },
  CATEGORY: {
    CHAIN_FOR_BOOK: `/api/category/chain`,
    CATEGORY : "api/book"
  },
};

export default API_ENDPOINTS;
