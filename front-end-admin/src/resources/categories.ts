export type Category = {
  id: string
  createAt: string
  type: 'Danh mục gốc' | 'Danh mục con'
  parent: Category | null
  name: string
  description: string
}

export const categories: Category[] = [
  {
    id: 'C16276',
    createAt: '23 th4, 2025',
    type: 'Danh mục gốc',
    parent: null,
    name: 'Truyện tiếng Việt',
    description: 'Truyện được sản xuất tại Việt Nam',
  },
  {
    id: 'C16277',
    createAt: '24 th4, 2025',
    type: 'Danh mục con',
    parent: {
      id: 'C16276',
      createAt: '23 th4, 2025',
      type: 'Danh mục gốc',
      parent: null,
      name: 'Truyện tiếng Việt',
      description: 'Truyện được sản xuất tại Việt Nam',
    },
    name: 'Truyện ngắn',
    description: 'Các truyện ngắn Việt Nam',
  },
  {
    id: 'C16278',
    createAt: '24 th4, 2025',
    type: 'Danh mục con',
    parent: {
      id: 'C16276',
      createAt: '23 th4, 2025',
      type: 'Danh mục gốc',
      parent: null,
      name: 'Truyện tiếng Việt',
      description: 'Truyện được sản xuất tại Việt Nam',
    },
    name: 'Truyện dài kỳ',
    description: 'Truyện dài nhiều tập của Việt Nam',
  },
  {
    id: 'C16279',
    createAt: '25 th4, 2025',
    type: 'Danh mục gốc',
    parent: null,
    name: 'Truyện nước ngoài',
    description: 'Truyện được dịch từ nước ngoài',
  },
  {
    id: 'C16280',
    createAt: '25 th4, 2025',
    type: 'Danh mục con',
    parent: {
      id: 'C16279',
      createAt: '25 th4, 2025',
      type: 'Danh mục gốc',
      parent: null,
      name: 'Truyện nước ngoài',
      description: 'Truyện được dịch từ nước ngoài',
    },
    name: 'Truyện Trung Quốc',
    description: 'Truyện dịch từ Trung Quốc',
  },
  {
    id: 'C16281',
    createAt: '25 th4, 2025',
    type: 'Danh mục con',
    parent: {
      id: 'C16279',
      createAt: '25 th4, 2025',
      type: 'Danh mục gốc',
      parent: null,
      name: 'Truyện nước ngoài',
      description: 'Truyện được dịch từ nước ngoài',
    },
    name: 'Truyện Nhật Bản',
    description: 'Truyện dịch từ Nhật Bản',
  },
  {
    id: 'C16282',
    createAt: '26 th4, 2025',
    type: 'Danh mục con',
    parent: {
      id: 'C16279',
      createAt: '25 th4, 2025',
      type: 'Danh mục gốc',
      parent: null,
      name: 'Truyện nước ngoài',
      description: 'Truyện được dịch từ nước ngoài',
    },
    name: 'Truyện Hàn Quốc',
    description: 'Truyện dịch từ Hàn Quốc',
  },
  {
    id: 'C16283',
    createAt: '27 th4, 2025',
    type: 'Danh mục gốc',
    parent: null,
    name: 'Truyện tranh',
    description: 'Truyện tranh các thể loại',
  },
  {
    id: 'C16284',
    createAt: '27 th4, 2025',
    type: 'Danh mục con',
    parent: {
      id: 'C16283',
      createAt: '27 th4, 2025',
      type: 'Danh mục gốc',
      parent: null,
      name: 'Truyện tranh',
      description: 'Truyện tranh các thể loại',
    },
    name: 'Manga',
    description: 'Truyện tranh Nhật Bản',
  },
  {
    id: 'C16285',
    createAt: '27 th4, 2025',
    type: 'Danh mục con',
    parent: {
      id: 'C16283',
      createAt: '27 th4, 2025',
      type: 'Danh mục gốc',
      parent: null,
      name: 'Truyện tranh',
      description: 'Truyện tranh các thể loại',
    },
    name: 'Manhwa',
    description: 'Truyện tranh Hàn Quốc',
  },
]
