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
import { IconEdit, IconEye, IconSearch, IconTrash } from '@tabler/icons-react'
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
import { Switch } from '@/components/ui/switch'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { DatePickerWithRange } from './date-picker'

const data: Category[] = [
  {
    id: 'C16276',
    createAt: '23 th4, 2025',
    type: 'Danh mục gốc',
    parent: null,
    name: 'Truyện tiếng Việt',
    description: 'Truyện được sản xuất tại Việt Nam',
  },
  {
    id: 'C16277',
    createAt: '24 th4, 2025',
    type: 'Danh mục con',
    parent: {
      id: 'C16276',
      createAt: '23 th4, 2025',
      type: 'Danh mục gốc',
      parent: null,
      name: 'Truyện tiếng Việt',
      description: 'Truyện được sản xuất tại Việt Nam',
    },
    name: 'Truyện ngắn',
    description: 'Các truyện ngắn Việt Nam',
  },
  {
    id: 'C16278',
    createAt: '24 th4, 2025',
    type: 'Danh mục con',
    parent: {
      id: 'C16276',
      createAt: '23 th4, 2025',
      type: 'Danh mục gốc',
      parent: null,
      name: 'Truyện tiếng Việt',
      description: 'Truyện được sản xuất tại Việt Nam',
    },
    name: 'Truyện dài kỳ',
    description: 'Truyện dài nhiều tập của Việt Nam',
  },
  {
    id: 'C16279',
    createAt: '25 th4, 2025',
    type: 'Danh mục gốc',
    parent: null,
    name: 'Truyện nước ngoài',
    description: 'Truyện được dịch từ nước ngoài',
  },
  {
    id: 'C16280',
    createAt: '25 th4, 2025',
    type: 'Danh mục con',
    parent: {
      id: 'C16279',
      createAt: '25 th4, 2025',
      type: 'Danh mục gốc',
      parent: null,
      name: 'Truyện nước ngoài',
      description: 'Truyện được dịch từ nước ngoài',
    },
    name: 'Truyện Trung Quốc',
    description: 'Truyện dịch từ Trung Quốc',
  },
  {
    id: 'C16281',
    createAt: '25 th4, 2025',
    type: 'Danh mục con',
    parent: {
      id: 'C16279',
      createAt: '25 th4, 2025',
      type: 'Danh mục gốc',
      parent: null,
      name: 'Truyện nước ngoài',
      description: 'Truyện được dịch từ nước ngoài',
    },
    name: 'Truyện Nhật Bản',
    description: 'Truyện dịch từ Nhật Bản',
  },
  {
    id: 'C16282',
    createAt: '26 th4, 2025',
    type: 'Danh mục con',
    parent: {
      id: 'C16279',
      createAt: '25 th4, 2025',
      type: 'Danh mục gốc',
      parent: null,
      name: 'Truyện nước ngoài',
      description: 'Truyện được dịch từ nước ngoài',
    },
    name: 'Truyện Hàn Quốc',
    description: 'Truyện dịch từ Hàn Quốc',
  },
  {
    id: 'C16283',
    createAt: '27 th4, 2025',
    type: 'Danh mục gốc',
    parent: null,
    name: 'Truyện tranh',
    description: 'Truyện tranh các thể loại',
  },
  {
    id: 'C16284',
    createAt: '27 th4, 2025',
    type: 'Danh mục con',
    parent: {
      id: 'C16283',
      createAt: '27 th4, 2025',
      type: 'Danh mục gốc',
      parent: null,
      name: 'Truyện tranh',
      description: 'Truyện tranh các thể loại',
    },
    name: 'Manga',
    description: 'Truyện tranh Nhật Bản',
  },
  {
    id: 'C16285',
    createAt: '27 th4, 2025',
    type: 'Danh mục con',
    parent: {
      id: 'C16283',
      createAt: '27 th4, 2025',
      type: 'Danh mục gốc',
      parent: null,
      name: 'Truyện tranh',
      description: 'Truyện tranh các thể loại',
    },
    name: 'Manhwa',
    description: 'Truyện tranh Hàn Quốc',
  },
]

export type Category = {
  id: string
  createAt: string
  type: 'Danh mục gốc' | 'Danh mục con'
  parent: Category | null
  name: string
  description: string
}

const columns: ColumnDef<Category>[] = [
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
    header: 'Mã danh mục',
    cell: ({ row }) => {
      const { id } = row.original as Category
      return (
        <div className='flex items-center gap-2'>
          <div className='capitalize'>{id}</div>
        </div>
      )
    },
  },
  {
    header: 'Ngày tạo',
    cell: ({ row }) => {
      const { createAt } = row.original as Category
      return (
        <div className='flex justify-start'>
          <span>{createAt}</span>
        </div>
      )
    },
  },
  {
    header: 'Tên danh mục',
    cell: ({ row }) => {
      const { name } = row.original as Category
      return (
        <div className='flex flex-col gap-1'>
          <span className='font-light'>{name}</span>
        </div>
      )
    },
  },
  {
    header: 'Loại danh mục',
    cell: ({ row }) => {
      const { type } = row.original as Category
      return (
        <div className='flex items-center gap-2'>
          <span className='font-light'>{type}</span>
        </div>
      )
    },
  },
  {
    header: 'Danh mục cha',
    cell: ({ row }) => {
      const { parent } = row.original as Category
      return (
        <div className='flex flex-col gap-1'>
          {parent ? (
            parent.name
          ) : (
            <span className='text-muted-foreground text-xs italic'>
              (Không có)
            </span>
          )}
        </div>
      )
    },
  },
  {
    header: 'Phát hành',
    cell: () => {
      return (
        <div className='flex flex-col gap-1'>
          <Switch checked />
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
              <IconTrash />
              <span>Xóa danh mục</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Xem</DropdownMenuLabel>
            <Link to={'/orders/details'}>
              <DropdownMenuItem>
                <IconEye />
                <span>Chi tiết danh mục</span>
              </DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export function CategoryDataTable() {
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
  )
}
