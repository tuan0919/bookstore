import { Category } from './categories'

export type Coupon = {
  id: string
  createAt: string
  category?: Category
  type: 'Giảm theo %' | 'Giảm theo tiền'
  parent: Coupon | null
  code: string
  description: string
  start: string
  end: string
  status: 'Còn hạn' | 'Hết hạn'
  discount: string
}

export const coupons: Coupon[] = [
  {
    id: 'C16276',
    category: {
      id: 'C16276',
      createAt: '23 th4, 2025',
      type: 'Danh mục gốc',
      parent: null,
      name: 'Truyện tiếng Việt',
      description: 'Truyện được sản xuất tại Việt Nam',
    },
    discount: '30%',
    status: 'Hết hạn',
    start: '12 Tháng 5 2023',
    end: '26 Tháng 8 2023',
    createAt: '23 th4, 2025',
    type: 'Giảm theo %',
    parent: null,
    code: 'SUMMER2025',
    description: 'Truyện được sản xuất tại Việt Nam',
  },
]
