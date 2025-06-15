import { useState } from 'react'
import { toast } from 'sonner'
import { getBookDetails, updateBook } from '@/api/book'

export function useProductEdit() {
  /* State variables for product details */
  const [oldThumbnail, setOldThumbnail] = useState<string | null>()
  const [thumbnail, setThumbnail] = useState<File | null>(null)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [oldGallery, setOldGallery] = useState<(string | null)[]>([])
  const [gallery, setGallery] = useState<(File | null)[]>([])
  const [category, setCategory] = useState<number>(0)
  const [genre, setGenre] = useState<number>(1)
  const [author, setAuthor] = useState('')
  const [age, setAge] = useState<number>(0)
  const [price, setPrice] = useState<number>(0)
  const [format, setFormat] = useState<string>('')
  const [language, setLanguage] = useState<string>('')
  const [pageCount, setPageCount] = useState<number>(0)
  const [weight, setWeight] = useState<number>(0)
  const [size, setSize] = useState<string>('')
  const [publishYear, setPublishYear] = useState<string>('')
  const [translator, setTranslator] = useState<string>('')
  const [publisher, setPublisher] = useState<string>('')
  const [qtyInStock, setQtyInStock] = useState<number>(0)
  const [supplier, setSupplier] = useState<string>('')
  const [productCode, setProductCode] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const fetchBookData = async (bookId: number) => {
    setIsLoading(true)
    const { result: dto } = await getBookDetails(bookId)
    setOldGallery(() => [...dto.gallery])
    setAuthor(dto.author)
    setAge(Number(dto.age))
    setPrice(dto.price)
    setFormat(dto.format)
    setLanguage(dto.language)
    setPageCount(dto.page_count)
    setWeight(dto.weight)
    setSize(dto.size)
    setCategory(dto.category_id)
    setPublishYear(dto.publish_year + '')
    setTranslator(dto.translator)
    setPublisher(dto.publisher)
    setQtyInStock(dto.qty_in_stock)
    setSupplier(dto.supplier)
    setProductCode(dto.product_code + '')
    setOldThumbnail(() => dto.thumbnail)
    setTitle(dto.title)
    setDescription(dto.description || '')
    setIsLoading(false)
  }

  const updateOnServer = async (bookId: number) => {
    const formData = new FormData()
    const debugPayload: Record<string, any> = {}

    if (oldThumbnail) {
      formData.append('old_thumbnail', oldThumbnail)
      debugPayload.old_thumbnail = oldThumbnail
    }

    if (thumbnail) {
      formData.append('new_thumbnail', thumbnail)
      debugPayload.new_thumbnail = thumbnail.name
    }

    formData.append('title', title)
    debugPayload.title = title

    formData.append('description', description)
    debugPayload.description = description

    formData.append('category_id', category.toString())
    debugPayload.category_id = category.toString()

    formData.append('genre_id', genre.toString())
    debugPayload.genre_id = genre.toString()

    formData.append('author', author)
    debugPayload.author = author

    formData.append('age', age.toString())
    debugPayload.age = age.toString()

    formData.append('price', price.toString())
    debugPayload.price = price.toString()

    formData.append('format', format)
    debugPayload.format = format

    formData.append('language', language)
    debugPayload.language = language

    formData.append('page_count', pageCount.toString())
    debugPayload.page_count = pageCount.toString()

    formData.append('weight', weight.toString())
    debugPayload.weight = weight.toString()

    formData.append('size', size)
    debugPayload.size = size

    formData.append('publish_year', publishYear)
    debugPayload.publish_year = publishYear

    formData.append('translator', translator)
    debugPayload.translator = translator

    formData.append('publisher', publisher)
    debugPayload.publisher = publisher

    formData.append('qty_in_stock', qtyInStock.toString())
    debugPayload.qty_in_stock = qtyInStock.toString()

    formData.append('supplier', supplier)
    debugPayload.supplier = supplier

    formData.append('product_code', productCode)
    debugPayload.product_code = productCode

    const oldGalleryLinks = oldGallery.filter(
      (link): link is string => link != null
    )
    oldGalleryLinks.forEach((link) => formData.append('old_gallery', link))
    debugPayload.old_gallery = oldGalleryLinks

    const newGalleryFiles = gallery.filter((f): f is File => !!f)
    newGalleryFiles.forEach((file) => formData.append('new_gallery', file))
    debugPayload.new_gallery = newGalleryFiles.map((f) => f.name)

    console.log('🧪 Debug Payload:', debugPayload)
    try {
      await updateBook(bookId, formData)

      toast('Thao tác thành công!', {
        description: 'Cập nhật thông tin sách thành công.',
        action: {
          label: 'Xác nhận',
          onClick: () => {},
        },
        position: 'top-center',
      })
    } catch (error: any) {
      toast('Thao tác thất bại!', {
        description: `Có lỗi xảy ra: ${error.message || 'Không rõ nguyên nhân.'}`,
        action: {
          label: 'Xác nhận',
          onClick: () => {},
        },
        position: 'top-center',
      })
    }
  }

  return {
    updateOnServer,
    thumbnail,
    setThumbnail,
    title,
    setTitle,
    description,
    setDescription,
    gallery,
    setGallery,
    category,
    setCategory,
    genre,
    setGenre,
    author,
    setAuthor,
    age,
    setAge,
    price,
    setPrice,
    format,
    setFormat,
    language,
    setLanguage,
    pageCount,
    setPageCount,
    weight,
    setWeight,
    size,
    setSize,
    publishYear,
    setPublishYear,
    translator,
    setTranslator,
    publisher,
    setPublisher,
    qtyInStock,
    setQtyInStock,
    supplier,
    setSupplier,
    productCode,
    setProductCode,
    oldThumbnail,
    setOldThumbnail,
    oldGallery,
    setOldGallery,
    fetchBookData,
    reset: () => {
      setThumbnail(null)
      setTitle('')
      setDescription('')
      setGallery([])
      setCategory(0)
      setGenre(1)
      setAuthor('')
      setAge(0)
      setPrice(0)
      setFormat('')
      setLanguage('')
      setPageCount(0)
      setWeight(0)
      setSize('')
      setPublishYear('')
      setTranslator('')
      setPublisher('')
      setQtyInStock(0)
      setSupplier('')
      setProductCode('')
    },
  }
}
