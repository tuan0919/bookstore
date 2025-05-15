export type Coupon = {
  id: string
  createAt: string
  product?: Product
  type: 'Danh mục gốc' | 'Danh mục con'
  parent: Coupon | null
  code: string
  description: string
  start: string
  end: string
  status: 'Còn hạn' | 'Hết hạn'
  discount: string
}

export type Product = {
  id: string
  name: string
  thumbnail: string
  category: string
  price: number
}

export const coupons: Coupon[] = [
  {
    id: 'C16276',
    product: {
      id: '1',
      name: 'Dược sư tự sự',
      category: 'Truyện tranh Nhật Bản',
      price: 30000,
      thumbnail:
        'https://nhasachphuongnam.com/images/detailed/277/manga-duoc-su-tu-su-tap-13.jpg',
    },
    discount: '30%',
    status: 'Hết hạn',
    start: '12 Tháng 5 2023',
    end: '26 Tháng 8 2023',
    createAt: '23 th4, 2025',
    type: 'Danh mục gốc',
    parent: null,
    code: 'SUMMER2025',
    description: 'Truyện được sản xuất tại Việt Nam',
  },
]
