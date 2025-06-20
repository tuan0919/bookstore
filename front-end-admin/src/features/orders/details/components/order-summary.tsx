import { useOrderDetailsContext } from '@/context/OrderDetailsContext'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

export function OrderSummary() {
  const { order } = useOrderDetailsContext()
  const total = order?.totalAmount || 0
  const discount =
    (order?.totalAmount ?? 0) -
    (order?.totalAmount ?? 0) -
    (order?.items?.reduce((prev, cur) => prev + (cur.discount ?? 0), 0) ?? 0)
  const vat = (10 / 100) * (order?.totalAmount || 0)
  return (
    <Card className='rounded-none'>
      <CardHeader>
        <CardTitle>Tóm tắt đơn hàng</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='flex flex-col space-y-3'>
          <Separator className='invisible m-0 p-0' />
          <div className='flex items-center justify-between'>
            <span className='text-sm font-medium'>Tạm tính:</span>
            <span className='text-sm text-green-500'>
              {total.toLocaleString('vi')}đ
            </span>
          </div>
          <Separator />
          <div className='flex items-center justify-between'>
            <span className='text-sm font-medium'>Khuyến mãi:</span>
            <span className='text-sm text-yellow-500'>
              {discount.toLocaleString('vi')}đ
            </span>
          </div>
          <Separator />
          <div className='flex items-center justify-between'>
            <span className='text-sm font-medium'>VAT:</span>
            <span className='text-sm text-gray-500'>
              {vat.toLocaleString('vi')}đ (10%)
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter className='flex flex-col'>
        <div className='flex w-full items-center justify-between py-2'>
          <span className='text-sm font-medium'>Tổng tiền:</span>
          <span className='text-sm text-gray-500'>
            {(total + vat - discount).toLocaleString('vi')}đ
          </span>
        </div>
        <div className='flex w-full flex-col justify-between gap-2 py-2'>
          <span className='font-medium'>Hình thức thanh toán:</span>
          <span className='font-medium text-green-500'>
            {order?.paymentMethodName}
          </span>
        </div>
      </CardFooter>
    </Card>
  )
}
