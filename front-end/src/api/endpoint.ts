const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/api/v1/auth/login",
  },
  BOOK: {
    SEARCH: "/api/book/category",
    TOP_WEEKLY: "/api/book/top-weekly",
    DETAILS: (bookId: number) => `/api/book/${bookId}`,
  },
  CATEGORY: {
    CHAIN_FOR_BOOK: `/api/category/chain`,
    CATEGORY: "api/book",
  },
};

export default API_ENDPOINTS;
