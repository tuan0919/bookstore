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
import { Details } from './components/customer-details'
import { CustomerOverview } from './components/customer-overview'
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
              <CustomerOverview />
              <Details />
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
