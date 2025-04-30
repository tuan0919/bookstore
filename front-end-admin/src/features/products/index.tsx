import { useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  IconPencil,
  IconSearch,
  IconTrash,
  IconGift,
  IconPlus,
} from '@tabler/icons-react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { TopNav } from '@/components/layout/top-nav'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'

const formSchema = z.object({
  languages: z.string().array(),
  priceRange: z.number(),
  genres: z.string().array(),
})

export default function Dashboard() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      languages: [''],
      priceRange: 100000,
      genres: [''],
    },
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {}
  const [limit, setLimit] = useState('10')
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
            Sản phẩm trong cửa hàng
          </h1>
        </div>
        <div className='grid items-start gap-4 sm:grid-cols-2 lg:grid-cols-4'>
          <Card className='w-full'>
            <CardHeader>
              <CardTitle>Lọc sản phẩm</CardTitle>
              <CardDescription>Lọc theo tiêu chí khác nhau</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className='space-y-8'
                >
                  <FormLabel className='text-base'>
                    Chọn ngôn ngữ truyện
                  </FormLabel>
                  <FormField
                    control={form.control}
                    name='languages'
                    render={({ field }) => (
                      <>
                        <FormItem className='flex flex-row items-center space-y-0 space-x-3'>
                          <FormControl>
                            <Checkbox />
                          </FormControl>
                          <FormLabel>Truyện tiếng việt</FormLabel>
                        </FormItem>
                        <FormItem className='flex flex-row items-center space-y-0 space-x-3'>
                          <FormControl>
                            <Checkbox />
                          </FormControl>
                          <FormLabel>Truyện ngoại văn</FormLabel>
                        </FormItem>
                      </>
                    )}
                  />
                  <FormLabel className='text-base'>Chọn thể loại</FormLabel>
                  <FormField
                    control={form.control}
                    name='genres'
                    render={({ field }) => (
                      <>
                        <FormItem className='flex flex-row items-center space-y-0 space-x-3'>
                          <FormControl>
                            <Checkbox />
                          </FormControl>
                          <FormLabel>Hành động</FormLabel>
                        </FormItem>
                        <FormItem className='flex flex-row items-center space-y-0 space-x-3'>
                          <FormControl>
                            <Checkbox />
                          </FormControl>
                          <FormLabel>Phiêu lưu</FormLabel>
                        </FormItem>
                        <FormItem className='flex flex-row items-center space-y-0 space-x-3'>
                          <FormControl>
                            <Checkbox />
                          </FormControl>
                          <FormLabel>Tình cảm</FormLabel>
                        </FormItem>
                        <FormItem className='flex flex-row items-center space-y-0 space-x-3'>
                          <FormControl>
                            <Checkbox />
                          </FormControl>
                          <FormLabel>Hài hước</FormLabel>
                        </FormItem>
                        <FormItem className='flex flex-row items-center space-y-0 space-x-3'>
                          <FormControl>
                            <Checkbox />
                          </FormControl>
                          <FormLabel>Kinh dị</FormLabel>
                        </FormItem>
                      </>
                    )}
                  />
                  <FormLabel className='text-base'>Chọn giá tiền</FormLabel>
                  <FormField
                    control={form.control}
                    name='priceRange'
                    render={({ field }) => (
                      <Slider defaultValue={[50]} max={100} step={1} />
                    )}
                  />
                  <Button type='submit'>Lọc</Button>
                </form>
              </Form>
            </CardContent>
          </Card>
          <div className='col-span-3 flex-col'>
            <Card className='w-full'>
              <CardHeader>
                <CardTitle className='mb-2'>Tìm kiếm theo tên</CardTitle>
                <div className='flex items-center justify-between gap-4'>
                  {/* Search Input */}
                  <div className='relative w-full max-w-sm'>
                    <IconSearch
                      size={20}
                      className='text-muted-foreground absolute top-1/2 left-3 -translate-y-1/2'
                    />
                    <Input
                      type='text'
                      placeholder='Tìm kiếm...'
                      className='pl-10'
                    />
                  </div>

                  <div className='flex gap-2'>
                    <Select value={limit} onValueChange={setLimit}>
                      <SelectTrigger>
                        <SelectValue placeholder='Số lượng' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='10'>10 sản phẩm</SelectItem>
                        <SelectItem value='20'>20 sản phẩm</SelectItem>
                        <SelectItem value='40'>40 sản phẩm</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant='outline' className='gap-1'>
                      <IconPlus size={18} />
                      Thêm sản phẩm
                    </Button>
                  </div>
                </div>
              </CardHeader>
            </Card>
            <div className='grid w-full grid-cols-4 gap-3 py-3'>
              {Array.of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10).map((value, index) => (
                <Card
                  key={index}
                  className='cursor-pointer gap-1 px-2 py-1 transition duration-200 ease-in-out hover:shadow-lg'
                >
                  <CardHeader className='group relative overflow-hidden rounded-sm'>
                    <div className='absolute top-0 left-0 rounded-br-md bg-red-500 px-2 py-1 text-xs font-bold text-white'>
                      -10%
                    </div>
                    <div className='absolute inset-0 z-10 bg-black/40 opacity-0 transition duration-500 group-hover:opacity-100' />
                    <div className='absolute right-2 bottom-2 z-20 flex gap-2 opacity-0 transition duration-500 group-hover:opacity-100'>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button className='flex h-8 w-8 items-center justify-center rounded-full bg-yellow-400 text-white hover:brightness-110'>
                            <IconPencil size={16} />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Chỉnh sửa</p>
                        </TooltipContent>
                      </Tooltip>

                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button className='flex h-8 w-8 items-center justify-center rounded-full bg-green-500 text-white hover:brightness-110'>
                            <IconGift size={16} />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Khuyến mãi</p>
                        </TooltipContent>
                      </Tooltip>

                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button className='flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-white hover:brightness-110'>
                            <IconTrash size={16} />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Xóa sản phẩm</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <img src='https://nhasachphuongnam.com/images/detailed/277/manga-duoc-su-tu-su-tap-13.jpg' />
                  </CardHeader>
                  <CardContent className='flex flex-col gap-2 px-2'>
                    <h2
                      className='text-sm'
                      style={{
                        fontFamily: 'Segoe UI',
                        fontSize: 15,
                        fontWeight: 600,
                      }}
                    >
                      Dược sư tự sự (Manga) - Tập 3
                    </h2>
                    <div className='flex w-full justify-between'>
                      <p className='text-sm font-semibold'>39,950₫</p>
                      <p className='text-sm line-through'>47,000₫</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <Pagination className='mt-4'>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href='#' />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href='#'>1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href='#' isActive>
                    2
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href='#'>3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href='#' />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
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
