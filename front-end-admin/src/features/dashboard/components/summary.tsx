import { useDashboardContext } from '@/context/DashboardContext'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function DashboardSummary() {
  const { summary } = useDashboardContext()
  return (
    <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>Tổng doanh thu</CardTitle>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            className='text-muted-foreground h-4 w-4'
          >
            <path d='M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6' />
          </svg>
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold'>
            {summary?.profit.total.toLocaleString('vi')} vnđ
          </div>
          <p className='text-muted-foreground text-xs'>
            +{summary?.profit.diffPercent}% kể từ tháng trước
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>Khách hàng mới</CardTitle>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            className='text-muted-foreground h-4 w-4'
          >
            <path d='M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2' />
            <circle cx='9' cy='7' r='4' />
            <path d='M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75' />
          </svg>
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold'>+{summary?.customer.total}</div>
          <p className='text-muted-foreground text-xs'>
            +{summary?.customer.diffPercent}% kể từ tháng trước
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>
            Bán chạy nhất tháng này
          </CardTitle>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            className='text-muted-foreground h-4 w-4'
          >
            <rect width='20' height='14' x='2' y='5' rx='2' />
            <path d='M2 10h20' />
          </svg>
        </CardHeader>
        <CardContent>
          {summary?.mostSellInMonth ? (
            <div className='flex items-center gap-2'>
              <img
                src={summary?.mostSellInMonth.thumbnail}
                alt={summary?.mostSellInMonth.title}
                className='h-15 w-15 rounded-sm border object-contain p-1'
              />
              <div className='flex w-[400px] flex-col gap-2 truncate capitalize'>
                {summary?.mostSellInMonth.title}
                <div className='text-sm'>
                  Số lượng bán: {summary?.mostSellInMonth.soldAmount}
                </div>
              </div>
            </div>
          ) : (
            'Chưa có sản phẩm nào'
          )}
        </CardContent>
      </Card>
    </div>
  )
}
