import * as React from 'react'
import { useState } from 'react'
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
import { IconEdit, IconPlus, IconSearch, IconTrash } from '@tabler/icons-react'
import { coupons, Coupon } from '@/resources/coupons'
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
import { TargetPopOver } from './target-pop-over'

export function CouponDataTable() {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
  const [open, setOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<Coupon | null>(null)
  React.useEffect(() => {
    setOpen(true)
  }, [selectedCategory])

  function CouponDialog({ category }: { category: Coupon }) {
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
          <DropdownMenuItem onClick={() => setSelectedCategory(null)}>
            <IconPlus />
            <span>Thêm mới</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setSelectedCategory(category)}>
            <IconEdit />
            <span>Chỉnh sửa</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <IconTrash />
            <span>Xóa</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  const columns: ColumnDef<Coupon>[] = [
    // select
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
    // Áp dụng cho
    {
      header: 'Áp dụng cho',
      cell: ({ row }) => {
        const { category } = row.original as Coupon
        return (
          <div className='flex items-center gap-2'>
            <div className='flex flex-col gap-2'>
              <TargetPopOver />
            </div>
          </div>
        )
      },
    },
    // Loại
    {
      header: 'Loại giảm giá',
      cell: ({ row }) => {
        const { type } = row.original as Coupon
        return (
          <div className='flex justify-start'>
            <span>{type}</span>
          </div>
        )
      },
    },
    // Code
    {
      header: 'Code',
      cell: ({ row }) => {
        const { code } = row.original as Coupon
        return (
          <div className='flex flex-col gap-1'>
            <span className='font-manrope'>{code}</span>
          </div>
        )
      },
    },
    // Giảm giá
    {
      header: 'Giảm giá',
      cell: ({ row }) => {
        const { discount } = row.original as Coupon
        return (
          <div className='flex items-center gap-2'>
            <span className='font-manrope font-light'>{discount}</span>
          </div>
        )
      },
    },
    // Ngày bắt đầu
    {
      header: 'Ngày bắt đầu',
      cell: ({ row }) => {
        const { start } = row.original as Coupon
        return (
          <div className='flex items-center gap-2'>
            <span className='font-manrope font-light'>{start}</span>
          </div>
        )
      },
    },
    // Ngày kết thúc
    {
      header: 'Ngày kết thúc',
      cell: ({ row }) => {
        const { end } = row.original as Coupon
        return (
          <div className='flex items-center gap-2'>
            <span className='font-manrope font-light'>{end}</span>
          </div>
        )
      },
    },
    // Status
    {
      header: 'Tình trạng',
      cell: ({ row }) => {
        const { status } = row.original as Coupon
        return <Badge variant='outline'>{status}</Badge>
      },
    },
    // actions
    {
      id: 'actions',
      enableHiding: false,
      cell: ({ row }) => {
        const category = row.original as Coupon
        return <CouponDialog category={category} />
      },
    },
  ]

  const table = useReactTable<Coupon>({
    data: coupons,
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
    <>
      <div className='w-full'>
        <div className='flex items-center py-4'>
          <div className='flex gap-2'>
            <DatePickerWithRange />
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
    </>
  )
}
