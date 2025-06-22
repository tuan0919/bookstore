import { DashboardContextProvider } from '@/context/DashboardContext'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { Piechart } from './components/pie-chart'
import { RecentSales } from './components/recent-sales'
import { SaleChart } from './components/sale-chart'
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
            defaultValue='monthly'
            className='space-y-4'
          >
            <div className='w-full overflow-x-auto pb-2'>
              <TabsList>
                <TabsTrigger value='monthly'>Doanh thu tháng</TabsTrigger>
                <TabsTrigger value='piechart'>Tỉ lệ mua hàng</TabsTrigger>
              </TabsList>
            </div>
            <DashboardSummary />
            <div className='grid grid-cols-1 gap-4 lg:grid-cols-7'>
              <TabsContent value='monthly' className='col-span-1 lg:col-span-4'>
                <Card>
                  <CardHeader>
                    <CardTitle>Doanh thu tháng</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <SaleChart />
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent
                value='piechart'
                className='col-span-1 lg:col-span-4'
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Tỉ lệ mua hàng</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Piechart />
                  </CardContent>
                </Card>
              </TabsContent>
              <RecentSales />
            </div>
          </Tabs>
        </DashboardContextProvider>
      </Main>
    </>
  )
}
