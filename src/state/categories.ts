import { atom, selector } from 'recoil'

import kaxios from 'src/interceptors'
import { CategoryInfo } from 'src/types/category'

const CATEGORY_MAX_NUMBER = 10

export const categoriesState = atom<CategoryInfo[] | []>({
  key: 'categories',
  default: [],
})

export const isCategoryLoadedState = selector<boolean>({
  key: 'isCategoryLoaded',
  get: ({ get }) => {
    const categoryInstance = get(categoriesState)
    return categoryInstance.length != 0
  },
})

export const isCategoryLoadingTriedState = atom<boolean>({
  key: 'isCategoryLoadingTried',
  default: false,
})

export const categoryAddAvailState = selector<boolean>({
  key: 'categoryAddAvail',
  get: ({ get }) => {
    const categoryInstance = get(categoriesState)
    return categoryInstance.length < CATEGORY_MAX_NUMBER
  },
})

export const loadCategories = async (userId: string) => {
  try {
    const res = await kaxios({
      url: `/user/${userId}/categories`,
      method: 'get',
    })
    return res.data.categories
  } catch (e) {
    console.error(e)
    if (e.response?.data?.alertText) {
      return e.response?.data?.alertText
    }
    return false
  }
}

export const addCategories = async (userId: string, name: string) => {
  try {
    const res = await kaxios({
      url: `/user/${userId}/category`,
      method: 'post',
      params: { name },
    })
    return res.data.category
  } catch (e) {
    console.error(e)
    if (e.response?.data?.alertText) {
      return e.response?.data?.alertText
    }
    return false
  }
}
