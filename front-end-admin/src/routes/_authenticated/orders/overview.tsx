import { createFileRoute } from '@tanstack/react-router'
import Order from '@/features/orders'

export const Route = createFileRoute('/_authenticated/orders/overview')({
  component: Order,
})
