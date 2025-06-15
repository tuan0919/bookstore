import { useEffect } from 'react'
import { useParams } from '@tanstack/react-router'
import { useProductEditContext } from '@/context/ProductEditContext'
import { Button } from '@/components/ui/button'

export function ButtomSubmit() {
  const { id } = useParams({ from: '/_authenticated/products/$id/edit' })
  const { updateOnServer, fetchBookData } = useProductEditContext()
  useEffect(() => {
    fetchBookData(Number(id))
  }, [])
  return (
    <Button type='button' onClick={() => updateOnServer(Number(id))}>
      Cập nhật
    </Button>
  )
}
