import * as React from 'react'
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { IconCircleDashed } from '@tabler/icons-react'
import { OrderItem } from '@/types/order'
import { useOrderDetailsContext } from '@/context/OrderDetailsContext'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

export type Payment = {
  id: string
  name: string
  price: number
  quantity: number
  thumbnail: string
  discount: number
}

const columns: ColumnDef<OrderItem>[] = [
  {
    header: 'Tên & ảnh sản phẩm',
    cell: ({ row }) => {
      const { bookTitle, img } = row.original as OrderItem
      return (
        <div className='flex items-center gap-2'>
          <img
            src={img}
            alt={bookTitle}
            className='h-15 w-15 rounded-sm border object-contain p-1'
          />
          <div className='w-[350px] truncate capitalize'>{bookTitle}</div>
        </div>
      )
    },
  },
  {
    header: 'Giá bán',
    cell: ({ row }) => {
      const { price } = row.original as OrderItem
      return (
        <div className='flex justify-start'>
          <span>{price.toLocaleString('VN') + 'đ'}</span>
        </div>
      )
    },
  },
  {
    header: 'Số lượng',
    cell: ({ row }) => {
      const { quantity } = row.original as OrderItem
      return <span className='font-light'>{quantity}</span>
    },
  },
  {
    header: 'Giảm giá',
    cell: ({ row }) => {
      const { price, discount } = row.original as OrderItem
      return (
        <div className='flex justify-start'>
          <span>{((discount * price) / 100).toLocaleString('VN') + 'đ'}</span>
        </div>
      )
    },
  },
  {
    header: 'Tạm tính',
    cell: ({ row }) => {
      const { quantity, price, discount } = row.original as OrderItem
      return (
        <div className='flex justify-start'>
          <span>
            {(price * quantity - (discount * price) / 100).toLocaleString(
              'VN'
            ) + 'đ'}
          </span>
        </div>
      )
    },
  },
]

export function OrderDetailsTable() {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
  const { order } = useOrderDetailsContext()
  const table = useReactTable({
    data: order?.items || [],
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <Card className='rounded-none'>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <span className='mr-3 underline underline-offset-2'>
            #{order?.orderId || 0}
          </span>
          <Badge variant='outline'>
            <IconCircleDashed size={16} />
            <span className='font-bold uppercase'>{order?.status}</span>
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className='w-full'>
          <div className='rounded-md border'>
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </TableHead>
                      )
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && 'selected'}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className='h-24 text-center'
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
