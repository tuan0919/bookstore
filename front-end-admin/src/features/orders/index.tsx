import {
  IconCash,
  IconCircleDashed,
  IconClockHour2,
  IconCreditCardRefund,
  IconMoodCheck,
  IconMoodSad2,
  IconTruckDelivery,
  IconTruckReturn,
} from '@tabler/icons-react'
import { Card } from '@/components/ui/card'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { TopNav } from '@/components/layout/top-nav'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { OrderDataTable } from './components/order-data-datable'

export default function Order() {
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
          <h1 className='text-2xl font-bold tracking-tight'>Đơn hàng đã đặt</h1>
        </div>
        <div className='grid grid-cols-4 gap-4'>
          <Card className='rounded-sm border p-4'>
            <div className='flex items-center justify-between'>
              <div className='flex flex-col'>
                <h2 className='text-lg font-semibold'>Đang giao</h2>
                <p className='font-manrope text-lg font-medium text-gray-500'>
                  630
                </p>
              </div>
              <div className='rounded-md bg-orange-100 p-4 dark:bg-gray-700'>
                <IconTruckDelivery
                  className='text-orange-500 dark:text-gray-100'
                  size={34}
                />
              </div>
            </div>
          </Card>
          <Card className='rounded-sm border p-4'>
            <div className='flex items-center justify-between'>
              <div className='flex flex-col'>
                <h2 className='text-lg font-semibold'>Đã thanh toán</h2>
                <p className='font-manrope text-lg font-medium text-gray-500'>
                  172
                </p>
              </div>
              <div className='rounded-md bg-orange-100 p-4 dark:bg-gray-700'>
                <IconCash
                  className='text-orange-500 dark:text-gray-100'
                  size={34}
                />
              </div>
            </div>
          </Card>
          <Card className='rounded-sm border p-4'>
            <div className='flex items-center justify-between'>
              <div className='flex flex-col'>
                <h2 className='text-lg font-semibold'>Hoàn thành</h2>
                <p className='font-manrope text-lg font-medium text-gray-500'>
                  213
                </p>
              </div>
              <div className='rounded-md bg-orange-100 p-4 dark:bg-gray-700'>
                <IconMoodCheck
                  className='text-orange-500 dark:text-gray-100'
                  size={34}
                />
              </div>
            </div>
          </Card>
          <Card className='rounded-sm border p-4'>
            <div className='flex items-center justify-between'>
              <div className='flex flex-col'>
                <h2 className='text-lg font-semibold'>Đang hoàn trả</h2>
                <p className='font-manrope text-lg font-medium text-gray-500'>
                  12
                </p>
              </div>
              <div className='rounded-md bg-orange-100 p-4 dark:bg-gray-700'>
                <IconTruckReturn
                  className='text-orange-500 dark:text-gray-100'
                  size={34}
                />
              </div>
            </div>
          </Card>
          <Card className='rounded-sm border p-4'>
            <div className='flex items-center justify-between'>
              <div className='flex flex-col'>
                <h2 className='text-lg font-semibold'>Bị hủy</h2>
                <p className='font-manrope text-lg font-medium text-gray-500'>
                  52
                </p>
              </div>
              <div className='rounded-md bg-orange-100 p-4 dark:bg-gray-700'>
                <IconMoodSad2
                  className='text-orange-500 dark:text-gray-100'
                  size={34}
                />
              </div>
            </div>
          </Card>
          <Card className='rounded-sm border p-4'>
            <div className='flex items-center justify-between'>
              <div className='flex flex-col'>
                <h2 className='text-lg font-semibold'>Chờ hoàn tiền</h2>
                <p className='font-manrope text-lg font-medium text-gray-500'>
                  52
                </p>
              </div>
              <div className='rounded-md bg-orange-100 p-4 dark:bg-gray-700'>
                <IconCreditCardRefund
                  className='text-orange-500 dark:text-gray-100'
                  size={34}
                />
              </div>
            </div>
          </Card>
          <Card className='rounded-sm border p-4'>
            <div className='flex items-center justify-between'>
              <div className='flex flex-col'>
                <h2 className='text-lg font-semibold'>Chờ xử lý</h2>
                <p className='font-manrope text-lg font-medium text-gray-500'>
                  5
                </p>
              </div>
              <div className='rounded-md bg-orange-100 p-4 dark:bg-gray-700'>
                <IconCircleDashed
                  className='text-orange-500 dark:text-gray-100'
                  size={34}
                />
              </div>
            </div>
          </Card>
          <Card className='rounded-sm border p-4'>
            <div className='flex items-center justify-between'>
              <div className='flex flex-col'>
                <h2 className='text-lg font-semibold'>Chờ thanh toán</h2>
                <p className='font-manrope text-lg font-medium text-gray-500'>
                  73
                </p>
              </div>
              <div className='rounded-md bg-orange-100 p-4 dark:bg-gray-700'>
                <IconClockHour2
                  className='text-orange-500 dark:text-gray-100'
                  size={34}
                />
              </div>
            </div>
          </Card>
        </div>
        <div className=''>
          <OrderDataTable />
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
