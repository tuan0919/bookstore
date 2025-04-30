import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { IconUpload } from '@tabler/icons-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
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
  name: z.string().nonempty({
    message: 'Tên sản phẩm không được phép để trống!',
  }),
  description: z.string().nonempty({
    message: 'Mô tả sản phẩm không được phép để trống!',
  }),
  provider: z.number().nonnegative({
    message: 'Phải chọn nhà cung cấp cho sản phẩm!',
  }),
  language: z.string(),
})

export default function New() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      provider: -1,
      language: 'vn',
    },
  })
  function onSubmit() {}
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
                      name='name'
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
                    <FormField
                      control={form.control}
                      name='provider'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nhà cung cấp</FormLabel>
                          <Select
                            onValueChange={(val) => field.onChange(Number(val))}
                            defaultValue='0'
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value='0'>Nhà cung cấp 1</SelectItem>
                              <SelectItem value='1'>Nhà cung cấp 2</SelectItem>
                              <SelectItem value='2'>Nhà cung cấp 3</SelectItem>
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
                            onValueChange={(val) => field.onChange(Number(val))}
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
                                      <Card className='rounded-none p-0'>
                                        <CardContent className='flex aspect-square cursor-pointer items-center justify-center bg-gray-300'>
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
