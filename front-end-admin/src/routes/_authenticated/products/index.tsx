import { createFileRoute } from '@tanstack/react-router'
import Product from '@/features/products'

export const Route = createFileRoute('/_authenticated/products/')({
  component: Product,
})
