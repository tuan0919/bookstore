import { createFileRoute } from '@tanstack/react-router'
import Edit from '@/features/products/edit'

export const Route = createFileRoute('/_authenticated/products/$id/edit')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Edit />
}
