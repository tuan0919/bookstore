import { useState } from 'react'
import { IconCheckbox, IconSquare } from '@tabler/icons-react'
import { categories, type Category } from '@/resources/categories'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Switch } from '@/components/ui/switch'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { TopNav } from '@/components/layout/top-nav'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { DatePickerWithRange } from './components/date-picker'

export default function CouponNew() {
  const [publish, setPublish] = useState(false)
  const [type, setType] = useState('percent')
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([])
  const toggleCategory = (category: Category) => {
    setSelectedCategories((prev) => {
      const isSelected = prev.some((c) => c.id === category.id)

      // Nếu đang chọn -> bỏ chọn
      if (isSelected) {
        return prev.filter((c) => c.id !== category.id)
      }

      // Nếu là cha → bỏ các con
      if (category.type === 'Danh mục gốc') {
        const childIds = categories
          .filter((c) => c.parent?.id === category.id)
          .map((c) => c.id)
        return [...prev.filter((c) => !childIds.includes(c.id)), category]
      }

      // Nếu là con → chỉ cho chọn nếu cha chưa được chọn
      const isParentSelected = prev.some((c) => c.id === category.parent?.id)
      if (isParentSelected) return prev // không làm gì

      return [...prev, category]
    })
  }
  return (
    <>
      <Header>
        <TopNav links={topNav} />
        <div className='ml-auto flex items-center space-x-4'>
          <Search />
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>

      <Main>
        <div className='mb-2 flex items-center justify-between space-y-2'>
          <h1 className='text-2xl font-bold tracking-tight'>
            Thêm khuyến mãi mới
          </h1>
        </div>
        <div className='grid grid-cols-2 items-start gap-4'>
          <Card>
            <CardContent>
              <div className='mb-3 font-semibold'>Thông tin khuyến mãi</div>
              <div className='grid grid-cols-2 gap-4'>
                {/* Loại khuyến mãi */}
                <div className='col-span-2 grid gap-3'>
                  <div className='font-manrope text-sm'>Loại khuyến mãi</div>
                  <RadioGroup
                    name='type'
                    onValueChange={setType}
                    value={type}
                    className='flex gap-6'
                  >
                    <div className='flex items-center gap-2'>
                      <RadioGroupItem value='percent' id='rbtn-percent' />
                      <Label htmlFor='rbtn-percent' className='font-normal'>
                        Tỉ lệ phần trăm
                      </Label>
                    </div>
                    <div className='flex items-center gap-2'>
                      <RadioGroupItem value='fixed' id='rbtn-fixed' />
                      <Label htmlFor='rbtn-fixed' className='font-normal'>
                        Giá trị cố định
                      </Label>
                    </div>
                    <div className='flex items-center gap-2'>
                      <RadioGroupItem value='free-ship' id='rbtn-free-ship' />
                      <Label htmlFor='rbtn-free-ship' className='font-normal'>
                        Miễn phí vận chuyển
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
                {/* Mã khuyến mãi */}
                <div className='grid gap-2'>
                  <div className='font-manrope text-sm'>Mã khuyến mãi</div>
                  <Input placeholder='Nhập mã khuyến mãi' />
                </div>
                {/* Giá trị */}
                <div className='grid gap-2'>
                  <div className='font-manrope text-sm'>Giá trị</div>
                  <Input type='text' />
                </div>
                {/* Áp dụng cho */}
                <div className='col-span-2 grid gap-2'>
                  <div className='font-manrope text-sm'>Áp dụng cho</div>
                  <div className='flex gap-2'>
                    <Popover>
                      <PopoverTrigger asChild>
                        <div
                          id='targetChosen'
                          className='flex w-full flex-wrap gap-2 border-2 border-dashed p-2'
                        >
                          {selectedCategories.length === 0 ? (
                            <div className='flex w-full justify-center'>
                              <span className='text-sm'>Không có</span>
                            </div>
                          ) : (
                            selectedCategories.map((cat) => (
                              <Badge key={cat.id} variant='default'>
                                {cat.name}
                              </Badge>
                            ))
                          )}
                        </div>
                      </PopoverTrigger>
                      <PopoverContent className='w-80'>
                        <Command>
                          <CommandInput placeholder='Nhập thể loại...' />
                          <CommandList>
                            <CommandEmpty>No results found.</CommandEmpty>
                            <CommandGroup heading='Danh mục'>
                              {categories.map((cat) => {
                                const isSelected = selectedCategories.some(
                                  (c) => c.id === cat.id
                                )
                                const isParentSelected =
                                  selectedCategories.some(
                                    (c) => c.id === cat.parent?.id
                                  )
                                const disabled = isParentSelected

                                return (
                                  <CommandItem
                                    key={cat.id}
                                    onSelect={() =>
                                      !disabled && toggleCategory(cat)
                                    }
                                    className={`${disabled ? 'pointer-events-none opacity-50' : ''} ${cat.type === 'Danh mục con' ? 'pl-6' : ''}`}
                                  >
                                    {isSelected ? (
                                      <IconCheckbox className='h-4 w-4' />
                                    ) : (
                                      <IconSquare className='h-4 w-4' />
                                    )}
                                    <span>{cat.name}</span>
                                  </CommandItem>
                                )
                              })}
                            </CommandGroup>
                            <CommandSeparator />
                            <CommandGroup>
                              <CommandItem className='justify-center text-center'>
                                Thêm thể loại mới
                              </CommandItem>
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                <div className='col-span 2 mt-3'>
                  <Button variant='default'>Tạo khuyến mãi</Button>
                </div>
              </div>
            </CardContent>
          </Card>
          <div className='grid gap-4'>
            <Card>
              <CardContent className='flex items-center justify-between'>
                <div className='grid gap-1'>
                  <div className='font-semibold'>Phát hành</div>
                  <div className='text-xs text-gray-600'>
                    Kích hoạt và cho phép mã khuyến mãi hoạt động ngay lập tức
                    sau khi tạo mới xong
                  </div>
                </div>
                <Switch checked={publish} onCheckedChange={setPublish} />
              </CardContent>
            </Card>
            <Card>
              <CardContent className='flex items-center justify-between'>
                <div className='grid gap-1'>
                  <div className='font-semibold'>Thời hạn</div>
                  <DatePickerWithRange />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </Main>
    </>
  )
}

const topNav = [
  {
    title: 'Overview',
    href: 'dashboard/overview',
    isActive: true,
    disabled: false,
  },
  {
    title: 'Customers',
    href: 'dashboard/customers',
    isActive: false,
    disabled: true,
  },
  {
    title: 'Products',
    href: 'dashboard/products',
    isActive: false,
    disabled: true,
  },
  {
    title: 'Settings',
    href: 'dashboard/settings',
    isActive: false,
    disabled: true,
  },
]
