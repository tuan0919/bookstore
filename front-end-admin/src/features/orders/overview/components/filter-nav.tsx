import React from 'react'
import { IconSearch } from '@tabler/icons-react'
import { ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { DatePickerWithRange } from './date-picker'

export function FilterNav() {
  const statusFilter = React.useMemo(
    () => [
      {
        id: '1',
        value: 'Đang xử lý',
        quantity: 21,
      },
      {
        id: '2',
        value: 'Đang giao',
        quantity: 51,
      },
      {
        id: '3',
        value: 'Đang hoàn trả',
        quantity: 72,
      },
      {
        id: '4',
        value: 'Hoàn thành',
        quantity: 101,
      },
      {
        id: '5',
        value: 'Đã hủy',
        quantity: 31,
      },
    ],
    []
  )
  const paymentStatus = React.useMemo(
    () => [
      {
        id: '1',
        value: 'Đã thanh toán',
        quantity: 21,
      },
      {
        id: '2',
        value: 'Chờ thanh toán',
        quantity: 51,
      },
      {
        id: '3',
        value: 'Chờ hoàn tiền',
        quantity: 72,
      },
    ],
    []
  )
  return (
    <div className='flex items-center py-4'>
      <div className='flex gap-2'>
        <DatePickerWithRange />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='outline' className='ml-auto'>
              Trạng thái <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            {statusFilter.map((column) => {
              return (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className='flex items-center'
                  checked={true}
                >
                  <span>{column.value}</span>
                  <span className='ml-1 text-xs text-orange-500 dark:text-green-500'>
                    {column.quantity}
                  </span>
                </DropdownMenuCheckboxItem>
              )
            })}
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='outline' className='ml-auto'>
              Thanh toán <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            {paymentStatus.map((column) => {
              return (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className='flex items-center'
                  checked={true}
                >
                  <span>{column.value}</span>
                  <span className='ml-1 text-xs text-orange-500 dark:text-green-500'>
                    {column.quantity}
                  </span>
                </DropdownMenuCheckboxItem>
              )
            })}
          </DropdownMenuContent>
        </DropdownMenu>
        <Button variant='outline' className='ml-[1rem] gap-1'>
          <IconSearch size={18} />
          Tìm kiếm
        </Button>
      </div>
    </div>
  )
}
