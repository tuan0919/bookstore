import { useDashboardContext } from '@/context/DashboardContext'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export function RecentSales() {
  const { recentlyOrder } = useDashboardContext()
  return (
    <Card className='col-span-1 lg:col-span-3'>
      <CardHeader>
        <CardTitle>Đơn hàng gần đây</CardTitle>
        <CardDescription>
          Cửa hàng của bạn đã bán được {recentlyOrder?.totalOrdersInMonth} đơn
          trong tháng này.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className='space-y-8'>
          {recentlyOrder?.recentlyOrders.map((order) => (
            <div className='flex items-center gap-4'>
              <Avatar className='h-9 w-9'>
                <AvatarImage src='/avatars/01.png' alt='Avatar' />
                <AvatarFallback>{order.username.slice(0, 2)}</AvatarFallback>
              </Avatar>
              <div className='flex flex-1 flex-wrap items-center justify-between'>
                <div className='space-y-1'>
                  <p className='text-sm leading-none font-medium'>
                    {order.username}
                  </p>
                  <p className='text-muted-foreground text-sm'>{order.email}</p>
                </div>
                <div className='font-medium'>
                  +{order.totalAmount.toLocaleString('vi')}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
