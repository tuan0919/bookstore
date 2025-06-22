import {
  IconMessages,
  IconUsers,
  IconBooks,
  IconShoppingBag,
  IconDeviceDesktopAnalytics,
  IconTicket,
} from '@tabler/icons-react'
import { AudioWaveform, Command, GalleryVerticalEnd } from 'lucide-react'
import { type SidebarData } from '../types'

export const sidebarData: SidebarData = {
  user: {
    name: 'admin',
    email: 'admin@email.com',
    avatar: '/avatars/shadcn.jpg',
  },
  teams: [
    {
      name: 'Shadcn Admin',
      logo: Command,
      plan: 'Vite + ShadcnUI',
    },
    {
      name: 'Acme Inc',
      logo: GalleryVerticalEnd,
      plan: 'Enterprise',
    },
    {
      name: 'Acme Corp.',
      logo: AudioWaveform,
      plan: 'Startup',
    },
  ],
  navGroups: [
    {
      title: 'Cơ bản',
      items: [
        {
          title: 'Dashboard',
          url: '/',
          icon: IconDeviceDesktopAnalytics,
        },
        {
          title: 'Sản phẩm',
          items: [
            {
              title: 'Danh sách',
              url: '/products/overview',
            },
            {
              title: 'Thêm mới',
              url: '/products/new',
            },
          ],
          icon: IconBooks,
        },
        // {
        //   title: 'Danh mục',
        //   url: '/categories/overview',
        //   icon: IconCategory,
        // },
        {
          title: 'Đơn hàng',
          url: '/orders/overview',
          icon: IconShoppingBag,
        },
        {
          title: 'Khuyến mãi',
          items: [
            {
              title: 'Danh sách',
              url: '/coupons/overview',
            },
            {
              title: 'Thêm mới',
              url: '/coupons/new',
            },
          ],
          icon: IconTicket,
        },
        {
          title: 'Chats',
          url: '/chats',
          badge: '3',
          icon: IconMessages,
        },
        {
          title: 'Người dùng',
          url: '/users',
          icon: IconUsers,
        },
      ],
    },
  ],
}
