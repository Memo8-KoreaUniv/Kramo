import React, { useEffect } from 'react'

import { Row } from 'antd'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'

import { subtitles } from 'src/enum'
import { categorySubTitleState } from 'src/state/category'
import { subTitleState } from 'src/state/etc'
import { meState } from 'src/state/me'
import useMemos from 'src/utils/useMemos'

import MemoView from './memo/MemoView'
import { Spinner } from './Spinner'

export function Main({ categoryId }: { categoryId?: string | undefined }) {
  const {
    memos,
    loadMemos,
    addMemo,
    deleteMemo,
    sortMemos,
    loadCategoryMemos,
    loading,
  } = useMemos()
  const [me] = useRecoilState(meState)
  const setSubTitle = useSetRecoilState(subTitleState)
  const categorySubTitle = useRecoilValue(categorySubTitleState)

  useEffect(() => {
    if (!me || !me._id) {
      setSubTitle('')
      return
    }
    if (categoryId) {
      loadCategoryMemos(categoryId)
      setSubTitle(categorySubTitle)
      return
    }
    loadMemos(me._id!)
    setSubTitle(subtitles.main)
  }, [me, me?._id, categoryId, categorySubTitle, categorySubTitleState])

  if (loading) {
    return <Spinner></Spinner>
  }

  return (
    <div
      className="site-layout-background"
      style={{ padding: 24, textAlign: 'left' }}>
      <Row>
        {me ? (
          <MemoView
            memos={memos}
            addMemo={addMemo}
            deleteMemo={deleteMemo}
            sortMemos={sortMemos}
          />
        ) : (
          <></>
        )}
      </Row>
    </div>
  )
}
