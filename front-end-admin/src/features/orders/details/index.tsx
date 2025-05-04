import {
  IconCheck,
  IconCircleCheck,
  IconCircleDashed,
  IconDownload,
  IconTruck,
} from '@tabler/icons-react'
import { Search } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { TopNav } from '@/components/layout/top-nav'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { ThemeSwitch } from '@/components/theme-switch'
import { OrderDetailsTable } from './components/order-details-data-datable'

export default function OrderDetails() {
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
            Chi tiết đơn hàng
          </h1>
        </div>
        <div className='grid grid-cols-4 gap-x-4'>
          <div className='col-span-3 flex w-full flex-col justify-start gap-4'>
            <Card className='rounded-none'>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                  <span className='mr-3 underline underline-offset-2'>
                    #0758267/90
                  </span>
                  <Badge variant='outline'>
                    <IconCheck size={16} />
                    <span className='font-bold uppercase'>Đã thanh toán</span>
                  </Badge>
                  <Badge variant='outline'>
                    <IconCircleDashed size={16} />
                    <span className='font-bold uppercase'>đang giao</span>
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <OrderDetailsTable />
              </CardContent>
            </Card>
            <Card className='rounded-none'>
              <CardHeader>
                <CardTitle>Timeline đơn hàng</CardTitle>
              </CardHeader>
              <Separator />
              <CardContent>
                <div className='relative ml-2 flex flex-col space-y-12'>
                  <div className='absolute top-0 left-0 h-full w-[1.5px] bg-neutral-100' />
                  <div className='relative ps-16'>
                    <div className='absolute top-0 left-0 flex h-10 w-10 -translate-x-5 items-center justify-center rounded-full bg-gray-100'>
                      <IconTruck className='text-yellow-500' size={20} />
                    </div>
                    <div className='flex items-center justify-between'>
                      <div className='flex flex-col gap-2'>
                        <span className='font-medium'>Đang giao hàng</span>
                        <span className='text-sm font-light'>
                          Shiper đang giao hàng đến địa chỉ: 123 Đường ABC, Quận
                          1, Linh Trung, HCM, Việt Nam
                        </span>
                      </div>
                      <span className='text-sm'>23 th4, 2025 - 09:40 AM</span>
                    </div>
                  </div>
                  <div className='relative ps-16'>
                    <div className='absolute top-0 left-0 flex h-10 w-10 -translate-x-5 items-center justify-center rounded-full bg-gray-100'>
                      <IconCircleCheck className='text-green-500' size={20} />
                    </div>
                    <div className='flex items-center justify-between'>
                      <div className='flex flex-col gap-2'>
                        <span className='font-medium'>
                          Hóa đơn được gửi đến khách hàng
                        </span>
                        <span className='text-sm font-light'>
                          Hệ thống gửi hóa đơn đến khách hàng qua email{' '}
                          <span className='font-medium text-blue-500'>
                            nqat0919@gmail.com
                          </span>
                        </span>
                      </div>
                      <span className='text-sm'>23 th4, 2025 - 09:40 AM</span>
                    </div>
                  </div>
                  <div className='relative ps-16'>
                    <div className='absolute top-0 left-0 flex h-10 w-10 -translate-x-5 items-center justify-center rounded-full bg-gray-100'>
                      <IconCircleCheck className='text-green-500' size={20} />
                    </div>
                    <div className='flex items-center justify-between'>
                      <div className='flex flex-col gap-2'>
                        <span className='font-medium'>Hóa đơn đã được tạo</span>
                        <Button variant='outline' size={'sm'} className='w-fit'>
                          <IconDownload />
                          <span>Tải hóa đơn</span>
                        </Button>
                      </div>
                      <span className='text-sm'>23 th4, 2025 - 09:40 AM</span>
                    </div>
                  </div>
                  <div className='relative ps-16'>
                    <div className='absolute top-0 left-0 flex h-10 w-10 -translate-x-5 items-center justify-center rounded-full bg-gray-100'>
                      <IconCircleCheck className='text-green-500' size={20} />
                    </div>
                    <div className='flex items-center justify-between'>
                      <div className='flex flex-col gap-2'>
                        <span className='font-medium'>
                          Khách hàng đã thanh toán
                        </span>
                        <span className='text-sm font-light'>
                          Khách hàng thanh toán bằng thẻ Master Card với mã giao
                          dịch: #IDN768139059
                        </span>
                      </div>
                      <span className='text-sm'>23 th4, 2025 - 09:40 AM</span>
                    </div>
                  </div>
                  <div className='relative ps-16'>
                    <div className='absolute top-0 left-0 flex h-10 w-10 -translate-x-5 items-center justify-center rounded-full bg-gray-100'>
                      <IconCircleCheck className='text-green-500' size={20} />
                    </div>
                    <div className='flex items-center justify-between'>
                      <div className='flex flex-col gap-2'>
                        <span className='font-medium'>
                          Đơn hàng đã được tạo
                        </span>
                        <span className='text-sm font-light'>
                          Khách xác nhận đơn hàng có ID #0758267/90
                        </span>
                      </div>
                      <span className='text-sm'>23 th4, 2025 - 09:40 AM</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className='flex w-full flex-col space-y-4'>
            <Card className='rounded-none'>
              <CardHeader>
                <CardTitle>Tóm tắt đơn hàng</CardTitle>
              </CardHeader>
              <CardContent>
                <div className='flex flex-col space-y-3'>
                  <Separator className='invisible m-0 p-0' />
                  <div className='flex items-center justify-between'>
                    <span className='text-sm font-medium'>Tạm tính:</span>
                    <span className='text-sm text-green-500'>237.000đ</span>
                  </div>
                  <Separator />
                  <div className='flex items-center justify-between'>
                    <span className='text-sm font-medium'>Khuyến mãi:</span>
                    <span className='text-sm text-yellow-500'>-30.000đ</span>
                  </div>
                  <Separator />
                  <div className='flex items-center justify-between'>
                    <span className='text-sm font-medium'>Phí vận chuyển:</span>
                    <span className='text-sm text-gray-500'>10.000đ</span>
                  </div>
                  <Separator />
                  <div className='flex items-center justify-between'>
                    <span className='text-sm font-medium'>VAT:</span>
                    <span className='text-sm text-gray-500'>23.700đ (10%)</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <div className='flex w-full items-center justify-between py-2'>
                  <span className='text-sm font-medium'>Tổng tiền:</span>
                  <span className='text-sm text-gray-500'>241.000đ</span>
                </div>
              </CardFooter>
            </Card>
            <Card className='rounded-none'>
              <CardHeader>
                <CardTitle>Thông tin thanh toán</CardTitle>
              </CardHeader>
              <CardContent className='flex flex-col space-y-3'>
                <div className='flex items-center justify-between'>
                  <span className='text-sm font-medium'>
                    Hình thức thanh toán:
                  </span>
                  <span className='text-sm text-green-500'>Chuyển khoản</span>
                </div>
                <div className='flex items-center justify-between py-2'>
                  <div className='h-12 w-12 rounded-full bg-neutral-100 p-2 dark:bg-gray-700'>
                    <img
                      width={'100%'}
                      src='https://techzaa.in/larkon/admin/assets/images/card/mastercard.svg'
                    />
                  </div>
                  <div className='flex h-full flex-col justify-between'>
                    <span className='font-inter text-sm'>Master Card</span>
                    <span className='font-mono text-sm text-gray-500'>
                      xxxx xxxx xxxx 7812
                    </span>
                  </div>
                  <IconCircleCheck className='text-green-500' size={25} />
                </div>
              </CardContent>
              <CardFooter className='flex flex-col items-start gap-3'>
                <div className='flex gap-2'>
                  <span className='text-sm'>Mã giao dịch:</span>
                  <span className='font-mono text-sm text-gray-500'>
                    #IDN768139059
                  </span>
                </div>
                <div className='flex gap-2'>
                  <span className='text-sm'>Tên chủ thẻ:</span>
                  <span className='font-mono text-sm text-gray-500'>
                    NGUYEN QUOC ANH TUAN
                  </span>
                </div>
              </CardFooter>
            </Card>
            <Card className='rounded-none'>
              <CardHeader>
                <CardTitle>Thông tin khách hàng</CardTitle>
              </CardHeader>
              <CardContent className='flex flex-col space-y-3'>
                <div className='flex items-center gap-8'>
                  <div className='h-12 w-12 overflow-hidden rounded-md bg-neutral-100 dark:bg-gray-700'>
                    <img
                      className='object-contain'
                      src='https://techzaa.in/larkon/admin/assets/images/users/avatar-1.jpg'
                    />
                  </div>
                  <div className='flex h-full flex-col justify-between'>
                    <span className='font-inter text-sm font-semibold'>
                      Nguyễn Quốc Anh Tuấn
                    </span>
                    <span className='text-sm text-green-500'>
                      nqat0919@gmail.com
                    </span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className='flex flex-col items-start gap-3'>
                <div className='flex flex-col'>
                  <span className='font-semibold'>Thông tin liên lạc</span>
                  <span className='text-sm text-gray-500'>
                    (+84) 0936 565 257
                  </span>
                </div>
                <div className='flex flex-col'>
                  <span className='font-semibold'>Địa chỉ giao hàng</span>
                  <span className='text-sm text-gray-500'>
                    123 Đường ABC, Quận 1, Linh Trung, HCM, Việt Nam
                  </span>
                </div>
                <div className='flex flex-col'>
                  <span className='font-semibold'>Ghi chú</span>
                  <span className='text-sm text-gray-500'>Không có</span>
                </div>
              </CardFooter>
            </Card>
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
