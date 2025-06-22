import { ApiResponse } from '@/types/api'
import { UserDetailsResponseDTO } from '@/types/user'
import axiosInstance from './axios'
import API_ENDPOINTS from './endpoint'

export const getUserDetails = async (userId: number) => {
  const res = await axiosInstance.get<ApiResponse<UserDetailsResponseDTO>>(
    API_ENDPOINTS.USER.DETAILS(userId)
  )
  return res.data
}
