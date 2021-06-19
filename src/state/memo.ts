import { atom, selector } from 'recoil'

import kaxios from 'src/interceptors'
import { MemoInfo } from 'src/types/memo'

export const memosState = atom<MemoInfo[] | []>({
  key: 'memos',
  default: [],
})

export const isMemoLoadedState = selector<boolean>({
  key: 'isMemoLoaded',
  get: ({ get }) => {
    const memoInstance = get(memosState)
    return memoInstance.length != 0
  },
})

export const loadMemos = async (userId: string) => {
  try {
    const res = await kaxios({
      url: `/user/${userId}/memos`,
      method: 'get',
    })
    return res?.data.memos
  } catch (e) {
    console.error(e)
  }
}