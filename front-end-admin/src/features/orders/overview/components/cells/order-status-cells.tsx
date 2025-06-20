import { OrderDTO } from '@/types/order'
import { Badge } from '@/components/ui/badge'

export function StatusCell({ status }) {
  return (
    <Badge>
      <span className='font-bold text-green-500'>{status.toUpperCase()}</span>
    </Badge>
  )
}
