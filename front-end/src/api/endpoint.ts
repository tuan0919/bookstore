// src/constants/endpoint.ts

const API_ENDPOINTS = {
  BOOK: {
    SUMMARY_ABOUT_BOOK: "/api/book",
    SEARCH: "/api/book/category",
    TOP_WEEKLY: "/api/book/top-weekly",
    DETAILS: (bookId: number) => `/api/book/${bookId}`,
    SEARCH_V2: "/api/book/search",
  },
  CATEGORY: {
    CHAIN_FOR_BOOK: `/api/category/chain`,
    CATEGORY: "api/book",
  },
  PROMOTION: {
    GET_ACTIVE: "/api/promotion/active",
  },
  REVIEW: {
    GET_BOOK_REVIEWS: (bookId: number) => `/api/book/${bookId}/reviews`,
    CREATE_REVIEW_FOR_BOOK: `/api/review/create`,
    GET_REVIEW_OVERALL: (bookId: number) =>
      `/api/book/${bookId}/review-overall`,
  },
  USER: {
    LOGIN: "/api/v1/auth/login",
    DETAILS: {
      GET: "/api/user-details",
      ADD: "/api/user-details/add",
    },
    ADDRESS: {
      ADD: "/api/user/addresses",
      UPDATE: (userAddressId: number, makeDefault?: boolean) => {
        let url = `/api/user/addresses/${userAddressId}`;
        if (makeDefault !== undefined) {
          url += `?makeDefault=${makeDefault}`;
        }
        return url;
      },
      GET: "/api/user/addresses",
    },
  },
  CART: {
    ADD: "/api/cart/add",
    REMOVE: "/api/cart/delete",
    GET: "/api/cart",
  },
  PAYPAL: {
    CREATE_ORDER: "/paypal/api/orders",
    CAPTURE_ORDER: (orderId: string) => `/paypal/api/orders/${orderId}/capture`,
  },
  ORDER: {
    CREATE: "/api/orders",
    GET: (page: number, size: number) => {
      if (page !== undefined && size !== undefined) {
        return `/api/orders?page=${page}&size=${size}`;
      } else {
        return `/api/orders`;
      }
    },
    CANCEL: (orderId: string) => `/api/orders/${orderId}/cancel`,
  },
};

export default API_ENDPOINTS;
