import { useState } from 'react'
import { IconFileDescription } from '@tabler/icons-react'
import { useProductEditContext } from '@/context/ProductEditContext'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
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
import { CategorySelector } from './category-select'
import { FileUploader } from './file-uploader'

export default function RightColumn() {
  const {
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
    qtyInStock,
    setQtyInStock,
    supplier,
    setSupplier,
    productCode,
    setProductCode,
    oldGallery,
    setOldGallery,
  } = useProductEditContext()
  const [displayValue, setDisplayValue] = useState('')
  const formatter = new Intl.NumberFormat('vi-VN')
  return (
    <Card className='rounded-none'>
      <CardContent className='flex flex-col gap-6'>
        <div>Thư viện hình ảnh</div>
        <div className='flex gap-2'>
          {Array.from({ length: 5 }).map((_, index) => (
            <div className='h-[100px] w-[100px]' key={index}>
              <FileUploader
                key={index}
                oldImage={oldGallery[index] ?? null}
                onRemoveOldImage={() => {
                  setOldGallery((prev) => {
                    const updated = [...prev]
                    updated[index] = null
                    return updated
                  })
                }}
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
          <div>
            <div>Danh mục</div>
            <div>
              <CategorySelector value={category} onChange={setCategory} />
            </div>
          </div>
          <div>
            <div>Thể loại</div>
            <div>
              <Select
                defaultValue='1'
                value={Number(genre).toString()}
                onValueChange={(val) => setGenre(Number(val))}
              >
                <div>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                </div>
                <SelectContent>
                  <SelectItem value='1'>Comedy</SelectItem>
                  <SelectItem value='2'>Fantasy</SelectItem>
                  <SelectItem value='3'>Shounen</SelectItem>
                  <SelectItem value='4'>Action</SelectItem>
                  <SelectItem value='5'>Adventure</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <div>Số lượng</div>
            <div>
              <Input
                type='number'
                className='w-20'
                value={qtyInStock}
                onChange={(e) => setQtyInStock(Number(e.target.value))}
              />
            </div>
          </div>
          <div>
            <div>Mã sản phẩm</div>
            <div>
              <Input
                className='w-40'
                value={productCode}
                onChange={(e) => setProductCode(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className='flex justify-between gap-4'>
          <div>
            <div>Nhà cung cấp</div>
            <div>
              <Input
                value={supplier}
                onChange={(e) => setSupplier(e.target.value)}
              />
            </div>
          </div>
          <div>
            <div>Tác giả</div>
            <div>
              <Input
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </div>
          </div>
          <div>
            <div>Độ tuổi</div>
            <Select
              value={Number(age).toString()}
              onValueChange={(val) => setAge(Number(val))}
              defaultValue='0'
            >
              <div>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
              </div>
              <SelectContent>
                <SelectItem value='0'>Bất kỳ độ tuổi nào</SelectItem>
                <SelectItem value='12'>12 tuổi trở lên</SelectItem>
                <SelectItem value='16'>16 tuổi trở lên</SelectItem>
                <SelectItem value='18'>18 tuổi trở lên</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className='flex gap-5'>
          <div>
            <div>Giá sản phẩm</div>
            <div>
              <Input
                placeholder='VD: 1.000.000'
                value={price}
                onChange={(e) => {
                  const raw = e.target.value.replace(/[^\d]/g, '') // chỉ giữ số
                  const number = Number(raw)
                  setDisplayValue(formatter.format(number)) // hiện 1.000.000
                  setPrice(number) // lưu giá trị số
                }}
              />
            </div>
          </div>
          <div className='ml-auto'>
            <div>Thông tin khác</div>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant='outline' className='ml-auto w-fit'>
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
                        onChange={(e) => setPageCount(Number(e.target.value))}
                        id='pages'
                        defaultValue='230'
                        className='h-8'
                      />
                    </div>
                    <div className='grid grid-cols-2 items-center gap-4'>
                      <Label htmlFor='size'>Kích thước bao bì</Label>
                      <Input
                        value={size}
                        onChange={(e) => setSize(e.target.value)}
                        id='maxWidth'
                        defaultValue='17.4 x 11.2 x 2 cm'
                        className='h-8'
                      />
                    </div>
                    <div className='grid grid-cols-2 items-center gap-4'>
                      <Label htmlFor='language'>Ngôn ngữ</Label>
                      <Input
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        id='language'
                        defaultValue='Tiếng Việt'
                        className='h-8'
                      />
                    </div>
                    <div className='grid grid-cols-2 items-center gap-4'>
                      <Label htmlFor='translator'>Dịch giả</Label>
                      <Input
                        id='translator'
                        value={translator}
                        onChange={(e) => setTranslator(e.target.value)}
                        defaultValue='Nguyễn Văn A'
                        className='h-8'
                      />
                    </div>
                    <div className='grid grid-cols-2 items-center gap-4'>
                      <Label htmlFor='year'>Năm xuất bản</Label>
                      <Input
                        id='year'
                        value={publishYear}
                        onChange={(e) => setPublishYear(e.target.value)}
                        defaultValue='1995'
                        className='h-8'
                      />
                    </div>
                    <div className='grid grid-cols-2 items-center gap-4'>
                      <Label htmlFor='weight'>Trọng lượng (gr)</Label>
                      <Input
                        id='weight'
                        value={weight}
                        onChange={(e) => setWeight(Number(e.target.value))}
                        defaultValue='141'
                        className='h-8'
                      />
                    </div>
                    <div className='grid grid-cols-2 items-center gap-4'>
                      <Label htmlFor='cover'>Hình thức bìa</Label>
                      <Select
                        defaultValue='Bìa mềm'
                        value={format}
                        onValueChange={setFormat}
                      >
                        <div>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </div>
                        <SelectContent>
                          <SelectItem value='Bìa mềm'>Bìa mềm</SelectItem>
                          <SelectItem value='Bìa cứng'>Bìa cứng</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
