import { IconCircleCheck } from '@tabler/icons-react'
import { useOrderDetailsContext } from '@/context/OrderDetailsContext'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

export function OrderTimeLine() {
  const { timeline } = useOrderDetailsContext()
  return (
    <Card className='rounded-none'>
      <CardHeader>
        <CardTitle>Timeline đơn hàng</CardTitle>
      </CardHeader>
      <Separator />
      <CardContent>
        <div className='relative ml-2 flex flex-col space-y-12'>
          <div className='absolute top-0 left-0 h-full w-[1.5px] bg-neutral-100 dark:bg-gray-700' />
          {timeline?.timelines.map((tl) => (
            <div className='relative ps-16'>
              <div className='absolute top-0 left-0 flex h-10 w-10 -translate-x-5 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700'>
                <IconCircleCheck className='text-green-500' size={20} />
              </div>
              <div className='flex items-center justify-between'>
                <div className='flex flex-col gap-2'>
                  <span className='font-medium'>{tl.name}</span>
                  <span className='text-sm font-light'>{tl.description}</span>
                </div>
                <span className='text-sm'>{tl.createdAt}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
