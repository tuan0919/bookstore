import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Slider } from '@/components/ui/slider'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { TopNav } from '@/components/layout/top-nav'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'

const formSchema = z.object({
  languages: z.string(),
  priceRange: z.number(),
})

export default function Dashboard() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      languages: '',
      priceRange: 100000,
    },
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {}

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
          <h1 className='text-2xl font-bold tracking-tight'>Dashboard</h1>
          <div className='flex items-center space-x-2'>
            <Button>Tải xuống</Button>
          </div>
        </div>
        <Tabs
          orientation='vertical'
          defaultValue='overview'
          className='space-y-4'
        >
          <div className='w-full overflow-x-auto pb-2'>
            <TabsList>
              <TabsTrigger value='overview'>Tổng quan</TabsTrigger>
              <TabsTrigger value='analytics' disabled>
                Phân tích
              </TabsTrigger>
              <TabsTrigger value='reports' disabled>
                Báo cáo
              </TabsTrigger>
              <TabsTrigger value='notifications' disabled>
                Thông báo
              </TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value='overview' className='space-y-4'>
            <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
              <Card className='w-full'>
                <CardHeader>
                  <CardTitle>Lọc sản phẩm</CardTitle>
                  <CardDescription>
                    Lọc sản phẩm theo tiêu chí khác nhau
                  </CardDescription>
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
                      <FormLabel className='text-base'>Chọn giá tiền</FormLabel>
                      <FormField
                        control={form.control}
                        name='priceRange'
                        render={({ field }) => (
                          <Slider defaultValue={[50]} max={100} step={1} />
                        )}
                      />
                      <Button type='submit'>Submit</Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
              <div className='col-span-3 bg-blue-200'>Cột 2</div>
            </div>
            <div className='grid grid-cols-1 gap-4 lg:grid-cols-7'>
              <Card className='col-span-1 lg:col-span-4'>
                <CardHeader>
                  <CardTitle>Tổng quan</CardTitle>
                </CardHeader>
                <CardContent className='pl-2'>CardContent</CardContent>
              </Card>
              <Card className='col-span-1 lg:col-span-3'>
                <CardHeader>
                  <CardTitle>Đơn hàng gần đây</CardTitle>
                  <CardDescription>
                    Cửa hàng của bạn đã bán được 256 đơn trong tháng này.
                  </CardDescription>
                </CardHeader>
                <CardContent>CardContent</CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
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
