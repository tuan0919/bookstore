import * as React from 'react'
import { Link } from '@tanstack/react-router'
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
  IconSearch,
  IconTrash,
  IconTruckDelivery,
  IconTruckReturn,
  IconUser,
} from '@tabler/icons-react'
import { ChevronDown, MoreHorizontal } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
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
import { DatePickerWithRange } from './date-picker'

const data: Payment[] = [
  {
    id: '583488/80',
    createAt: '23 th4, 2025',
    customerName: 'Nguyễn Văn A',
    customerId: '583488/80',
    total: 2000000,
    payStatus: 'Đã thanh toán',
    items: 2,
    orderStatus: 'Đang giao',
  },
  {
    id: '583489/81',
    createAt: '24 th4, 2025',
    customerName: 'Trần Thị B',
    customerId: '583489/81',
    total: 350000,
    payStatus: 'Chờ thanh toán',
    items: 1,
    orderStatus: 'Đang xử lý',
  },
  {
    id: '583490/82',
    createAt: '25 th4, 2025',
    customerName: 'Lê Văn C',
    customerId: '583490/82',
    total: 980000,
    payStatus: 'Đã thanh toán',
    items: 3,
    orderStatus: 'Hoàn thành',
  },
  {
    id: '583491/83',
    createAt: '26 th4, 2025',
    customerName: 'Phạm Thị D',
    customerId: '583491/83',
    total: 450000,
    payStatus: 'Chờ hoàn tiền',
    items: 2,
    orderStatus: 'Đang hoàn trả',
  },
  {
    id: '583492/84',
    createAt: '27 th4, 2025',
    customerName: 'Ngô Văn E',
    customerId: '583492/84',
    total: 1250000,
    payStatus: 'Đã thanh toán',
    items: 4,
    orderStatus: 'Đã hủy',
  },
  {
    id: '583493/85',
    createAt: '28 th4, 2025',
    customerName: 'Đặng Thị F',
    customerId: '583493/85',
    total: 640000,
    payStatus: 'Chờ thanh toán',
    items: 1,
    orderStatus: 'Đang giao',
  },
]

export type Payment = {
  id: string
  customerName: string
  customerId: string
  createAt: string
  total: number
  payStatus: 'Đã thanh toán' | 'Chờ thanh toán' | 'Chờ hoàn tiền'
  items: number
  orderStatus:
    | 'Đang xử lý'
    | 'Đang giao'
    | 'Đang hoàn trả'
    | 'Hoàn thành'
    | 'Đã hủy'
}

const columns: ColumnDef<Payment>[] = [
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
      const { id } = row.original as Payment
      return (
        <div className='flex items-center gap-2'>
          <div className='capitalize'>{id}</div>
        </div>
      )
    },
  },
  {
    header: 'Ngày đặt',
    cell: ({ row }) => {
      const { createAt } = row.original as Payment
      return (
        <div className='flex justify-start'>
          <span>{createAt}</span>
        </div>
      )
    },
  },
  {
    header: 'Khách hàng',
    cell: ({ row }) => {
      const { customerId, customerName } = row.original as Payment
      return (
        <div className='flex flex-col gap-1'>
          <Link to={'/orders/overview?id=' + customerId}>
            <span className='font-light'>{customerName}</span>
          </Link>
        </div>
      )
    },
  },
  {
    header: 'Tổng tiền',
    cell: ({ row }) => {
      const { total } = row.original as Payment
      return (
        <div className='flex items-center gap-2'>
          <span className='font-light'>{total.toLocaleString('Vi') + 'đ'}</span>
        </div>
      )
    },
  },
  {
    header: 'Thanh toán',
    cell: ({ row }) => {
      const { payStatus } = row.original as Payment
      return (
        <Badge>
          <span className='font-bold text-green-500'>
            {payStatus.toUpperCase()}
          </span>
        </Badge>
      )
    },
  },
  {
    header: 'Số lượng',
    cell: ({ row }) => {
      const { items } = row.original as Payment
      return <span className='font-light'>{items}</span>
    },
  },
  {
    header: 'Trạng thái',
    cell: ({ row }) => {
      const { orderStatus } = row.original as Payment
      return (
        <Badge>
          <span className='font-bold text-green-500'>
            {orderStatus.toUpperCase()}
          </span>
        </Badge>
      )
    },
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: () => {
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
            <Link to={'/orders/details'}>
              <DropdownMenuItem>
                <IconEye />
                <span>Chi tiết đơn hàng</span>
              </DropdownMenuItem>
            </Link>
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

export function OrderDataTable() {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='outline' className='ml-auto'>
              Cột hiển thị <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className='capitalize'
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
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
