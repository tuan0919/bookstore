import { OrderOverviewProvider } from '@/context/OrderOverviewContext'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { OrderDataTable } from './components/order-data-datable'
import { OrderOverall } from './components/order-overall'

export default function OrderOverview() {
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
        <OrderOverviewProvider>
          <div className='mb-4 flex items-center justify-between'>
            <h1 className='text-2xl font-bold tracking-tight'>
              Đơn hàng đã đặt
            </h1>
          </div>
          <div className='grid grid-cols-4 gap-4'>
            <OrderOverall />
          </div>
          <div className=''>
            <OrderDataTable />
          </div>
        </OrderOverviewProvider>
      </Main>
    </>
  )
}
