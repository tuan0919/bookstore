import { createFileRoute } from '@tanstack/react-router'
import OrderOverview from '@/features/orders/overview'

export const Route = createFileRoute('/_authenticated/orders/overview')({
  component: OrderOverview,
})
