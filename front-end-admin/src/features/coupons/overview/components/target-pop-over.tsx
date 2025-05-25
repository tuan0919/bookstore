import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

export function TargetPopOver() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size={'sm'} variant='outline'>
          Xem chi tiết
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-80'>
        <div className='grid gap-4'>
          <div className='space-y-2'>
            <h4 className='leading-none font-medium'>Danh mục sản phẩm</h4>
            <p className='text-muted-foreground text-sm'>
              Các danh mục sản phẩm sẽ được áp dụng khuyến mãi.
            </p>
          </div>
          <div className='flex flex-wrap gap-2'>
            <Badge variant='default'>Truyện tiếng việt</Badge>
            <Badge variant='default'>Truyện ngoại văn</Badge>
            <Badge variant='default'>Truyện tranh</Badge>
            <Badge variant='default'>Truyện tiếng Hàn</Badge>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
