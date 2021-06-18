import { atom, selector } from 'recoil'

import { CategoryInfo } from 'src/types/category'

export const categoryState = atom<CategoryInfo | null>({
  key: 'categoryState',
  default: null,
})

export const categorySubtitleState = selector<string>({
  key: 'categorySubtitleState',
  get: ({ get }) => {
    const categoryInstance = get(categoryState)
    if (categoryInstance?.name) {
      return categoryInstance?.name
    }
    return '전체 메모'
  },
})
