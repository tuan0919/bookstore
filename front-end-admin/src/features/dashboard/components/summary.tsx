import {
  IconShoppingBag,
  IconCurrencyDollar,
  IconUsers,
  IconBook2,
} from '@tabler/icons-react'
import { useDashboardContext } from '@/context/DashboardContext'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function DashboardSummary() {
  const { summary } = useDashboardContext()
  return (
    <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>Tổng doanh thu</CardTitle>
          <IconCurrencyDollar />
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
          <IconUsers />
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold'>
            +{summary?.customer.thisMonth} tháng này
          </div>
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
          <IconBook2 />
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
      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>Đơn hàng mới</CardTitle>
          <IconShoppingBag />
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold'>
            +{summary?.order.thisMonth} tháng này
          </div>
          <p className='text-muted-foreground text-xs'>
            +{summary?.order.diffPercent}% kể từ tháng trước
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
