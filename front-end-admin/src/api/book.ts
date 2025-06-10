import { ApiResponse } from '~/types/api'
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
