import { atom, selector } from 'recoil'

import kaxios from 'src/interceptors'
import { HistoryInfo } from 'src/types/history'

export const historiesState = atom<HistoryInfo[] | []>({
  key: 'histories',
  default: [],
})

export const isHistoryLoadedState = selector<boolean>({
  key: 'isHistoryLoaded',
  get: ({ get }) => {
    const historyInstance = get(historiesState)
    return historyInstance.length != 0
  },
})

export const loadHistories = async (memoId: string) => {
  try {
    const res = await kaxios({
      url: `/memo/${memoId}`,
      method: 'get',
    })
    return res.data.histories
  } catch (e) {
    console.error(e)
    return false
  }
}