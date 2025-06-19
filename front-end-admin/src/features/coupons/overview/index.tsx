import { PromotionOverviewProvider } from '@/context/PromotionOverviewContext'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { CouponDataTable } from './components/coupon-data-datable'

export default function CouponOverview() {
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
        <PromotionOverviewProvider>
          <div className='mb-4 flex items-center justify-between'>
            <h1 className='text-2xl font-bold tracking-tight'>
              Khuyến mãi trong cửa hàng
            </h1>
          </div>
          <div className=''>
            <CouponDataTable />
          </div>
        </PromotionOverviewProvider>
      </Main>
    </>
  )
}
