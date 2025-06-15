export interface ApiResponse<T> {
  code: number
  result: T
  message: string
}

export interface Pageable {
  pageNumber: number
  pageSize: number
  offset: number
  paged: boolean
  unpaged: boolean
  sort: {
    empty: boolean
    sorted: boolean
    unsorted: boolean
  }
}

export interface PageApiResponse<T> {
  code: number
  result: {
    content: T[]
    pageable: Pageable
    last: boolean
    totalElements: number
    totalPages: number
    first: boolean
    numberOfElements: number
    size: number
    number: number
    sort: {
      empty: boolean
      sorted: boolean
      unsorted: boolean
    }
    empty: boolean
  }
}
