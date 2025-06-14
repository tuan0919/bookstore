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
    if (oldThumbnail) {
      formData.append('old_thumbnail', oldThumbnail)
    }
    if (thumbnail) {
      formData.append('new_thumbnail', thumbnail)
    }

    formData.append('title', title)
    formData.append('description', description)

    formData.append('category_id', category.toString())
    formData.append('genre_id', genre.toString())
    formData.append('author', author)
    formData.append('age', age.toString())
    formData.append('price', price.toString())
    formData.append('format', format)
    formData.append('language', language)
    formData.append('page_count', pageCount.toString())
    formData.append('weight', weight.toString())
    formData.append('size', size)
    formData.append('publish_year', publishYear)
    formData.append('translator', translator)
    formData.append('publisher', publisher)
    formData.append('qty_in_stock', qtyInStock.toString())
    formData.append('supplier', supplier)
    formData.append('product_code', productCode)
    console.log('Final oldGallery:', oldGallery)
    oldGallery
      .filter((link) => link != null)
      .forEach((link) => {
        formData.append('old_gallery', link)
        console.log('Appending old gallery file:', link)
      })
    gallery
      .filter((f): f is File => !!f)
      .forEach((file) => {
        formData.append('new_gallery', file)
        console.log('Appending new gallery file:', file.name)
      })
    updateBook(bookId, formData)
    toast('Thao tác thành công!', {
      description: 'Sách mới đã được tạo thành công.',
      action: {
        label: 'Xác nhận',
        onClick: () => {},
      },
    })
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
