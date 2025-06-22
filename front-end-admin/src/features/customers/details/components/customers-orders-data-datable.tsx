import { useNavigate } from '@tanstack/react-router'
import {
  ColumnDef,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  flexRender,
} from '@tanstack/react-table'
import { OrderDTO } from '@/types/order'
import { useCustomerDetailsContext } from '@/context/CustomerDetailsContext'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from '@/components/ui/table'

export function CustomersOrdersTable() {
  const { orders } = useCustomerDetailsContext()
  const navigate = useNavigate()
  const columns: ColumnDef<OrderDTO>[] = [
    {
      header: 'Mã',
      accessorKey: 'orderId',
    },
    {
      header: 'Trạng thái',
      cell: ({ row }) => {
        const { status } = row.original as OrderDTO
        return <Badge>{status}</Badge>
      },
    },
    {
      header: 'Tổng tiền',
      cell: ({ row }) => {
        const { totalAmount } = row.original as OrderDTO
        return <div>{totalAmount.toLocaleString('vi')}đ</div>
      },
    },
    {
      header: 'Ngày đặt hàng',
      accessorKey: 'orderDate',
    },
    {
      header: 'Phương thức',
      accessorKey: 'paymentMethodName',
    },
  ]

  const table = useReactTable({
    data: orders,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  return (
    <div className='w-full'>
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  onClick={() =>
                    navigate({
                      to: '/orders/$id/details',
                      params: { id: row.original.orderId + '' },
                    })
                  }
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
                <TableCell colSpan={columns.length} className='text-center'>
                  Không có dữ liệu
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className='flex justify-end gap-2 py-4'>
        <Button
          variant='outline'
          size='sm'
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Trước
        </Button>
        <Button
          variant='outline'
          size='sm'
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Sau
        </Button>
      </div>
    </div>
  )
}
