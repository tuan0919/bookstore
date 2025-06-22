import { createFileRoute } from '@tanstack/react-router'
import CustomerDetails from '@/features/customers/details'

export const Route = createFileRoute('/_authenticated/customers/$id/details')({
  component: CustomerDetails,
})
