export interface UserLoginResponseDTO {
  code: number
  result: string
}

export interface UserDetailsResponseDTO {
  userId: number
  fullname: string
  gender: string
  phoneNum: string
  verified: boolean
  email: string
  username: string
  createdDate: string
  defaultAddress: string
}
