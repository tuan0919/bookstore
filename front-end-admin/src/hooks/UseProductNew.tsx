import { useState } from 'react'
import { Category } from '@/resources/categories'
import { toast } from 'sonner'
import { createNewBook } from '@/api/book'

export function useProductNew() {
  /* State variables for product details */
  const [thumbnail, setThumbnail] = useState<File | null>(null)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [gallery, setGallery] = useState<(File | null)[]>([])
  const [category, setCategory] = useState<Category | null>(null)
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

  const uploadToServer = async () => {
    const formData = new FormData()

    if (thumbnail) {
      formData.append('thumbnail', thumbnail)
    }

    formData.append('title', title)
    formData.append('description', description)

    if (category !== null) {
      formData.append('category_id', category.id.toString())
    }

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
    gallery
      .filter((f): f is File => !!f)
      .forEach((file) => {
        formData.append('gallery', file)
      })
    if (thumbnail) {
      formData.append('thumbnail', thumbnail)
    }

    // for (const [key, value] of formData.entries()) {
    //   console.log(`${key}:`, value)
    // }

    await createNewBook(formData)
    toast('Thao tác thành công!', {
      description: 'Sách mới đã được tạo thành công.',
      action: {
        label: 'Xác nhận',
        onClick: () => {},
      },
    })
  }

  return {
    uploadToServer,
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
    reset: () => {
      setThumbnail(null)
      setTitle('')
      setDescription('')
      setGallery([])
      setCategory(null)
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
