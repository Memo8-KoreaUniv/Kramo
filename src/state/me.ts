import { atom, selector } from 'recoil'

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
