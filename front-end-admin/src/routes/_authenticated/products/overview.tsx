import { createFileRoute } from '@tanstack/react-router'
import OverviewProduct from '@/features/products'

export const Route = createFileRoute('/_authenticated/products/overview')({
  component: OverviewProduct,
})
