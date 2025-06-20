import { OrderDTO } from '@/types/order'

export function TotalAmountCell({ totalAmount }) {
  return (
    <div className='flex items-center gap-2'>
      <span className='font-light'>
        {totalAmount.toLocaleString('Vi') + 'đ'}
      </span>
    </div>
  )
}
