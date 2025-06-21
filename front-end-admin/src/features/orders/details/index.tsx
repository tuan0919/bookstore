import { Search } from 'lucide-react'
import { OrderDetailsProvider } from '@/context/OrderDetailsContext'
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
              <CustomerInfo />
            </div>
          </div>
        </OrderDetailsProvider>
      </Main>
    </>
  )
}
