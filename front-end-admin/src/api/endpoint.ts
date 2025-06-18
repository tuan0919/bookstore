const API_ENDPOINTS = {
  BOOK: {
    GET_DETAILS: (id: number) => `/admin/api/book/${id}`,
    CREATE: '/api/book/upload',
    UPDATE: (id: number) => `/api/book/${id}/update`,
    OVERVIEW: '/api/book/overview',
  },
  ORDER: {
    GET_ALL_ORDER: `/admin/api/order`,
    GET_ORDER_BY_ID: (id: number) => `/admin/api/order/${id}`,
  },
  PROMOTION: {
    GET_ALL_PROMOTION: '/admin/api/promotion/',
    CREATE: '/admin/api/promotion/create',
  },
}

export default API_ENDPOINTS
