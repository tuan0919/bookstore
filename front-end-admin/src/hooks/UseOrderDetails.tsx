import { useEffect, useState } from 'react'
import { useParams } from '@tanstack/react-router'
import { OrderDTO, OrderTimeline } from '@/types/order'
import { getOrderById, getOrderTimeline } from '@/api/order'

export function useOrderDetails() {
  const [order, setOrder] = useState<OrderDTO | null>(null)
  const { id } = useParams({ from: '/_authenticated/orders/$id/details' })
  const [timeline, setTimeline] = useState<OrderTimeline | null>(null)
  useEffect(() => {
    const loadOrder = async () => {
      const dto = await getOrderById(Number(id))
      const tl = await getOrderTimeline(Number(id))
      setOrder(dto.result)
      setTimeline(tl.result)
    }
    loadOrder()
  }, [id])
  return {
    order,
    timeline,
  }
}
