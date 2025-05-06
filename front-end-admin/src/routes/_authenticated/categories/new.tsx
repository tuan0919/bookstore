import { createFileRoute } from '@tanstack/react-router'
import CategoryNew from '@/features/categories/new'

export const Route = createFileRoute('/_authenticated/categories/new')({
  component: CategoryNew,
})
