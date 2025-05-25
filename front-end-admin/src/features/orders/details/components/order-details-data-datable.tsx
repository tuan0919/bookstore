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
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

const data: Payment[] = [
  {
    id: 'm5gr84i9',
    name: 'Dược sư tự sự (Manga) - Tập 13',
    quantity: 2,
    price: 39000,
    discount: 10,
    thumbnail:
      'https://nhasachphuongnam.com/images/detailed/277/manga-duoc-su-tu-su-tap-13.jpg',
  },
  {
    id: 'm5gr84i9',
    name: 'Dược sư tự sự (Manga) - Tập 13',
    quantity: 2,
    price: 39000,
    discount: 10,
    thumbnail:
      'https://nhasachphuongnam.com/images/detailed/277/manga-duoc-su-tu-su-tap-13.jpg',
  },
  {
    id: 'm5gr84i9',
    name: 'Dược sư tự sự (Manga) - Tập 13',
    quantity: 2,
    price: 39000,
    discount: 10,
    thumbnail:
      'https://nhasachphuongnam.com/images/detailed/277/manga-duoc-su-tu-su-tap-13.jpg',
  },
]

export type Payment = {
  id: string
  name: string
  price: number
  quantity: number
  thumbnail: string
  discount: number
}

const columns: ColumnDef<Payment>[] = [
  {
    header: 'Tên & ảnh sản phẩm',
    cell: ({ row }) => {
      const { thumbnail, name } = row.original as Payment
      return (
        <div className='flex items-center gap-2'>
          <img
            src={thumbnail}
            alt={name}
            className='h-15 w-15 rounded-sm border object-contain p-1'
          />
          <div className='capitalize'>{name}</div>
        </div>
      )
    },
  },
  {
    header: 'Giá bán',
    cell: ({ row }) => {
      const { price } = row.original as Payment
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
      const { quantity } = row.original as Payment
      return <span className='font-light'>{quantity}</span>
    },
  },
  {
    header: 'Giảm giá',
    cell: ({ row }) => {
      const { price, discount } = row.original as Payment
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
      const { quantity, price, discount } = row.original as Payment
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

  const table = useReactTable({
    data,
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
      <div className='flex items-center justify-end space-x-2 py-4'>
        <div className='space-x-2'>
          <Button
            variant='outline'
            size='sm'
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant='outline'
            size='sm'
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
