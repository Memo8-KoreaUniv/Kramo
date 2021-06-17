import { useState } from 'react'

import kaxios from 'src/interceptors'
import { MemoInfo } from 'src/types/memo'

export default function useMemos() {
  const [memos, setMemos] = useState<MemoInfo[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  const loadMemos = async (userId: string) => {
    setLoading(true)
    try {
      const res = await kaxios({
        url: `/user/${userId}/memos`,
        method: 'get',
        params: {
          page: 1,
          count: 10,
        },
      })
      const loadedMemos = res.data.memos
      setMemos(loadedMemos as MemoInfo[])
    } catch (e) {
      console.error(e)
    }
    setLoading(false)
  }

  const loadCategoryMemos = async (categoryId: string) => {
    setLoading(true)

    try {
      const res = await kaxios({
        url: `/category/${categoryId}/memos`,
        method: 'get',
        params: {
          page: 1,
          count: 10,
        },
      })
      const loadedMemos = res.data.memos
      setMemos(loadedMemos as MemoInfo[])
    } catch (e) {
      console.error(e)
    }
    setLoading(false)
  }

  const addMemo = async (userId: string, category: string, text: string) => {
    setLoading(true)

    const body: any = {
      user: userId,
      category: category,
      text: text,
      weather: {
        id: 0,
        main: '날씨맑음',
        description: '날씨맑음',
        icon: 'b01',
      },
      gps: {
        latitude: '37.663872',
        longitude: '126.769791',
      },
    }
    try {
      await kaxios({
        url: `/memo`,
        method: 'post',
        data: body,
      })
    } catch (e) {
      console.error(e)
    }
    setLoading(false)
  }

  const deleteMemo = async (memoId: string) => {
    setLoading(true)
    try {
      await kaxios({
        url: `/memo/${memoId}`,
        method: 'delete',
      })
      const newMemos = memos.filter(
        (memo: MemoInfo) => memo.memo._id !== memoId,
      )
      setMemos(newMemos)
    } catch (e) {
      console.error(e)
    }
    setLoading(false)
  }

  const sortMemos = (memoId: string) => {
    setLoading(true)
    const newMemos = memos
      .map((memo: MemoInfo) => {
        if (memo.memo._id === memoId) {
          try {
            memo.memo.pinned ? unpinMemo(memoId) : pinMemo(memoId)
            memo.memo.pinned = !memo.memo.pinned
          } catch (e) {
            return memo
          }
        }
        return memo
      })
      .sort(
        (a: MemoInfo, b: MemoInfo) =>
          (b.memo.pinned ? 1 : 0) - (a.memo.pinned ? 1 : 0),
      )
    setMemos(newMemos)
    setLoading(false)
  }

  const pinMemo = async (memoId: string) => {
    setLoading(true)
    try {
      await kaxios({
        url: `/memo/${memoId}/pin`,
        method: 'post',
      })
    } catch (e) {
      console.error(e)
    }
    setLoading(false)
  }

  const unpinMemo = async (memoId: string) => {
    setLoading(true)
    try {
      await kaxios({
        url: `/memo/${memoId}/pin`,
        method: 'delete',
      })
    } catch (e) {
      console.error(e)
    }
    setLoading(false)
  }

  return {
    memos,
    setMemos,
    loadMemos,
    addMemo,
    deleteMemo,
    sortMemos,
    loadCategoryMemos,
    loading,
  }
}
