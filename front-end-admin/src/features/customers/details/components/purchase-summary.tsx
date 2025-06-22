import { IconCoin, IconFileInvoice } from '@tabler/icons-react'
import { useCustomerDetailsContext } from '@/context/CustomerDetailsContext'
import { Card } from '@/components/ui/card'

export function PurchaseSummary() {
  const { summary } = useCustomerDetailsContext()
  return (
    <div className='grid grid-cols-3 gap-4'>
      <Card className='rounded-sm border p-4'>
        <div className='flex items-center justify-between'>
          <div className='flex flex-col'>
            <h2 className='text-lg font-semibold'>Tổng số đơn</h2>
            <p className='font-manrope text-lg font-medium text-gray-500'>
              {summary?.totalOrders || 0}
            </p>
          </div>
          <div className='rounded-md bg-orange-100 p-4 dark:bg-gray-700'>
            <IconFileInvoice
              className='text-orange-500 dark:text-gray-100'
              size={34}
            />
          </div>
        </div>
      </Card>
      <Card className='rounded-sm border p-4'>
        <div className='flex items-center justify-between'>
          <div className='flex flex-col'>
            <h2 className='text-lg font-semibold'>Tổng chi tiêu</h2>
            <p className='font-manrope text-lg font-medium text-gray-500'>
              {(summary?.totalPayAmounts || 0).toLocaleString('vi')} vnđ
            </p>
          </div>
          <div className='rounded-md bg-orange-100 p-4 dark:bg-gray-700'>
            <IconCoin
              className='text-orange-500 dark:text-gray-100'
              size={34}
            />
          </div>
        </div>
      </Card>
    </div>
  )
}
