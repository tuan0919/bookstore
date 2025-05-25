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
  IconEdit,
  IconEye,
  IconPlus,
  IconStarFilled,
  IconTicket,
  IconTrash,
} from '@tabler/icons-react'
import { ChevronDown, MoreHorizontal } from 'lucide-react'
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

const data: Payment[] = [
  {
    id: 'm5gr84i9',
    sold: 316,
    category: 'Sách ngoại văn',
    name: 'Dược sư tự sự (Manga) - Tập 13',
    inStock: 69,
    price: 39000,
    rating: 4.5,
    reviewCount: 4,
    thumbnail:
      'https://nhasachphuongnam.com/images/detailed/277/manga-duoc-su-tu-su-tap-13.jpg',
    publish: true,
  },
]

export type Payment = {
  id: string
  name: string
  inStock: number
  sold: number
  rating: number
  reviewCount: number
  price: number
  category: string
  thumbnail: string
  publish: boolean
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
      const { inStock, sold } = row.original as Payment
      return (
        <div className='flex flex-col gap-1'>
          <span className='font-light'>Còn {inStock} trong kho</span>
          <span className='font-light'>Bán được {sold}</span>
        </div>
      )
    },
  },
  {
    header: 'Phát hành',
    cell: ({ row }) => {
      const { publish } = row.original as Payment
      return (
        <div className='flex flex-col gap-1'>
          <Switch checked={publish} />
        </div>
      )
    },
  },
  {
    header: 'Đánh giá',
    cell: ({ row }) => {
      const { rating, reviewCount } = row.original as Payment
      return (
        <div className='flex items-center gap-2'>
          <div className='flex items-center gap-1 rounded-sm border p-1 text-sm font-medium'>
            <IconStarFilled size={12} />
            {rating}
          </div>
          <span className='font-light'>{reviewCount} đánh giá</span>
        </div>
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

export function DataTableDemo() {
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
      <div className='flex items-center py-4'>
        <Input
          placeholder='Tìm theo tên...'
          value={(table.getColumn('email')?.getFilterValue() as string) ?? ''}
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
