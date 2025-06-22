import { useNavigate } from '@tanstack/react-router'
import {
  IconEye,
  IconMoodCheck,
  IconMoodSad2,
  IconTruckDelivery,
  IconTruckReturn,
  IconUser,
} from '@tabler/icons-react'
import { Route as CustomersDetailsRoute } from '@/routes/_authenticated/customers/$id/details'
import { Route as OrderDetailsRoute } from '@/routes/_authenticated/orders/$id/details'
import { MoreHorizontal } from 'lucide-react'
import { useOrderOverviewContext } from '@/context/OrderOverviewContext'
import { Button } from '@/components/ui/button'
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

type StatusCode =
  | 'PENDING_CONFIRMATION'
  | 'CONFIRMED'
  | 'SHIPPING'
  | 'DELIVERED'
  | 'CANCELED'

interface OrderActionsCellProps {
  orderId: number
  customerId: number
  navigate: ReturnType<typeof useNavigate>
  statusCode: StatusCode
}

export function OrderActionsCell({
  orderId,
  customerId,
  navigate,
  statusCode,
}: OrderActionsCellProps) {
  const { updateStatus } = useOrderOverviewContext()
  const getStatusOptions = () => {
    switch (statusCode) {
      case 'PENDING_CONFIRMATION':
        return [
          {
            label: 'Xác nhận',
            icon: <IconMoodCheck />,
            value: 'CONFIRMED',
          },
          {
            label: 'Hủy',
            icon: <IconMoodSad2 />,
            value: 'CANCELED',
          },
        ]
      case 'CONFIRMED':
        return [
          {
            label: 'Đang giao',
            icon: <IconTruckDelivery />,
            value: 'SHIPPING',
          },
          {
            label: 'Hủy',
            icon: <IconMoodSad2 />,
            value: 'CANCELED',
          },
        ]
      case 'SHIPPING':
        return [
          {
            label: 'Đã giao',
            icon: <IconTruckReturn />,
            value: 'DELIVERED',
          },
        ]
      default:
        // DELIVERED, CANCELED không có tùy chọn nào
        return []
    }
  }

  const statusOptions = getStatusOptions()

  // Hàm xử lý cập nhật trạng thái (bạn tự implement)
  const handleStatusChange = (newStatus: StatusCode) => {
    updateStatus(orderId, newStatus)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='h-8 w-8 p-0'>
          <span className='sr-only'>Open menu</span>
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuLabel>Cập nhật đơn</DropdownMenuLabel>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Trạng thái</DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              {statusOptions.length === 0 ? (
                <DropdownMenuItem disabled>
                  <span>Không có tùy chọn</span>
                </DropdownMenuItem>
              ) : (
                statusOptions.map((opt) => (
                  <DropdownMenuItem
                    key={opt.value}
                    onClick={() => handleStatusChange(opt.value as StatusCode)}
                  >
                    {opt.icon}
                    <span>{opt.label}</span>
                  </DropdownMenuItem>
                ))
              )}
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
        <DropdownMenuItem
          onClick={() => {
            navigate({
              to: CustomersDetailsRoute.to,
              params: {
                id: customerId.toString(),
              },
            })
          }}
        >
          <IconUser />
          <span>Chi tiết khách hàng</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
