import 'suneditor/dist/css/suneditor.min.css'
import { useProductNew } from '@/hooks/UseProductNew'
// Import React FilePond
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import LeftColumn from './components/left-column'
import RightColumn from './components/right-column'

export default function New() {
  const { uploadToServer } = useProductNew()
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
        <div className='mb-2 flex items-center justify-between space-y-2'>
          <h1 className='text-2xl font-bold tracking-tight'>
            Thêm sản phẩm mới
          </h1>
        </div>
        <Card className='rounded-none'>
          <form className='space-y-8'>
            <CardContent className='grid grid-cols-2 items-start gap-3'>
              <LeftColumn />
              <RightColumn />
            </CardContent>
            <CardFooter>
              <Button type='button' onClick={() => uploadToServer()}>
                Thêm sản phẩm mới
              </Button>
            </CardFooter>
          </form>
        </Card>
      </Main>
    </>
  )
}
