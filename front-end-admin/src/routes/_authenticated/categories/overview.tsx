import { createFileRoute } from '@tanstack/react-router'
import CategoryOverview from '@/features/categories/overview'

export const Route = createFileRoute('/_authenticated/categories/overview')({
  component: CategoryOverview,
})
