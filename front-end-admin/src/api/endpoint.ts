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
  CHART: {
    GET_SALES_MONTHLY: '/admin/api/chart/monthly-sales',
    GET_RECENTLY_ORDERS: '/admin/api/chart/recently-order',
    GET_SUMMARY_DASHBOARD: '/admin/api/chart/summary-dashboard',
  },
}

export default API_ENDPOINTS
