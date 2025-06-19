export type Category = {
  id: string
  name: string
  parent: Category | null
}
export const categories: Category[] = [
  {
    id: '1',
    name: 'ALL_CATEGORY',
    parent: null,
  },
  {
    id: '2',
    name: 'VN_BOOK',
    parent: {
      id: '1',
      name: 'ALL_CATEGORY',
      parent: null,
    },
  },
  {
    id: '3',
    name: 'F_BOOK',
    parent: {
      id: '1',
      name: 'ALL_CATEGORY',
      parent: null,
    },
  },
  {
    id: '4',
    name: 'LIGHT_NOVEL',
    parent: {
      id: '2',
      name: 'VN_BOOK',
      parent: {
        id: '1',
        name: 'ALL_CATEGORY',
        parent: null,
      },
    },
  },
  {
    id: '5',
    name: 'MANGA',
    parent: {
      id: '2',
      name: 'VN_BOOK',
      parent: {
        id: '1',
        name: 'ALL_CATEGORY',
        parent: null,
      },
    },
  },
  {
    id: '6',
    name: 'LIGHT_NOVEL',
    parent: {
      id: '3',
      name: 'F_BOOK',
      parent: {
        id: '1',
        name: 'ALL_CATEGORY',
        parent: null,
      },
    },
  },
  {
    id: '7',
    name: 'MANGA',
    parent: {
      id: '3',
      name: 'F_BOOK',
      parent: {
        id: '1',
        name: 'ALL_CATEGORY',
        parent: null,
      },
    },
  },
  {
    id: '8',
    name: 'ART_ANIME_CHAR',
    parent: {
      id: '3',
      name: 'F_BOOK',
      parent: {
        id: '1',
        name: 'ALL_CATEGORY',
        parent: null,
      },
    },
  },
]
