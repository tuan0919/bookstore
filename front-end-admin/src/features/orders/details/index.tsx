import { IconCircleCheck } from '@tabler/icons-react'
import { Search } from 'lucide-react'
import { OrderDetailsProvider } from '@/context/OrderDetailsContext'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { ThemeSwitch } from '@/components/theme-switch'
import { CustomerInfo } from './components/order-customer-info'
import { OrderDetailsTable } from './components/order-details-data-datable'
import { OrderSummary } from './components/order-summary'
import { OrderTimeLine } from './components/order-timeline'

export default function OrderDetails() {
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
        <OrderDetailsProvider>
          <div className='mb-4 flex items-center justify-between'>
            <h1 className='text-2xl font-bold tracking-tight'>
              Chi tiết đơn hàng
            </h1>
          </div>
          <div className='grid grid-cols-4 gap-x-4'>
            <div className='col-span-3 flex w-full flex-col justify-start gap-4'>
              <OrderDetailsTable />
              <OrderTimeLine />
            </div>
            <div className='flex w-full flex-col space-y-4'>
              <OrderSummary />
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
              <CustomerInfo />
            </div>
          </div>
        </OrderDetailsProvider>
      </Main>
    </>
  )
}
