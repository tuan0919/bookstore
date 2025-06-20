import { OrderDTO } from '@/types/order'

export function OrderDateCell({ orderDate }) {
  return (
    <div className='flex justify-start'>
      <span>{orderDate}</span>
    </div>
  )
}
