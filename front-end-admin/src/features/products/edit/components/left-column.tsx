import SunEditor from 'suneditor-react'
import { useProductNew } from '@/hooks/UseProductNew'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { FileUploader } from './file-uploader'

export default function LeftColumn() {
  const {
    thumbnail,
    setThumbnail,
    title,
    setTitle,
    description,
    setDescription,
  } = useProductNew()
  return (
    <Card className='rounded-none'>
      <CardContent className='flex flex-col gap-6'>
        <div>Hình ảnh sản phẩm</div>
        <div className='mx-auto'>
          <div className='h-[300px] w-[300px]'>
            <FileUploader onChange={setThumbnail} value={thumbnail} />
          </div>
        </div>
        <div>
          <div>Tên sản phẩm</div>
          <div>
            <Input
              value={title}
              onChange={(val) => setTitle(val.target.value)}
              placeholder='Nhập tên sản phẩm...'
            />
          </div>
        </div>
        <div>
          <div>Mô tả sản phẩm</div>
          <SunEditor
            setContents={description}
            onChange={(content: string) => setDescription(content)}
            setOptions={{
              font: [
                'Arial',
                'Courier New',
                'Georgia',
                'Impact',
                'Tahoma',
                'Times New Roman',
                'Verdana',
              ],
              fontSize: [8, 9, 10, 11, 12, 14, 16, 18, 20, 24, 30],
              buttonList: [
                ['undo', 'redo'],
                ['font'],
                ['fontSize'],
                ['formatBlock'],
                ['bold', 'underline', 'italic', 'strike'],
                ['table'],
                ['fullScreen', 'showBlocks', 'codeView'],
              ],
            }}
          />
        </div>
      </CardContent>
    </Card>
  )
}
