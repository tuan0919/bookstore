import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
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
import { Slider } from '@/components/ui/slider'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { TopNav } from '@/components/layout/top-nav'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { DataTableDemo } from './components/product-data-datable'

const formSchema = z.object({
  languages: z.string().array(),
  priceRange: z.number(),
  genres: z.string().array(),
})

export default function Product() {
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
  function onSubmit(_: z.infer<typeof formSchema>) {}
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
                    render={() => (
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
                    render={() => (
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
                    render={() => (
                      <Slider defaultValue={[50]} max={100} step={1} />
                    )}
                  />
                  <Button type='submit'>Lọc</Button>
                </form>
              </Form>
            </CardContent>
          </Card>
          <div className='col-span-3 flex-col'>
            <DataTableDemo />
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
