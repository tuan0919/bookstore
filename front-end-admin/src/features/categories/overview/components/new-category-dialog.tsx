import { Category } from '@/resources/categories'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'

interface EditCategoryDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  category: Category | null
}

export function CategoryNewDialog(props: EditCategoryDialogProps) {
  return (
    <Dialog open={props.open} onOpenChange={props.onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {props.category ? 'Chỉnh sửa danh mục' : 'Thêm danh mục mới'}
          </DialogTitle>
          <DialogDescription>
            {props.category
              ? 'Chỉnh sửa nội dung danh mục'
              : 'Nhập nội dung danh mục mới vào đây. Bạn có thể thêm nhiều danh mục'}
          </DialogDescription>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='name' className='text-right'>
              Tên
            </Label>
            <Input
              id='name'
              placeholder='Nhập tên danh mục...'
              className='col-span-3'
              value={props.category?.name}
            />
          </div>
          <div className='grid w-full grid-cols-4 items-center gap-4'>
            <Label className='text-right'>Danh mục cha</Label>
            <Select defaultValue='none'>
              <SelectTrigger className='col-span-3'>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='none'>Không (danh mục gốc)</SelectItem>
                <SelectItem value='vi'>Truyện tiếng việt</SelectItem>
                <SelectItem value='other'>Truyện nước ngoài</SelectItem>
                <SelectItem value='manga'>Truyện tranh</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className='grid w-full grid-cols-4 items-start gap-4'>
            <Label className='text-right'>Mô tả</Label>
            <Textarea
              className='col-span-3'
              placeholder='Nhập mô tả danh mục tại đây.'
              value={props.category?.description}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type='button'>Lưu</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
