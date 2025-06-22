const API_ENDPOINTS = {
  USER: {
    LOGIN: '/api/v1/auth/login',
    DETAILS: (userId: number) => `/admin/api/user/${userId}/details`,
  },
  BOOK: {
    GET_DETAILS: (id: number) => `/admin/api/book/${id}`,
    CREATE: '/api/book/upload',
    UPDATE: (id: number) => `/api/book/${id}/update`,
    OVERVIEW: '/admin/api/book/overview',
  },
  ORDER: {
    SEARCH_ALL_ORDER: `/admin/api/order/search`,
    GET_ALL_ORDER: `/admin/api/order`,
    GET_ORDER_BY_ID: (id: number) => `/admin/api/order/${id}`,
    GET_ORDER_TIMELINE: (id: number) => `/api/orders/${id}/timeline`,
    UPDATE_ORDER_STATUS: (id: number) => `/api/orders/${id}/status`,
  },
  PROMOTION: {
    GET_ALL_PROMOTION: '/admin/api/promotion/',
    CREATE: '/admin/api/promotion/create',
  },
  CHART: {
    GET_SALES_MONTHLY: '/admin/api/chart/monthly-sales',
    GET_RECENTLY_ORDERS: '/admin/api/chart/recently-order',
    GET_SUMMARY_DASHBOARD: '/admin/api/chart/summary-dashboard',
    GET_SUMMARY_ABOUT_CUSTOMER: '/admin/api/chart/summary-about-customer',
    GET_TOP_SELLING_PRODUCT: '/admin/api/chart/top-selling',
  },
}

export default API_ENDPOINTS
