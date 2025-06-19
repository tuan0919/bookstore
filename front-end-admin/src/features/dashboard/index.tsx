import { DashboardContextProvider } from '@/context/DashboardContext'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { Overview } from './components/overview'
import { RecentSales } from './components/recent-sales'
import { DashboardSummary } from './components/summary'

export default function Dashboard() {
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
        <DashboardContextProvider>
          <div className='mb-2 flex items-center justify-between space-y-2'>
            <h1 className='text-2xl font-bold tracking-tight'>Thống kê</h1>
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
              <DashboardSummary />
              <div className='grid grid-cols-1 gap-4 lg:grid-cols-7'>
                <Card className='col-span-1 lg:col-span-4'>
                  <CardHeader>
                    <CardTitle>Tổng quan</CardTitle>
                  </CardHeader>
                  <CardContent className='pl-2'>
                    <Overview />
                  </CardContent>
                </Card>
                <RecentSales />
              </div>
            </TabsContent>
          </Tabs>
        </DashboardContextProvider>
      </Main>
    </>
  )
}
