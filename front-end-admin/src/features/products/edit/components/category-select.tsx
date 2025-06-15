import { JSX } from 'react'
import React from 'react'
import { IconCheckbox, IconSquare } from '@tabler/icons-react'
import { categories, Category } from '@/resources/categories'
import { Badge } from '@/components/ui/badge'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

interface CategorySelectorProps {
  value: number
  onChange: (category_id: number) => void
}

export function CategorySelector({ value, onChange }: CategorySelectorProps) {
  const toggleCategory = (category: Category) => {
    if (value === Number(category.id)) {
      // do nothing
    } else {
      onChange(Number(category.id))
    }
  }

  function renderCategories(
    categories: Category[],
    parentId: string | null = null,
    depth: number = 0
  ): JSX.Element[] {
    return categories
      .filter((cat) => (cat.parent?.id ?? null) === parentId)
      .map((cat) => {
        const isSelected = value === Number(cat.id)
        const isParentSelected = value === Number(cat.parent?.id)
        const disabled = isParentSelected

        return (
          <React.Fragment key={cat.id}>
            <CommandItem
              value={`${cat.name}-${cat.id}`} // đảm bảo duy nhất
              onSelect={() => !disabled && toggleCategory(cat)}
              className={`${disabled ? 'pointer-events-none opacity-50' : ''}`}
              style={{ paddingLeft: `${depth * 16}px` }}
            >
              {isSelected ? (
                <IconCheckbox className='mr-2 h-4 w-4' />
              ) : (
                <IconSquare className='mr-2 h-4 w-4' />
              )}
              <span>{cat.name}</span>
              {cat.parent ? (
                <span className='ml-1 text-xs font-medium text-gray-500'>
                  ({cat.parent.name})
                </span>
              ) : null}
            </CommandItem>

            {renderCategories(categories, cat.id, depth + 1)}
          </React.Fragment>
        )
      })
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div
          id='targetChosen'
          className='flex w-full cursor-pointer flex-wrap gap-2 border-2 border-dashed p-2'
        >
          {(() => {
            const selectedCategory = categories.find(
              (c) => Number(c.id) === value
            )
            if (!selectedCategory) {
              return (
                <div className='flex w-full justify-center'>
                  <span className='text-sm'>Chưa chọn</span>
                </div>
              )
            }
            return (
              <Badge key={selectedCategory.id} variant='default'>
                {selectedCategory.name}
              </Badge>
            )
          })()}
        </div>
      </PopoverTrigger>
      <PopoverContent className='w-80'>
        <Command>
          <CommandInput placeholder='Nhập thể loại...' />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading='Danh mục'>
              {renderCategories(categories)}
            </CommandGroup>
            {/* <CommandSeparator />
            <CommandGroup>
              <CommandItem className='justify-center text-center'>
                Thêm thể loại mới
              </CommandItem>
            </CommandGroup> */}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
