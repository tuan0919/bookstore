import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export function CustomerInfo() {
  return (
    <Card className='rounded-none'>
      <CardHeader>
        <CardTitle>Thông tin khách hàng</CardTitle>
      </CardHeader>
      <CardContent className='flex flex-col space-y-3'>
        <div className='flex items-center gap-8'>
          <div className='h-12 w-12 overflow-hidden rounded-md bg-neutral-100 dark:bg-gray-700'>
            <img
              className='object-contain'
              src='https://techzaa.in/larkon/admin/assets/images/users/avatar-1.jpg'
            />
          </div>
          <div className='flex h-full flex-col justify-between'>
            <span className='font-inter text-sm font-semibold'>
              Nguyễn Quốc Anh Tuấn
            </span>
            <span className='text-sm text-green-500'>nqat0919@gmail.com</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className='flex flex-col items-start gap-3'>
        <div className='flex flex-col'>
          <span className='font-semibold'>Thông tin liên lạc</span>
          <span className='text-sm text-gray-500'>(+84) 0936 565 257</span>
        </div>
        <div className='flex flex-col'>
          <span className='font-semibold'>Địa chỉ giao hàng</span>
          <span className='text-sm text-gray-500'>
            123 Đường ABC, Quận 1, Linh Trung, HCM, Việt Nam
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
