import * as React from 'react'
import { Link, useNavigate } from '@tanstack/react-router'
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
import {
  IconCash,
  IconCircleDashed,
  IconClockHour2,
  IconCreditCardRefund,
  IconEdit,
  IconEye,
  IconMessage,
  IconMoodCheck,
  IconMoodSad2,
  IconTrash,
  IconTruckDelivery,
  IconTruckReturn,
  IconUser,
} from '@tabler/icons-react'
import { Route as OrderDetailsRoute } from '@/routes/_authenticated/orders/$id/details'
import { MoreHorizontal } from 'lucide-react'
import { OrderDTO } from '@/api/order'
import { useOrderOverviewContext } from '@/context/OrderOverviewContext'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { FilterNav } from './filter-nav'

function getColumns(
  navigate: ReturnType<typeof useNavigate>
): ColumnDef<OrderDTO>[] {
  return [
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && 'indeterminate')
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label='Select all'
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label='Select row'
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      header: 'Mã đơn hàng',
      cell: ({ row }) => {
        const { orderId } = row.original as OrderDTO
        return (
          <div className='flex items-center gap-2'>
            <div className='capitalize'>{orderId}</div>
          </div>
        )
      },
    },
    {
      header: 'Ngày đặt',
      cell: ({ row }) => {
        const { orderDate } = row.original as OrderDTO
        return (
          <div className='flex justify-start'>
            <span>{orderDate}</span>
          </div>
        )
      },
    },
    {
      header: 'Khách hàng',
      cell: ({ row }) => {
        const { items } = row.original as OrderDTO
        return (
          <div className='flex flex-col gap-1'>
            <Link to={'/orders/overview?id=' + 0}>
              <span className='font-light'>{'user-test'}</span>
            </Link>
          </div>
        )
      },
    },
    {
      header: 'Tổng tiền',
      cell: ({ row }) => {
        const { totalAmount } = row.original as OrderDTO
        return (
          <div className='flex items-center gap-2'>
            <span className='font-light'>
              {totalAmount.toLocaleString('Vi') + 'đ'}
            </span>
          </div>
        )
      },
    },
    {
      header: 'Thanh toán',
      cell: ({ row }) => {
        const { paymentMethodName } = row.original as OrderDTO
        return (
          <Badge>
            <span className='font-bold text-green-500'>
              {paymentMethodName}
            </span>
          </Badge>
        )
      },
    },
    {
      header: 'Số lượng',
      cell: ({ row }) => {
        const { items } = row.original as OrderDTO
        return (
          <span className='font-light'>
            {items.reduce((prev, cur) => {
              return prev + cur.quantity
            }, 0)}
          </span>
        )
      },
    },
    {
      header: 'Trạng thái',
      cell: ({ row }) => {
        const { status } = row.original as OrderDTO
        return (
          <Badge>
            <span className='font-bold text-green-500'>
              {status.toUpperCase()}
            </span>
          </Badge>
        )
      },
    },
    {
      id: 'actions',
      enableHiding: false,
      cell: ({ row }) => {
        const { orderId } = row.original as OrderDTO
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' className='h-8 w-8 p-0'>
                <span className='sr-only'>Open menu</span>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuLabel>Hành động</DropdownMenuLabel>
              <DropdownMenuItem>
                <IconEdit />
                <span>Chỉnh sửa thông tin</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <IconMessage />
                <span>Liên hệ khách hàng</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <IconTrash />
                <span>Xóa đơn</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuLabel>Cập nhật đơn</DropdownMenuLabel>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>Thanh toán</DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem>
                      <IconCash />
                      <span>Đã thanh toán</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <IconClockHour2 />
                      <span>Chờ thanh toán</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <IconCreditCardRefund />
                      <span>Chờ hoàn tiền</span>
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>Trạng thái</DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem>
                      <IconCircleDashed />
                      <span>Đang xử lý</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <IconTruckDelivery />
                      <span>Đang giao</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <IconTruckReturn />
                      <span>Đang hoàn trả</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <IconMoodCheck />
                      <span>Hoàn thành</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <IconMoodSad2 />
                      <span>Đã hủy</span>
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
              <DropdownMenuSeparator />
              <DropdownMenuLabel>Xem</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() =>
                  navigate({
                    to: OrderDetailsRoute.to,
                    params: { id: orderId.toString() },
                  })
                }
              >
                <IconEye />
                <span>Chi tiết đơn hàng</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <IconUser />
                <span>Chi tiết khách hàng</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
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
