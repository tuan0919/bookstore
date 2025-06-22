import { useCustomerDetailsContext } from '@/context/CustomerDetailsContext'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

export function CustomerOverview() {
  const { userDetails } = useCustomerDetailsContext()
  return (
    <Card className='h-fit overflow-hidden p-0'>
      <div className='relative h-[3rem] w-full overflow-visible bg-gray-900'></div>
      <div className='grid gap-1 ps-2'>
        <div className='mb-2 font-medium'>{userDetails?.fullname}</div>
        <div className='font-manrope text-sm text-orange-400'>
          <a href='#'>@{userDetails?.username}</a>
        </div>
        <div className='flex gap-1'>
          <span className='text-sm font-medium'>Email:</span>
          <span className='text-sm font-light'>{userDetails?.email}</span>
        </div>
        <div className='flex gap-1'>
          <span className='text-sm font-medium'>Số điện thoại:</span>
          <span className='text-sm font-light'>
            (+84) {userDetails?.phoneNum}
          </span>
        </div>
      </div>
      <Separator />
      <div className='ps-2 pb-2'>
        <Button>Gửi tin nhắn</Button>
      </div>
    </Card>
  )
}
