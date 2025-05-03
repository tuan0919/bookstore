import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/orders/new')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_authenticated/orders/new"!</div>
}
