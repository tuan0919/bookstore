import { Card, CardContent } from '@/components/ui/card'
import { DatePickerWithRange } from '@/features/coupons/new/components/date-picker'

export function RightCard() {
  return (
    <div className='grid gap-4'>
      <Card>
        <CardContent className='flex items-center justify-between'>
          <div className='grid gap-1'>
            <div className='font-semibold'>Thời hạn</div>
            <DatePickerWithRange />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
