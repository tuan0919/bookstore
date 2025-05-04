import { createFileRoute } from '@tanstack/react-router'
import OrderDetails from '@/features/orders/details'

export const Route = createFileRoute('/_authenticated/orders/details')({
  component: OrderDetails,
})
