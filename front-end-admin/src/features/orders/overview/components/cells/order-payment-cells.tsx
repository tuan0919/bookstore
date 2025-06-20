import { OrderDTO } from '@/types/order'
import { Badge } from '@/components/ui/badge'

export function PaymentMethodCell({ paymentMethodName }) {
  return (
    <Badge>
      <span className='font-bold text-green-500'>{paymentMethodName}</span>
    </Badge>
  )
}
