import { atom, selector } from 'recoil'

import kaxios from 'src/interceptors'
import { CategoryInfo } from 'src/types/category'

export const categoryState = atom<CategoryInfo | null>({
  key: 'categoryState',
  default: null,
})

export const categorySubTitleState = selector<string>({
  key: 'categorySubTitleState',
  get: ({ get }) => {
    const categoryInstance = get(categoryState)
    if (categoryInstance?.name) {
      return categoryInstance?.name
    }
    return '전체 메모'
  },
})

export const deleteCategory = async (categoryId: string) => {
  try {
    const res = await kaxios({
      url: `/category/${categoryId}`,
      method: 'delete',
    })
    return res.data
  } catch (e) {
    console.error(e)
    if (e.response?.data?.alertText) {
      return e.response?.data?.alertText
    }
    return false
  }
}
