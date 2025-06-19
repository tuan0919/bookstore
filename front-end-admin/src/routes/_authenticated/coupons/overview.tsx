import { createFileRoute } from '@tanstack/react-router'
import CouponOverview from '@/features/coupons/overview'

export const Route = createFileRoute('/_authenticated/coupons/overview')({
  component: CouponOverview,
})
