import { createFileRoute } from '@tanstack/react-router'
import CouponNew from '@/features/coupons/new'

export const Route = createFileRoute('/_authenticated/coupons/new')({
  component: CouponNew,
})
