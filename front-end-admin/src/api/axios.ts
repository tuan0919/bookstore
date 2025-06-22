// src/lib/axios.ts
import axios from 'axios'
import { toast } from 'sonner'

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Optional: Add a request interceptor (e.g. for auth token)
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Optional: Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const status = error.response.status

      if (status === 401) {
        console.warn('Unauthorized – redirecting to sign-in')
        window.location.href = '/sign-in'
      } else if (status === 403) {
        console.warn('Forbidden – access denied')
        // 👉 Hiển thị toast hoặc trang riêng
        toast.error('Bạn không có quyền truy cập')

        // Optionally redirect
        // window.location.href = '/forbidden';
      }
    } else {
      toast.error('Lỗi không xác định:', error)
    }

    return Promise.reject(error) // để catch ở caller nếu cần
  }
)

export default axiosInstance
