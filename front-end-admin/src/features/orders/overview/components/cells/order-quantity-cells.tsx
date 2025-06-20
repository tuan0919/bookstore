import { OrderDTO } from '@/types/order'

export function QuantityCell({ items }) {
  const total = items.reduce((prev, cur) => prev + cur.quantity, 0)
  return <span className='font-light'>{total}</span>
}
