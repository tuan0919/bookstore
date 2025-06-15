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
  IconEdit,
  IconEye,
  IconPlus,
  IconStarFilled,
  IconTicket,
  IconTrash,
} from '@tabler/icons-react'
import { Route as EditProductRoute } from '@/routes/_authenticated/products/$id/edit'
import { ChevronDown, MoreHorizontal } from 'lucide-react'
import { BookOverviewDTO } from '@/api/book'
import { useProductOverviewContext } from '@/context/ProductOverviewContext'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

function getColumns(
  navigate: ReturnType<typeof useNavigate>
): ColumnDef<BookOverviewDTO>[] {
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
      header: 'Tên & ảnh sản phẩm',
      cell: ({ row }) => {
        const { thumbnail, title } = row.original as BookOverviewDTO
        return (
          <div className='flex items-center gap-2'>
            <img
              src={thumbnail}
              alt={title}
              className='h-15 w-15 rounded-sm border object-contain p-1'
            />
            <div className='w-[400px] truncate capitalize'>{title}</div>
          </div>
        )
      },
    },
    {
      header: 'Giá bán',
      cell: ({ row }) => {
        const { price } = row.original as BookOverviewDTO
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
        const { quantityInStock } = row.original as BookOverviewDTO
        return (
          <div className='flex flex-col gap-1'>
            <span className='font-light'>Còn {quantityInStock} trong kho</span>
          </div>
        )
      },
    },
    {
      header: 'Phát hành',
      cell: ({ row }) => {
        const { publish } = row.original as BookOverviewDTO
        return (
          <div className='flex flex-col gap-1'>
            <Switch checked={true} />
          </div>
        )
      },
    },
    {
      header: 'Đánh giá',
      cell: ({ row }) => {
        const { avgRate, rvCounts } = row.original as BookOverviewDTO
        return (
          <div className='flex items-center gap-2'>
            <div className='flex items-center gap-1 rounded-sm border p-1 text-sm font-medium'>
              <IconStarFilled size={12} />
              {avgRate}
            </div>
            <span className='font-light'>{rvCounts} đánh giá</span>
          </div>
        )
      },
    },
    {
      id: 'actions',
      enableHiding: false,
      cell: ({ row }) => {
        const { bookId } = row.original as BookOverviewDTO
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
              <DropdownMenuItem
                onClick={() =>
                  navigate({
                    to: EditProductRoute.to,
                    params: { id: bookId.toString() },
                  })
                }
              >
                <IconEdit />
                <span>Chỉnh sửa thông tin</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <IconTicket />
                <span>Chỉnh sửa ưu đãi</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <IconTrash />
                <span>Xóa sản phẩm</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <IconEye />
                <span>Xem chi tiết</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]
}

export function DataTableDemo() {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
  const navigate = useNavigate()
  const columns = getColumns(navigate)
  const {
    overviewBooks,
    isLoading,
    error,
    page,
    size,
    totalPage,
    totalElements,
    isLastPage,
    isFirstPage,
    goToNextPage,
    goToPreviousPage,
  } = useProductOverviewContext()
  const table = useReactTable({
    data: overviewBooks,
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
        <Input
          placeholder='Tìm theo tên...'
          onChange={(event) =>
            table.getColumn('email')?.setFilterValue(event.target.value)
          }
          className='max-w-sm'
        />
        <Link to='/products/new'>
          <Button variant='outline' className='ml-[1rem] gap-1'>
            <IconPlus size={18} />
            Thêm sản phẩm
          </Button>
        </Link>
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
          {table.getFilteredRowModel().rows.length} row(s) selected. Page:{' '}
          {page + 1} of {totalPage + 1}, total: {totalElements} books
        </div>
        <div className='space-x-2'>
          <Button
            variant='outline'
            size='sm'
            onClick={() => goToPreviousPage()}
            disabled={isFirstPage}
          >
            Previous
          </Button>
          <Button
            variant='outline'
            size='sm'
            disabled={isLastPage}
            onClick={() => goToNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
