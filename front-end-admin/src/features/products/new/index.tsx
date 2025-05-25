import { useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  IconCheckbox,
  IconCirclePlus,
  IconFileDescription,
  IconSquare,
  IconUpload,
} from '@tabler/icons-react'
import { FilePondFile } from 'filepond'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
// `npm i filepond-plugin-image-preview filepond-plugin-image-exif-orientation --save`
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
// Import FilePond styles
import 'filepond/dist/filepond.min.css'
import { FilePond, registerPlugin } from 'react-filepond'
// Import React FilePond
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command'
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
import { Textarea } from '@/components/ui/textarea'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { TopNav } from '@/components/layout/top-nav'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'

const formSchema = z.object({
  name: z.string({
    message: 'Tên sản phẩm không được phép để trống!',
  }),
  description: z.string({
    message: 'Mô tả sản phẩm không được phép để trống!',
  }),
  provider: z.number().nonnegative({
    message: 'Phải chọn nhà cung cấp cho sản phẩm!',
  }),
  language: z.string(),
  age: z.number(),
  genres: z.string().array(),
  discount: z.number(),
  price: z.number(),
})
registerPlugin(FilePondPluginImagePreview)

export default function New() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      provider: -1,
      language: 'vn',
      discount: 30,
    },
  })
  function onSubmit() {}
  const formatter = new Intl.NumberFormat('vi-VN')
  const [displayValue, setDisplayValue] = useState('')
  const [files, setFiles] = useState<FilePondFile[]>([])
  return (
    <>
      {/* ===== Top Heading ===== */}
      <Header>
        <TopNav links={topNav} />
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
                    <FormField
                      control={form.control}
                      name='name'
                      render={() => (
                        <>
                          <FormLabel>Hình ảnh sản phẩm</FormLabel>
                          <FilePond
                            files={files.map((file) => file.file)}
                            onupdatefiles={setFiles}
                            allowReplace={true}
                            allowReorder={true}
                            instantUpload={false}
                            server='/api'
                            name='files'
                            labelIdle='Kéo & thả file hoặc <span class="filepond--label-action">chọn từ máy</span>'
                          />
                        </>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name='name'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tên sản phẩm</FormLabel>
                          <FormControl>
                            <Input
                              placeholder='Nhập tên sản phẩm...'
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name='description'
                      render={() => (
                        <FormItem>
                          <FormLabel>Mô tả sản phẩm</FormLabel>
                          <FormControl>
                            <Textarea placeholder='Nhập mô tả sản phẩm tại đây.' />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className='flex justify-between'>
                      <FormField
                        control={form.control}
                        name='provider'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nhà cung cấp</FormLabel>
                            <Select
                              onValueChange={(val) =>
                                field.onChange(Number(val))
                              }
                              defaultValue='0'
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value='0'>
                                  Nhà cung cấp 1
                                </SelectItem>
                                <SelectItem value='1'>
                                  Nhà cung cấp 2
                                </SelectItem>
                                <SelectItem value='2'>
                                  Nhà cung cấp 3
                                </SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name='language'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Ngôn ngữ truyện</FormLabel>
                            <Select
                              onValueChange={(val) =>
                                field.onChange(Number(val))
                              }
                              defaultValue='vi'
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value='vi'>
                                  Truyện tiếng việt
                                </SelectItem>
                                <SelectItem value='other'>
                                  Truyện ngoại văn
                                </SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name='age'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Độ tuổi</FormLabel>
                            <Select
                              onValueChange={(val) =>
                                field.onChange(Number(val))
                              }
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
                                <SelectItem value='1'>
                                  13 tuổi trở lên
                                </SelectItem>
                                <SelectItem value='2'>
                                  16 tuổi trở lên
                                </SelectItem>
                                <SelectItem value='3'>
                                  18 tuổi trở lên
                                </SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                </Card>
                <Card className='rounded-none'>
                  <CardContent className='flex flex-col gap-6'>
                    <FormField
                      control={form.control}
                      name='name'
                      render={() => (
                        <FormItem>
                          <FormLabel>Thư viện hình ảnh</FormLabel>
                          <FormControl>
                            <Carousel>
                              <CarouselContent>
                                {Array.from({ length: 5 }).map((_, index) => (
                                  <CarouselItem
                                    key={index}
                                    className='md:basis-1/2 lg:basis-1/6'
                                  >
                                    <div className='p-1'>
                                      <Card className='rounded-none border-2 border-dashed p-0'>
                                        <CardContent className='flex aspect-square cursor-pointer items-center justify-center'>
                                          <IconUpload />
                                        </CardContent>
                                      </Card>
                                    </div>
                                  </CarouselItem>
                                ))}
                              </CarouselContent>
                            </Carousel>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name='genres'
                      render={() => (
                        <FormItem>
                          <FormLabel>Thể loại</FormLabel>
                          <FormControl>
                            <div className='flex gap-2'>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <div className='flex gap-1'>
                                    <Button variant='outline' type='button'>
                                      <IconCirclePlus />
                                      Chọn thể loại
                                    </Button>
                                  </div>
                                </PopoverTrigger>
                                <PopoverContent className='w-80'>
                                  <Command>
                                    <CommandInput placeholder='Nhập thể loại...' />
                                    <CommandList>
                                      <CommandEmpty>
                                        No results found.
                                      </CommandEmpty>
                                      <CommandGroup heading='Đề xuất'>
                                        <CommandItem>
                                          <IconSquare />
                                          <span>Phiêu lưu</span>
                                        </CommandItem>
                                        <CommandItem>
                                          <IconSquare />
                                          <span>Tình cảm</span>
                                        </CommandItem>
                                        <CommandItem>
                                          <IconCheckbox />
                                          <span>Trinh khám</span>
                                        </CommandItem>
                                        <CommandItem>
                                          <IconSquare />
                                          <span>Kinh dị</span>
                                        </CommandItem>
                                      </CommandGroup>
                                      <CommandSeparator />
                                      <CommandGroup>
                                        <CommandItem className='justify-center text-center'>
                                          Thêm thể loại mới
                                        </CommandItem>
                                      </CommandGroup>
                                    </CommandList>
                                  </Command>
                                </PopoverContent>
                              </Popover>
                              <div className='flex flex-wrap gap-1 border border-dashed p-2'>
                                <Badge variant='outline'>Trinh khám</Badge>
                              </div>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className='flex gap-5'>
                      <FormField
                        control={form.control}
                        name='price'
                        render={({ field }) => {
                          return (
                            <FormItem>
                              <FormLabel>Giá sản phẩm</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder='VD: 1.000.000'
                                  value={displayValue}
                                  onChange={(e) => {
                                    const raw = e.target.value.replace(
                                      /[^\d]/g,
                                      ''
                                    ) // chỉ giữ số
                                    const number = Number(raw)
                                    setDisplayValue(formatter.format(number)) // hiện 1.000.000
                                    field.onChange(number) // lưu vào form là số
                                  }}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )
                        }}
                      />
                      <FormField
                        control={form.control}
                        name='discount'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Giảm giá</FormLabel>
                            <FormControl>
                              <Input
                                className='w-[5rem]'
                                type='number'
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
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
                                        id='maxWidth'
                                        defaultValue='17.4 x 11.2 x 2 cm'
                                        className='h-8'
                                      />
                                    </div>
                                    <div className='grid grid-cols-2 items-center gap-4'>
                                      <Label htmlFor='year'>Năm xuất bản</Label>
                                      <Input
                                        id='year'
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
                                        defaultValue='141'
                                        className='h-8'
                                      />
                                    </div>
                                    <div className='grid grid-cols-2 items-center gap-4'>
                                      <Label htmlFor='cover'>
                                        Hình thức bìa
                                      </Label>
                                      <Select defaultValue='soft'>
                                        <FormControl>
                                          <SelectTrigger>
                                            <SelectValue />
                                          </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                          <SelectItem value='soft'>
                                            Bìa mềm
                                          </SelectItem>
                                          <SelectItem value='hard'>
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
                <Button type='submit'>Thêm sản phẩm mới</Button>
              </CardFooter>
            </form>
          </Form>
        </Card>
      </Main>
    </>
  )
}

const topNav = [
  {
    title: 'Overview',
    href: 'dashboard/overview',
    isActive: true,
    disabled: false,
  },
  {
    title: 'Customers',
    href: 'dashboard/customers',
    isActive: false,
    disabled: true,
  },
  {
    title: 'Products',
    href: 'dashboard/products',
    isActive: false,
    disabled: true,
  },
  {
    title: 'Settings',
    href: 'dashboard/settings',
    isActive: false,
    disabled: true,
  },
]
