import * as React from 'react'
import { useNavigate } from '@tanstack/react-router'
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
import { OrderDTO } from '@/types/order'
import { useOrderOverviewContext } from '@/context/OrderOverviewContext'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { OrderActionsCell } from './cells/order-action-cells'
import { CustomerCell } from './cells/order-customer-cells'
import { OrderDateCell } from './cells/order-date-cells'
import { OrderIdCell } from './cells/order-id-cells'
import { PaymentMethodCell } from './cells/order-payment-cells'
import { QuantityCell } from './cells/order-quantity-cells'
import { StatusCell } from './cells/order-status-cells'
import { TotalAmountCell } from './cells/order-total-amount-cells'
import { FilterNav } from './filter-nav'

function getColumns(
  navigate: ReturnType<typeof useNavigate>
): ColumnDef<OrderDTO>[] {
  return [
    {
      header: 'Mã đơn hàng',
      cell: ({ row }) => <OrderIdCell orderId={row.original.orderId} />,
    },
    {
      header: 'Ngày đặt',
      cell: ({ row }) => <OrderDateCell orderDate={row.original.orderDate} />,
    },
    {
      header: 'Khách hàng',
      cell: ({ row }) => (
        <CustomerCell
          customerId={row.original.customer.user_id}
          customerName={row.original.customer.username}
        />
      ),
    },
    {
      header: 'Tổng tiền',
      cell: ({ row }) => (
        <TotalAmountCell totalAmount={row.original.totalAmount} />
      ),
    },
    {
      header: 'Thanh toán',
      cell: ({ row }) => (
        <PaymentMethodCell paymentMethodName={row.original.paymentMethodName} />
      ),
    },
    {
      header: 'Số lượng',
      cell: ({ row }) => <QuantityCell items={row.original.items} />,
    },
    {
      header: 'Trạng thái',
      cell: ({ row }) => <StatusCell status={row.original.status} />,
    },
    {
      id: 'actions',
      enableHiding: false,
      cell: ({ row }) => (
        <OrderActionsCell
          orderId={row.original.orderId}
          statusCode={row.original.statusCode}
          navigate={navigate}
          customerId={row.original.customer.user_id}
        />
      ),
    },
  ]
}

export function OrderDataTable() {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
  const { orders } = useOrderOverviewContext()
  const navigate = useNavigate()
  const columns = getColumns(navigate)
  const table = useReactTable({
    data: orders,
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
      <FilterNav />
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
        <div className='text-muted-foreground flex-1 text-sm'>
          {table.getFilteredSelectedRowModel().rows.length} of{' '}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
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
