import { ProductOverviewProvider } from '@/context/ProductOverviewContext'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { DataTableDemo } from './components/product-data-datable'

export default function Product() {
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
        <ProductOverviewProvider>
          <div className='mb-2 flex items-center justify-between space-y-2'>
            <h1 className='text-2xl font-bold tracking-tight'>
              Sản phẩm trong cửa hàng
            </h1>
          </div>
          <DataTableDemo />
        </ProductOverviewProvider>
      </Main>
    </>
  )
}
