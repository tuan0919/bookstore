export interface OrderItem {
  img: string
  bookTitle: string
  price: number
  quantity: number
  discount: number
}

interface ShippingAddress {
  unitNumber: string
  streetNumber: string
  addressLine1: string
  addressLine2: string
  city: string
  region: string
  postalCode: string
}

export interface OrderDTO {
  orderId: number
  orderDate: string // ISO format, consider using Date if parsed
  totalAmount: number
  paymentMethodName: string
  items: OrderItem[]
  status: string
  shippingAddress: ShippingAddress
}
