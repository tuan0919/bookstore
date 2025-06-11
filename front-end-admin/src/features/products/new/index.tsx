import { useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { IconFileDescription } from '@tabler/icons-react'
import { Category } from '@/resources/categories'
import { toast } from 'sonner'
import SunEditor from 'suneditor-react'
import 'suneditor/dist/css/suneditor.min.css'
import { createNewBook } from '@/api/book'
// Import React FilePond
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { TopNav } from '@/components/layout/top-nav'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { CategorySelector } from './components/category-select'
import { FileUploader } from './components/file-uploader'

const formSchema = z.object({
  name: z.string({
    message: 'Tên sản phẩm không được phép để trống!',
  }),
  description: z.string({
    message: 'Mô tả sản phẩm không được phép để trống!',
  }),
  provider: z.string({
    message: 'Nhà cung cấp không được phép để trống!',
  }),
  language: z.string({
    message: 'Ngôn ngữ không được phép để trống!',
  }),
  author: z.string(),
  age: z.number(),
  genres: z.string().array(),
  discount: z.number(),
  price: z.number(),
})

export default function New() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      provider: 'Không rõ',
      author: 'Không rõ',
      language: 'Tiếng Anh',
      discount: 30,
    },
  })

  const formatter = new Intl.NumberFormat('vi-VN')
  const [displayValue, setDisplayValue] = useState('')

  const onSubmit = async () => {
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

    for (const [key, value] of formData.entries()) {
      console.log(`${key}:`, value)
    }

    const result = await createNewBook(formData)
    toast('Thao tác thành công!', {
      description: 'Sách mới đã được tạo thành công.',
      action: {
        label: 'Xác nhận',
        onClick: () => console.log('Xác nhận'),
      },
    })
  }

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
  return (
    <>
      {/* ===== Top Heading ===== */}
      <Header>
        <div className='ml-auto flex items-center space-x-4'>
          <Search />
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>

      {/* ===== Main ===== */}
      <Main>
        <div className='mb-2 flex items-center justify-between space-y-2'>
          <h1 className='text-2xl font-bold tracking-tight'>
            Thêm sản phẩm mới
          </h1>
        </div>
        <Card className='rounded-none'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
              <CardContent className='grid grid-cols-2 items-start gap-3'>
                <Card className='rounded-none'>
                  <CardContent className='flex flex-col gap-6'>
                    <FormLabel>Hình ảnh sản phẩm</FormLabel>
                    <div className='mx-auto'>
                      <div className='h-[300px] w-[300px]'>
                        <FileUploader
                          onChange={setThumbnail}
                          value={thumbnail}
                        />
                      </div>
                    </div>
                    <FormItem>
                      <FormLabel>Tên sản phẩm</FormLabel>
                      <FormControl>
                        <Input
                          value={title}
                          onChange={(val) => setTitle(val.target.value)}
                          placeholder='Nhập tên sản phẩm...'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                    <FormItem>
                      <FormLabel>Mô tả sản phẩm</FormLabel>
                      <SunEditor
                        setContents={description}
                        onChange={(content: string) => setDescription(content)}
                        setOptions={{
                          font: [
                            'Arial',
                            'Courier New',
                            'Georgia',
                            'Impact',
                            'Tahoma',
                            'Times New Roman',
                            'Verdana',
                          ],
                          fontSize: [8, 9, 10, 11, 12, 14, 16, 18, 20, 24, 30],
                          buttonList: [
                            ['undo', 'redo'],
                            ['font'],
                            ['fontSize'],
                            ['formatBlock'],
                            ['bold', 'underline', 'italic', 'strike'],
                            ['table'],
                            ['fullScreen', 'showBlocks', 'codeView'],
                          ],
                        }}
                      />
                      <FormMessage />
                    </FormItem>
                  </CardContent>
                </Card>
                <Card className='rounded-none'>
                  <CardContent className='flex flex-col gap-6'>
                    <FormLabel>Thư viện hình ảnh</FormLabel>
                    <div className='flex gap-2'>
                      {Array.from({ length: 5 }).map((_, index) => (
                        <div className='h-[100px] w-[100px]' key={index}>
                          <FileUploader
                            key={index}
                            onChange={(file: File | null) => {
                              const updated = [...gallery]
                              updated[index] = file
                              setGallery(updated)
                            }}
                            value={gallery[index] || null}
                          />
                        </div>
                      ))}
                    </div>
                    <div className='flex gap-3'>
                      <FormItem>
                        <FormLabel>Danh mục</FormLabel>
                        <FormControl>
                          <CategorySelector
                            value={category}
                            onChange={setCategory}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                      <FormItem>
                        <FormLabel>Thể loại</FormLabel>
                        <FormControl>
                          <Select
                            defaultValue='1'
                            value={Number(genre).toString()}
                            onValueChange={(val) => setGenre(Number(val))}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value='1'>Comedy</SelectItem>
                              <SelectItem value='2'>Fantasy</SelectItem>
                              <SelectItem value='3'>Shounen</SelectItem>
                              <SelectItem value='4'>Action</SelectItem>
                              <SelectItem value='5'>Adventure</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                      <FormItem>
                        <FormLabel>Số lượng</FormLabel>
                        <FormControl>
                          <Input
                            type='number'
                            className='w-20'
                            value={qtyInStock}
                            onChange={(e) =>
                              setQtyInStock(Number(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                      <FormItem>
                        <FormLabel>Mã sản phẩm</FormLabel>
                        <FormControl>
                          <Input
                            className='w-40'
                            value={productCode}
                            onChange={(e) => setProductCode(e.target.value)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    </div>
                    <div className='flex justify-between gap-4'>
                      <FormItem>
                        <FormLabel>Nhà cung cấp</FormLabel>
                        <FormControl>
                          <Input
                            value={supplier}
                            onChange={(e) => setSupplier(e.target.value)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                      <FormItem>
                        <FormLabel>Tác giả</FormLabel>
                        <FormControl>
                          <Input
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                      <FormItem>
                        <FormLabel>Độ tuổi</FormLabel>
                        <Select
                          value={Number(age).toString()}
                          onValueChange={(val) => setAge(Number(val))}
                          defaultValue='0'
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value='0'>
                              Bất kỳ độ tuổi nào
                            </SelectItem>
                            <SelectItem value='12'>12 tuổi trở lên</SelectItem>
                            <SelectItem value='16'>16 tuổi trở lên</SelectItem>
                            <SelectItem value='18'>18 tuổi trở lên</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    </div>
                    <div className='flex gap-5'>
                      <FormItem>
                        <FormLabel>Giá sản phẩm</FormLabel>
                        <FormControl>
                          <Input
                            placeholder='VD: 1.000.000'
                            value={displayValue}
                            onChange={(e) => {
                              const raw = e.target.value.replace(/[^\d]/g, '') // chỉ giữ số
                              const number = Number(raw)
                              setDisplayValue(formatter.format(number)) // hiện 1.000.000
                              setPrice(number) // lưu giá trị số
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                      <FormField
                        control={form.control}
                        name='discount'
                        render={() => (
                          <FormItem className='ml-auto'>
                            <FormLabel>Thông tin khác</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  variant='outline'
                                  className='ml-auto w-fit'
                                >
                                  <IconFileDescription />
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className='w-100'>
                                <div className='grid gap-4'>
                                  <div className='space-y-2'>
                                    <h4 className='leading-none font-medium'>
                                      Thông tin sản phẩm
                                    </h4>
                                    <p className='text-muted-foreground text-sm'>
                                      Một số thông tin chi tiết khác về sản phẩm
                                    </p>
                                  </div>
                                  <div className='grid gap-2'>
                                    <div className='grid grid-cols-2 items-center gap-4'>
                                      <Label htmlFor='pages'>Số trang</Label>
                                      <Input
                                        type='number'
                                        value={pageCount}
                                        onChange={(e) =>
                                          setPageCount(Number(e.target.value))
                                        }
                                        id='pages'
                                        defaultValue='230'
                                        className='h-8'
                                      />
                                    </div>
                                    <div className='grid grid-cols-2 items-center gap-4'>
                                      <Label htmlFor='size'>
                                        Kích thước bao bì
                                      </Label>
                                      <Input
                                        value={size}
                                        onChange={(e) =>
                                          setSize(e.target.value)
                                        }
                                        id='maxWidth'
                                        defaultValue='17.4 x 11.2 x 2 cm'
                                        className='h-8'
                                      />
                                    </div>
                                    <div className='grid grid-cols-2 items-center gap-4'>
                                      <Label htmlFor='language'>Ngôn ngữ</Label>
                                      <Input
                                        value={language}
                                        onChange={(e) =>
                                          setLanguage(e.target.value)
                                        }
                                        id='language'
                                        defaultValue='Tiếng Việt'
                                        className='h-8'
                                      />
                                    </div>
                                    <div className='grid grid-cols-2 items-center gap-4'>
                                      <Label htmlFor='translator'>
                                        Dịch giả
                                      </Label>
                                      <Input
                                        id='translator'
                                        value={translator}
                                        onChange={(e) =>
                                          setTranslator(e.target.value)
                                        }
                                        defaultValue='Nguyễn Văn A'
                                        className='h-8'
                                      />
                                    </div>
                                    <div className='grid grid-cols-2 items-center gap-4'>
                                      <Label htmlFor='year'>Năm xuất bản</Label>
                                      <Input
                                        id='year'
                                        value={publishYear}
                                        onChange={(e) =>
                                          setPublishYear(e.target.value)
                                        }
                                        defaultValue='1995'
                                        className='h-8'
                                      />
                                    </div>
                                    <div className='grid grid-cols-2 items-center gap-4'>
                                      <Label htmlFor='weight'>
                                        Trọng lượng (gr)
                                      </Label>
                                      <Input
                                        id='weight'
                                        value={weight}
                                        onChange={(e) =>
                                          setWeight(Number(e.target.value))
                                        }
                                        defaultValue='141'
                                        className='h-8'
                                      />
                                    </div>
                                    <div className='grid grid-cols-2 items-center gap-4'>
                                      <Label htmlFor='cover'>
                                        Hình thức bìa
                                      </Label>
                                      <Select
                                        defaultValue='Bìa mềm'
                                        value={format}
                                        onValueChange={setFormat}
                                      >
                                        <FormControl>
                                          <SelectTrigger>
                                            <SelectValue />
                                          </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                          <SelectItem value='Bìa mềm'>
                                            Bìa mềm
                                          </SelectItem>
                                          <SelectItem value='Bìa cứng'>
                                            Bìa cứng
                                          </SelectItem>
                                        </SelectContent>
                                      </Select>
                                    </div>
                                  </div>
                                </div>
                              </PopoverContent>
                            </Popover>
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
              <CardFooter>
                <Button type='button' onClick={onSubmit}>
                  Thêm sản phẩm mới
                </Button>
              </CardFooter>
            </form>
          </Form>
        </Card>
      </Main>
    </>
  )
}
