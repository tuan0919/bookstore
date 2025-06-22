import {
  IconMessageFilled,
  IconStarFilled,
  IconThumbDownFilled,
  IconThumbUpFilled,
} from '@tabler/icons-react'
import { Search } from 'lucide-react'
import { CustomerDetailsProvider } from '@/context/CustomerDetailsContext'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { ThemeSwitch } from '@/components/theme-switch'
import { CustomersOrdersTable } from './components/customers-orders-data-datable'
import { PurchaseSummary } from './components/purchase-summary'
import { SaleChart } from './components/sale-chart'

export default function CustomerDetails() {
  return (
    <>
      {/* ===== Top Heading ===== */}
      <Header>
        <div className='ml-auto flex items-center space-x-4'>
          <Search />
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>
      {/* ===== Main ===== */}
      <Main>
        <CustomerDetailsProvider>
          <div className='grid grid-cols-3 items-start gap-8'>
            {/* Column 1 */}
            <div className='grid gap-6'>
              <Card className='h-fit overflow-hidden p-0'>
                <div className='relative mb-10 h-[3rem] w-full overflow-visible bg-gray-900'>
                  <div className='bg absolute -bottom-12 left-5 h-20 w-20 overflow-hidden rounded-full border-4 border-white'>
                    <img
                      src='https://techzaa.in/larkon/admin/assets/images/users/avatar-2.jpg'
                      alt=''
                    />
                  </div>
                </div>
                <div className='grid gap-1 ps-2'>
                  <div className='mb-2 font-medium'>Nguyễn Quốc Anh Tuấn</div>
                  <div className='font-manrope text-sm text-orange-400'>
                    <a href='#'>@nqta0919.dev</a>
                  </div>
                  <div className='flex gap-1'>
                    <span className='text-sm font-medium'>Email:</span>
                    <span className='text-sm font-light'>
                      nqat0919@gmail.com
                    </span>
                  </div>
                  <div className='flex gap-1'>
                    <span className='text-sm font-medium'>Số điện thoại:</span>
                    <span className='text-sm font-light'>
                      (+84) 0936 565 5257
                    </span>
                  </div>
                </div>
                <Separator />
                <div className='ps-2 pb-2'>
                  <Button>Gửi tin nhắn</Button>
                </div>
              </Card>
              <Card className='px-6 py-4'>
                <div className='flex justify-between'>
                  <div className='font-medium'>Chi tiết khách hàng</div>
                  <Badge>Đã xác thực</Badge>
                </div>
                <div className='grid grid-cols-2 gap-2'>
                  <span className='text-sm font-medium'>Mã khách hàng:</span>
                  <span className='font-manrope text-sm font-light'>
                    #AC-278699
                  </span>
                  <span className='text-sm font-medium'>Địa chỉ email:</span>
                  <span className='font-manrope text-sm font-light'>
                    nqat0919@gmail.com
                  </span>
                  <span className='text-sm font-medium'>Địa chỉ cá nhân:</span>
                  <span className='font-manrope text-sm font-light'>
                    31/8B Khu phố 4 thị trấn Hòa Thành Tây Ninh
                  </span>
                  <span className='text-sm font-medium'>
                    Mã đơn hàng gần nhất:
                  </span>
                  <span className='font-manrope text-sm font-light'>
                    #INV2540
                  </span>
                </div>
              </Card>
              <Card className='py-3'>
                <div className='flex items-center justify-between px-6'>
                  <div className='font-medium'>Bộ truyện đã tạo</div>
                  <Button>Xem tất cả</Button>
                </div>
                <Separator />
                <div className='grid gap-4 px-6'>
                  <div className='flex gap-4 p-2 hover:cursor-pointer hover:shadow-xl'>
                    <div className='w-[3rem] border p-1'>
                      <img
                        src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRn1xXMph0bHdYYhFTv1gmNEmP2XfvIATJYNU_4YxZH5BDOw_en8yJFbdlRWQG_esrXJSA&usqp=CAU'
                        alt=''
                      />
                    </div>
                    <div className='grid items-start'>
                      <span className='text-sm font-medium in-hover:underline'>
                        Tuyển tập 20 bộ truyện One Punch man
                      </span>
                      <div className='flex gap-6'>
                        <div className='flex items-center gap-1'>
                          <IconStarFilled color='orange' size={15} />
                          <span className='text-sm'>4.8</span>
                        </div>
                        <div className='flex items-center gap-1'>
                          <IconThumbUpFilled color='green' size={15} />
                          <span className='text-sm'>213</span>
                        </div>
                        <div className='flex items-center gap-1'>
                          <IconThumbDownFilled color='red' size={15} />
                          <span className='text-sm'>12</span>
                        </div>
                        <div className='flex items-center gap-1'>
                          <IconMessageFilled color='gray' size={15} />
                          <span className='text-sm'>50</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='flex gap-4 p-2 hover:cursor-pointer hover:shadow-xl'>
                    <div className='w-[3rem] border p-1'>
                      <img
                        src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRn1xXMph0bHdYYhFTv1gmNEmP2XfvIATJYNU_4YxZH5BDOw_en8yJFbdlRWQG_esrXJSA&usqp=CAU'
                        alt=''
                      />
                    </div>
                    <div className='grid items-start'>
                      <span className='text-sm font-medium in-hover:underline'>
                        Tuyển tập 20 bộ truyện One Punch man
                      </span>
                      <div className='flex gap-6'>
                        <div className='flex items-center gap-1'>
                          <IconStarFilled color='orange' size={15} />
                          <span className='text-sm'>4.8</span>
                        </div>
                        <div className='flex items-center gap-1'>
                          <IconThumbUpFilled color='green' size={15} />
                          <span className='text-sm'>213</span>
                        </div>
                        <div className='flex items-center gap-1'>
                          <IconThumbDownFilled color='red' size={15} />
                          <span className='text-sm'>12</span>
                        </div>
                        <div className='flex items-center gap-1'>
                          <IconMessageFilled color='gray' size={15} />
                          <span className='text-sm'>50</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='flex gap-4 p-2 hover:cursor-pointer hover:shadow-xl'>
                    <div className='w-[3rem] border p-1'>
                      <img
                        src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRn1xXMph0bHdYYhFTv1gmNEmP2XfvIATJYNU_4YxZH5BDOw_en8yJFbdlRWQG_esrXJSA&usqp=CAU'
                        alt=''
                      />
                    </div>
                    <div className='grid items-start'>
                      <span className='text-sm font-medium in-hover:underline'>
                        Tuyển tập 20 bộ truyện One Punch man
                      </span>
                      <div className='flex gap-6'>
                        <div className='flex items-center gap-1'>
                          <IconStarFilled color='orange' size={15} />
                          <span className='text-sm'>4.8</span>
                        </div>
                        <div className='flex items-center gap-1'>
                          <IconThumbUpFilled color='green' size={15} />
                          <span className='text-sm'>213</span>
                        </div>
                        <div className='flex items-center gap-1'>
                          <IconThumbDownFilled color='red' size={15} />
                          <span className='text-sm'>12</span>
                        </div>
                        <div className='flex items-center gap-1'>
                          <IconMessageFilled color='gray' size={15} />
                          <span className='text-sm'>50</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='flex gap-4 p-2 hover:cursor-pointer hover:shadow-xl'>
                    <div className='w-[3rem] border p-1'>
                      <img
                        src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRn1xXMph0bHdYYhFTv1gmNEmP2XfvIATJYNU_4YxZH5BDOw_en8yJFbdlRWQG_esrXJSA&usqp=CAU'
                        alt=''
                      />
                    </div>
                    <div className='grid items-start'>
                      <span className='text-sm font-medium in-hover:underline'>
                        Tuyển tập 20 bộ truyện One Punch man
                      </span>
                      <div className='flex gap-6'>
                        <div className='flex items-center gap-1'>
                          <IconStarFilled color='orange' size={15} />
                          <span className='text-sm'>4.8</span>
                        </div>
                        <div className='flex items-center gap-1'>
                          <IconThumbUpFilled color='green' size={15} />
                          <span className='text-sm'>213</span>
                        </div>
                        <div className='flex items-center gap-1'>
                          <IconThumbDownFilled color='red' size={15} />
                          <span className='text-sm'>12</span>
                        </div>
                        <div className='flex items-center gap-1'>
                          <IconMessageFilled color='gray' size={15} />
                          <span className='text-sm'>50</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
            {/* Column 2 */}
            <div className='col-span-2 grid gap-8'>
              <PurchaseSummary />
              <Card className='p-8'>
                <div className='font-medium'>Tần suất mua hàng</div>
                <SaleChart />
              </Card>
              <Card className='px-8'>
                <div className='font-medium'>Lịch sử đặt hàng</div>
                <CustomersOrdersTable />
              </Card>
            </div>
          </div>
        </CustomerDetailsProvider>
      </Main>
    </>
  )
}
