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
