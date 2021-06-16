import { atom, selector } from 'recoil'
import kaxios from 'src/interceptors'
import { HistoryInfo } from 'src/types/history'

interface AddHistoriesProps{
  user: string
  category: string
  memo: string
  text: string
  createdAt?: Date
  weather: Weather
  gps: GPS

}

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

export const addHistories = async (history:HistoryInfo) => {

  try {
    const res = await kaxios({
      url: `/memo/${history.memo._id}`,
      method: 'post',
      params: {...history},
    })
    return res.data.category
  } catch (e) {
    console.error(e)
    if (e.response.data?.alertText) {
      return e.response.data?.alertText
    }
    return false
  }
}