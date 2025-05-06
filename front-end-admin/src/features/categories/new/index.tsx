import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Card, CardContent } from '@/components/ui/card'
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
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { TopNav } from '@/components/layout/top-nav'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'

const formSchema = z.object({
  name: z.string({
    required_error: 'Không được để trống',
  }),
  parentId: z.string({
    message: 'Không được để trống',
  }),
})

export default function CategoryNew() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  })
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
        <div className='mb-4 flex items-center justify-between'>
          <h1 className='text-2xl font-bold tracking-tight'>
            Thêm danh mục mới
          </h1>
        </div>
        <div className=''>
          <Card>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(() => {})}
                className='space-y-4'
              >
                <CardContent className='flex gap-5'>
                  <FormField
                    control={form.control}
                    name='name'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tên danh mục</FormLabel>
                        <FormControl>
                          <Input
                            placeholder='Nhập tên danh mục...'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='parentId'
                    render={() => (
                      <FormItem>
                        <FormLabel>Danh mục cha</FormLabel>
                        <Select defaultValue='none'>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className='w-full'>
                            <SelectItem value='none'>
                              Không (danh mục gốc)
                            </SelectItem>
                            <SelectItem value='vi'>
                              Truyện tiếng việt
                            </SelectItem>
                            <SelectItem value='other'>
                              Truyện nước ngoài
                            </SelectItem>
                            <SelectItem value='manga'>Truyện tranh</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </form>
            </Form>
          </Card>
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
