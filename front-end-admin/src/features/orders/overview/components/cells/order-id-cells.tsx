import { OrderDTO } from '@/types/order'

export function OrderIdCell({ orderId }) {
  return (
    <div className='flex items-center gap-2'>
      <div className='capitalize'>{orderId}</div>
    </div>
  )
}
