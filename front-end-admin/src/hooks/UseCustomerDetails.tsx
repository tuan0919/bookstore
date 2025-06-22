import { useEffect, useState } from 'react'
import { useParams } from '@tanstack/react-router'
import { SummaryAboutCustomerResponseDTO } from '@/types/chart'
import { OrderDTO } from '@/types/order'
import { getSummaryAboutCustomer } from '@/api/chart'
import { searchOrder } from '@/api/order'

export function useCustomerDetails() {
  const [summary, setSummary] = useState<
    SummaryAboutCustomerResponseDTO | undefined
  >()
  const [orders, setOrders] = useState<OrderDTO[]>([])
  const [page, setPage] = useState<number>(0)
  const [size, setSize] = useState<number>(5)
  const { id } = useParams({ from: '/_authenticated/customers/$id/details' })
  useEffect(() => {
    const fetchSummary = async () => {
      const res = await getSummaryAboutCustomer(Number(id))
      setSummary(res.result)
      const rOrders = await searchOrder({
        userId: Number(id),
        page,
        size,
      })
      setOrders(rOrders.result.content)
    }
    fetchSummary()
  }, [])
  return {
    summary,
    setSummary,
    orders,
    setOrders,
    size,
    setSize,
    page,
    setPage,
  }
}
