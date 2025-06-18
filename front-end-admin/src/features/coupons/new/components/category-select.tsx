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
  value: number[]
  onChange: (ids: number[]) => void
}

export function CategorySelector({ value, onChange }: CategorySelectorProps) {
  const selectedCategoryIds = value || []

  const toggleCategory = (categoryId: number) => {
    const category = categories.find((c) => parseInt(c.id) === categoryId)
    if (!category) return

    const allDescendantIds = getDescendantCategoryIds(category.id)
    const parentChainIds = getParentCategoryIds(category)

    const isSelected = selectedCategoryIds.includes(categoryId)

    if (isSelected) {
      // Bỏ chọn category
      onChange(selectedCategoryIds.filter((id) => id !== categoryId))
    } else {
      // Nếu là category cha: bỏ chọn tất cả con trước khi chọn cha
      const withoutChildren = selectedCategoryIds.filter(
        (id) => !allDescendantIds.includes(id)
      )

      // Nếu cha của category đang được chọn: bỏ cha
      const withoutParents = withoutChildren.filter(
        (id) => !parentChainIds.includes(id)
      )

      onChange([...withoutParents, categoryId])
    }
  }

  function getDescendantCategoryIds(parentId: string): number[] {
    const descendants: number[] = []

    function collect(id: string) {
      categories.forEach((cat) => {
        if (cat.parent?.id === id) {
          descendants.push(parseInt(cat.id))
          collect(cat.id)
        }
      })
    }

    collect(parentId)
    return descendants
  }

  function getParentCategoryIds(category: Category): number[] {
    const parentIds: number[] = []
    let current = category.parent
    while (current) {
      parentIds.push(parseInt(current.id))
      current = current.parent
    }
    return parentIds
  }

  function renderCategories(
    categories: Category[],
    parentId: string | null = null,
    depth: number = 0
  ): JSX.Element[] {
    return categories
      .filter((cat) => (cat.parent?.id ?? null) === parentId)
      .map((cat) => {
        const catIdNum = parseInt(cat.id)
        const isSelected = selectedCategoryIds.includes(catIdNum)

        return (
          <React.Fragment key={cat.id}>
            <CommandItem
              value={`${cat.name}-${cat.id}`}
              onSelect={() => toggleCategory(catIdNum)}
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

  const selectedCategories = categories.filter((cat) =>
    selectedCategoryIds.includes(parseInt(cat.id))
  )

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div
          id='targetChosen'
          className='flex w-full cursor-pointer flex-wrap gap-2 border-2 border-dashed p-2'
        >
          {selectedCategories.length === 0 ? (
            <div className='flex w-full justify-center'>
              <span className='text-sm'>Chưa chọn</span>
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
            <CommandEmpty>Không tìm thấy kết quả.</CommandEmpty>
            <CommandGroup heading='Danh mục'>
              {renderCategories(categories)}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
