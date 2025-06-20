import { useOrderDetailsContext } from '@/context/OrderDetailsContext'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export function CustomerInfo() {
  const { order } = useOrderDetailsContext()
  return (
    <Card className='rounded-none'>
      <CardHeader>
        <CardTitle>Thông tin khách hàng</CardTitle>
      </CardHeader>
      <CardContent className='flex flex-col space-y-3'>
        <div className='flex items-center gap-8'>
          <div className='flex h-full flex-col justify-between'>
            <span className='font-inter text-sm font-semibold'>
              {order?.customer.username}
            </span>
            <span className='text-sm text-green-500'>
              {order?.customer.email}
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter className='flex flex-col items-start gap-3'>
        <div className='flex flex-col'>
          <span className='font-semibold'>Địa chỉ giao hàng</span>
          <span className='text-sm text-gray-500'>
            {order?.shippingAddress.addressLine1},{' '}
            {order?.shippingAddress.streetNumber}, {order?.shippingAddress.city}
          </span>
        </div>
        <div className='flex flex-col'>
          <span className='font-semibold'>Ghi chú</span>
          <span className='text-sm text-gray-500'>Không có</span>
        </div>
      </CardFooter>
    </Card>
  )
}
