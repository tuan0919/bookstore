import { useRef, useState, useEffect } from 'react'
import { IconUpload, IconX } from '@tabler/icons-react'
import { Card, CardContent } from '@/components/ui/card'

type FileUploaderProps = {
  value: File | null
  onChange: (file: File | null) => void
  oldImage?: string | null
  onRemoveOldImage?: () => void
}

export function FileUploader({
  value,
  onChange,
  oldImage,
  onRemoveOldImage,
}: FileUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    if (value) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(value)
    } else {
      setPreview(null)
    }
  }, [value])

  const handleClick = () => {
    if (!oldImage) {
      inputRef.current?.click()
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      onRemoveOldImage?.()
      onChange(selectedFile)
    }
  }

  const handleRemove = () => {
    if (oldImage) {
      onRemoveOldImage?.()
    } else {
      onChange(null)
    }
    if (inputRef.current) {
      inputRef.current.value = ''
    }
  }

  const displayImage = preview || oldImage
  const isClickable = !oldImage

  return (
    <Card
      className={`relative overflow-hidden rounded-none border-2 border-dashed p-0 ${
        isClickable ? 'cursor-pointer' : 'cursor-default'
      }`}
      onClick={handleClick}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <CardContent className='flex aspect-square items-center justify-center overflow-hidden p-0'>
        {!displayImage ? (
          <IconUpload className='text-muted-foreground h-8 w-8' />
        ) : (
          <img src={displayImage} alt='preview' className='object-contain' />
        )}
      </CardContent>

      {displayImage && isHovering && (
        <button
          onClick={(e) => {
            e.stopPropagation()
            handleRemove()
          }}
          className='absolute top-2 right-2 rounded-full bg-white/70 p-1 text-red-600 shadow hover:bg-white'
        >
          <IconX size={16} />
        </button>
      )}

      <input
        type='file'
        accept='image/*'
        className='hidden'
        ref={inputRef}
        onChange={handleFileChange}
      />
    </Card>
  )
}
