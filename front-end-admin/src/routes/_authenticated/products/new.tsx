import { createFileRoute } from '@tanstack/react-router'
import NewProduct from '@/features/products/new'

export const Route = createFileRoute('/_authenticated/products/new')({
  component: NewProduct,
})
