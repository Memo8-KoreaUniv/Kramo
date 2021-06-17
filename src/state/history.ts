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
    return res?.data.histories
  } catch (e) {
    console.error(e)
    return false
  }
}

export const addHistories = async (newHistory:HistoryInfo) => {

  try {
    const memoId = newHistory.memo._id
    const res = await kaxios({
      url: `/memo/${memoId}`,
      method: 'post',
      data:{...newHistory},
    })
    return res?.data.histories
  } catch (e) {
    console.error(e)
    if (e.response.data?.alertText) {
      return e.response.data?.alertText
    }
    return false
  }
}