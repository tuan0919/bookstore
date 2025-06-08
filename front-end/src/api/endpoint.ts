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
  USER: {
    LOGIN: "/api/v1/auth/login",
  },
  CART: {
    ADD: "/api/cart/add",
    REMOVE: "/api/cart/delete",
    GET: "/api/cart",
  },
  PAYPAL: {
    CREATE_ORDER: "/paypal/api/orders",
    CAPTURE_ORDER: (orderId: string) => `/paypal/api/orders/${orderId}/capture`,
  }
};

export default API_ENDPOINTS;
