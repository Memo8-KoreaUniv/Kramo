import { atom, selector } from 'recoil'

import kaxios from 'src/interceptors'
import { UserInfo } from 'src/types/user'

export const meState = atom<UserInfo | null>({
  key: 'me',
  default: null,
})

export const isLogined = selector({
  key: 'isLogined',
  get: ({ get }) => {
    const meInstance = get(meState)
    return meInstance !== null
  },
})

export const loadMe = async () => {
  try {
    const res = await kaxios({ url: `/user`, method: 'get' })
    return res?.data.userInfo
  } catch (e) {
    if (e.message === 'Request failed with status code 401') {
      return
    }
  }
}
