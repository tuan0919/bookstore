import { usePromotionNewContext } from '@/context/PromotionNewContext'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { CategorySelector } from './category-select'

export function LeftCard() {
  const {
    categoryIds,
    setCategoryIds,
    promotionName,
    setPromotionName,
    discountPercentage,
    setDiscountPercentage,
    submit,
  } = usePromotionNewContext()
  return (
    <Card>
      <CardContent>
        <div className='mb-3 font-semibold'>Thông tin khuyến mãi</div>
        <div className='grid grid-cols-2 gap-4'>
          {/* Mã khuyến mãi */}
          <div className='grid gap-2'>
            <div className='font-manrope text-sm'>Tên chương trình</div>
            <Input
              value={promotionName}
              onChange={(ev) => setPromotionName(ev.target.value)}
              placeholder='Ví dụ: khuyến mãi mùa hè 2025'
            />
          </div>
          {/* Giá trị */}
          <div className='grid gap-2'>
            <div className='font-manrope text-sm'>Giá trị giảm giá</div>
            <Input
              value={discountPercentage}
              type='number'
              onChange={(ev) => setDiscountPercentage(Number(ev.target.value))}
            />
          </div>
          {/* Áp dụng cho */}
          <div className='col-span-2 grid gap-2'>
            <div className='font-manrope text-sm'>Áp dụng cho</div>
            <div className='flex gap-2'>
              <CategorySelector
                value={categoryIds}
                onChange={function (ids: number[]): void {
                  setCategoryIds([...ids])
                }}
              />
            </div>
          </div>
          <div className='col-span 2 mt-3' onClick={submit}>
            <Button variant='default'>Tạo khuyến mãi</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
