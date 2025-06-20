export interface OrderItem {
  img: string
  bookTitle: string
  price: number
  quantity: number
  discount: number
}

export interface OrderTimeline {
  timelines: { name: string; description: string; createdAt: string }[]
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
  orderDate: string
  totalAmount: number
  paymentMethodName: string
  items: OrderItem[]
  status: string
  shippingAddress: ShippingAddress
  statusCode:
    | 'PENDING_CONFIRMATION'
    | 'CONFIRMED'
    | 'SHIPPING'
    | 'DELIVERED'
    | 'CANCELED'
  customer: {
    user_id: number
    username: string
    email: string
  }
}
