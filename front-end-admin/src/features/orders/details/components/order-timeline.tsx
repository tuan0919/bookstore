import { IconCircleCheck, IconDownload, IconTruck } from '@tabler/icons-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

export function OrderTimeLine() {
  return (
    <Card className='rounded-none'>
      <CardHeader>
        <CardTitle>Timeline đơn hàng</CardTitle>
      </CardHeader>
      <Separator />
      <CardContent>
        <div className='relative ml-2 flex flex-col space-y-12'>
          <div className='absolute top-0 left-0 h-full w-[1.5px] bg-neutral-100 dark:bg-gray-700' />
          <div className='relative ps-16'>
            <div className='absolute top-0 left-0 flex h-10 w-10 -translate-x-5 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700'>
              <IconTruck className='text-yellow-500' size={20} />
            </div>
            <div className='flex items-center justify-between'>
              <div className='flex flex-col gap-2'>
                <span className='font-medium'>Đang giao hàng</span>
                <span className='text-sm font-light'>
                  Shiper đang giao hàng đến địa chỉ: 123 Đường ABC, Quận 1, Linh
                  Trung, HCM, Việt Nam
                </span>
              </div>
              <span className='text-sm'>23 th4, 2025 - 09:40 AM</span>
            </div>
          </div>
          <div className='relative ps-16'>
            <div className='absolute top-0 left-0 flex h-10 w-10 -translate-x-5 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700'>
              <IconCircleCheck className='text-green-500' size={20} />
            </div>
            <div className='flex items-center justify-between'>
              <div className='flex flex-col gap-2'>
                <span className='font-medium'>
                  Hóa đơn được gửi đến khách hàng
                </span>
                <span className='text-sm font-light'>
                  Hệ thống gửi hóa đơn đến khách hàng qua email{' '}
                  <span className='font-medium text-blue-500'>
                    nqat0919@gmail.com
                  </span>
                </span>
              </div>
              <span className='text-sm'>23 th4, 2025 - 09:40 AM</span>
            </div>
          </div>
          <div className='relative ps-16'>
            <div className='absolute top-0 left-0 flex h-10 w-10 -translate-x-5 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700'>
              <IconCircleCheck className='text-green-500' size={20} />
            </div>
            <div className='flex items-center justify-between'>
              <div className='flex flex-col gap-2'>
                <span className='font-medium'>Hóa đơn đã được tạo</span>
                <Button variant='outline' size={'sm'} className='w-fit'>
                  <IconDownload />
                  <span>Tải hóa đơn</span>
                </Button>
              </div>
              <span className='text-sm'>23 th4, 2025 - 09:40 AM</span>
            </div>
          </div>
          <div className='relative ps-16'>
            <div className='absolute top-0 left-0 flex h-10 w-10 -translate-x-5 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700'>
              <IconCircleCheck className='text-green-500' size={20} />
            </div>
            <div className='flex items-center justify-between'>
              <div className='flex flex-col gap-2'>
                <span className='font-medium'>Khách hàng đã thanh toán</span>
                <span className='text-sm font-light'>
                  Khách hàng thanh toán bằng thẻ Master Card với mã giao dịch:
                  #IDN768139059
                </span>
              </div>
              <span className='text-sm'>23 th4, 2025 - 09:40 AM</span>
            </div>
          </div>
          <div className='relative ps-16'>
            <div className='absolute top-0 left-0 flex h-10 w-10 -translate-x-5 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700'>
              <IconCircleCheck className='text-green-500' size={20} />
            </div>
            <div className='flex items-center justify-between'>
              <div className='flex flex-col gap-2'>
                <span className='font-medium'>Đơn hàng đã được tạo</span>
                <span className='text-sm font-light'>
                  Khách xác nhận đơn hàng có ID #0758267/90
                </span>
              </div>
              <span className='text-sm'>23 th4, 2025 - 09:40 AM</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
