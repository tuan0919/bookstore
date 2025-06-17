import {
  IconCash,
  IconCircleDashed,
  IconClockHour2,
  IconCreditCardRefund,
  IconMoodCheck,
  IconMoodSad2,
  IconTruckDelivery,
  IconTruckReturn,
} from '@tabler/icons-react'
import { Card } from '@/components/ui/card'

export function OrderOverall() {
  return (
    <>
      <Card className='rounded-sm border p-4'>
        <div className='flex items-center justify-between'>
          <div className='flex flex-col'>
            <h2 className='text-lg font-semibold'>Đang giao</h2>
            <p className='font-manrope text-lg font-medium text-gray-500'>
              630
            </p>
          </div>
          <div className='rounded-md bg-orange-100 p-4 dark:bg-gray-700'>
            <IconTruckDelivery
              className='text-orange-500 dark:text-gray-100'
              size={34}
            />
          </div>
        </div>
      </Card>
      <Card className='rounded-sm border p-4'>
        <div className='flex items-center justify-between'>
          <div className='flex flex-col'>
            <h2 className='text-lg font-semibold'>Đã thanh toán</h2>
            <p className='font-manrope text-lg font-medium text-gray-500'>
              172
            </p>
          </div>
          <div className='rounded-md bg-orange-100 p-4 dark:bg-gray-700'>
            <IconCash
              className='text-orange-500 dark:text-gray-100'
              size={34}
            />
          </div>
        </div>
      </Card>
      <Card className='rounded-sm border p-4'>
        <div className='flex items-center justify-between'>
          <div className='flex flex-col'>
            <h2 className='text-lg font-semibold'>Hoàn thành</h2>
            <p className='font-manrope text-lg font-medium text-gray-500'>
              213
            </p>
          </div>
          <div className='rounded-md bg-orange-100 p-4 dark:bg-gray-700'>
            <IconMoodCheck
              className='text-orange-500 dark:text-gray-100'
              size={34}
            />
          </div>
        </div>
      </Card>
      <Card className='rounded-sm border p-4'>
        <div className='flex items-center justify-between'>
          <div className='flex flex-col'>
            <h2 className='text-lg font-semibold'>Đang hoàn trả</h2>
            <p className='font-manrope text-lg font-medium text-gray-500'>12</p>
          </div>
          <div className='rounded-md bg-orange-100 p-4 dark:bg-gray-700'>
            <IconTruckReturn
              className='text-orange-500 dark:text-gray-100'
              size={34}
            />
          </div>
        </div>
      </Card>
      <Card className='rounded-sm border p-4'>
        <div className='flex items-center justify-between'>
          <div className='flex flex-col'>
            <h2 className='text-lg font-semibold'>Bị hủy</h2>
            <p className='font-manrope text-lg font-medium text-gray-500'>52</p>
          </div>
          <div className='rounded-md bg-orange-100 p-4 dark:bg-gray-700'>
            <IconMoodSad2
              className='text-orange-500 dark:text-gray-100'
              size={34}
            />
          </div>
        </div>
      </Card>
      <Card className='rounded-sm border p-4'>
        <div className='flex items-center justify-between'>
          <div className='flex flex-col'>
            <h2 className='text-lg font-semibold'>Chờ hoàn tiền</h2>
            <p className='font-manrope text-lg font-medium text-gray-500'>52</p>
          </div>
          <div className='rounded-md bg-orange-100 p-4 dark:bg-gray-700'>
            <IconCreditCardRefund
              className='text-orange-500 dark:text-gray-100'
              size={34}
            />
          </div>
        </div>
      </Card>
      <Card className='rounded-sm border p-4'>
        <div className='flex items-center justify-between'>
          <div className='flex flex-col'>
            <h2 className='text-lg font-semibold'>Chờ xử lý</h2>
            <p className='font-manrope text-lg font-medium text-gray-500'>5</p>
          </div>
          <div className='rounded-md bg-orange-100 p-4 dark:bg-gray-700'>
            <IconCircleDashed
              className='text-orange-500 dark:text-gray-100'
              size={34}
            />
          </div>
        </div>
      </Card>
      <Card className='rounded-sm border p-4'>
        <div className='flex items-center justify-between'>
          <div className='flex flex-col'>
            <h2 className='text-lg font-semibold'>Chờ thanh toán</h2>
            <p className='font-manrope text-lg font-medium text-gray-500'>73</p>
          </div>
          <div className='rounded-md bg-orange-100 p-4 dark:bg-gray-700'>
            <IconClockHour2
              className='text-orange-500 dark:text-gray-100'
              size={34}
            />
          </div>
        </div>
      </Card>
    </>
  )
}
