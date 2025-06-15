import { isAxiosError } from 'axios'
import { ApiResponse, PageApiResponse } from '@/types/api'
import axiosInstance from './axios'
import API_ENDPOINTS from './endpoint'

export interface BookDTO {
  age: string
  author: string
  format: string
  language: string
  page_count: number
  price: number
  product_code: number
  publisher: string
  qty_in_stock: number
  publish_year: number
  size: string
  supplier: string
  title: string
  translator: string
  weight: number
  category_id: number
  genre_id: number
  thumbnail: string
  description: string | null
  gallery: string[]
}

export interface BookOverviewDTO {
  bookId: number
  thumbnail: string
  price: number
  quantityInStock: number
  title: string
  avgRate: string
  rvCounts: number
}

/**
 * Gửi form dữ liệu để tạo sách mới
 * @param formData FormData chứa các trường sách và file
 * @returns ApiResponse<BookDTO>
 */
export async function createNewBook(
  formData: FormData
): Promise<ApiResponse<BookDTO>> {
  const response = await axiosInstance.post<ApiResponse<BookDTO>>(
    API_ENDPOINTS.BOOK.CREATE,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  )

  return response.data
}

export async function getBookDetails(
  bookId: number
): Promise<ApiResponse<BookDTO>> {
  const data = await axiosInstance.get<ApiResponse<BookDTO>>(
    API_ENDPOINTS.BOOK.GET_DETAILS(bookId)
  )
  return data.data
}

export async function updateBook(
  bookId: number,
  formData: FormData
): Promise<ApiResponse<BookDTO>> {
  try {
    const response = await axiosInstance.post(
      `/api/book/${bookId}/update`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    )
    return response.data
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      const message = error.response?.data?.message || error.message
      throw new Error(message)
    } else {
      // Lỗi không phải từ Axios (hiếm gặp)
      throw new Error('Unexpected error occurred.')
    }
  }
}

export async function getBooksOverview({
  page,
  size,
}: {
  page: number
  size: number
}): Promise<PageApiResponse<BookOverviewDTO>> {
  const response = await axiosInstance.get<PageApiResponse<BookOverviewDTO>>(
    `${API_ENDPOINTS.BOOK.OVERVIEW}?page=${page}&size=${size}`
  )

  return response.data
}
