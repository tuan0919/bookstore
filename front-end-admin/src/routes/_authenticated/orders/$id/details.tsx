import { createFileRoute } from '@tanstack/react-router'
import OrderDetails from '@/features/orders/details'

export const Route = createFileRoute('/_authenticated/orders/$id/details')({
  component: RouteComponent,
})

function RouteComponent() {
  return <OrderDetails />
}
