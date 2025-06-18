import { PromotionResponseDTO } from '@/types/promotion'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

export function TargetPopOver({
  promotion,
}: {
  promotion: PromotionResponseDTO
}) {
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
            {promotion.categories.map((category) => (
              <Badge key={category.categoryId} variant='default'>
                {category.categoryName}
              </Badge>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
