import { atom, selector } from 'recoil'

import kaxios from 'src/interceptors'
import { GPS, Weather } from 'src/types'
import { CategoryInfo } from 'src/types/category'
import { HistoryInfo } from 'src/types/history'
import { MemoInfo } from 'src/types/memo'
import { UserInfo } from 'src/types/user'

export interface AddHistoryProps {
  _id?: string
  user: UserInfo
  category: CategoryInfo
  memo: MemoInfo
  text: string
  createdAt?: Date
  weather: Weather
  gps: GPS
}

export const historyIndexState = atom<number>({
  key: 'historyIndex',
  default: 0,
})

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
    return res?.data.histories
  } catch (e) {
    console.error(e)
    return false
  }
}

export const addHistory = async (newHistory: AddHistoryProps) => {
  try {
    const memoId = newHistory.memo._id
    const res = await kaxios({
      url: `/memo/${memoId}`,
      method: 'post',
      data: { ...newHistory },
    })
    return res?.data?.newMemo
  } catch (e) {
    console.error(e)
    if (e.response.data?.alertText) {
      return e.response.data?.alertText
    }
    return false
  }
}