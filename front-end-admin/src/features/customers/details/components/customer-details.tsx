import { useCustomerDetailsContext } from '@/context/CustomerDetailsContext'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'

export function Details() {
  const { userDetails } = useCustomerDetailsContext()
  return (
    <Card className='px-6 py-4'>
      <div className='flex justify-between'>
        <div className='font-medium'>Chi tiết khách hàng</div>
        <Badge>{userDetails?.verified && 'Đã xác thực'}</Badge>
      </div>
      <div className='grid grid-cols-2 gap-2'>
        <span className='text-sm font-medium'>Mã khách hàng:</span>
        <span className='font-manrope text-sm font-light'>
          #{userDetails?.userId}
        </span>
        <span className='text-sm font-medium'>Địa chỉ email:</span>
        <span className='font-manrope text-sm font-light'>
          {userDetails?.email}
        </span>
        <span className='text-sm font-medium'>Địa chỉ cá nhân:</span>
        <span className='font-manrope text-sm font-light'>
          {userDetails?.defaultAddress}
        </span>
      </div>
    </Card>
  )
}
