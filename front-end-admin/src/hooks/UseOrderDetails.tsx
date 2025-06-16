import { useEffect, useState } from 'react'
import { useParams } from '@tanstack/react-router'
import { getOrderById, OrderDTO } from '@/api/order'

export function useOrderDetails() {
  const [order, setOrder] = useState<OrderDTO | null>(null)
  const { id } = useParams({ from: '/_authenticated/orders/$id/details' })
  useEffect(() => {
    const loadOrder = async () => {
      const dto = await getOrderById(Number(id))
      setOrder(dto.result)
      console.log('order: ', dto.result)
    }
    loadOrder()
  }, [id])
  return {
    order,
  }
}
