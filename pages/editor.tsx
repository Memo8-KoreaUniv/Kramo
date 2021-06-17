import dynamic from 'next/dynamic'
import React, { LegacyRef, useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { HistoryInfo, AddHistoriesProps } from 'src/types/history'
import { historiesState, loadHistories, addHistories } from 'src/state/history'
import { Editor as ToastUIEditor } from '@toast-ui/react-editor'
import { NextPageContext } from 'next'
import { message } from 'antd'
const PostEditor = dynamic(() => import('src/components/ToastEditor'), {
  ssr: false,
})

const Editor = ({ histories }: { histories: HistoryInfo[] }): JSX.Element => {
  const [_, setHistories] = useRecoilState(historiesState)
  const editorRef: LegacyRef<ToastUIEditor> = React.createRef()

  useEffect(() => {
    setHistories(histories)
  }, [])

  const addMemo = async () => {
    const innerText = editorRef.current?.getInstance().getHtml()
    if (innerText === undefined) {
      return message.error('아무것도 입력되지 않았습니다!')
    }

    const newHistory: AddHistoriesProps = {
      user: histories[0].user._id,
      category: histories[0].category._id,
      text: innerText,
      weather: histories[0].weather,
      gps: histories[0].gps,
    }

    //TODO 날씨
    //TODO GPS 얻기
    addHistories(histories[0].memo._id, newHistory)
    console.log({ ...newHistory })
  }

  return (
    <>
      <PostEditor
        memo={histories.length !== 0 ? histories[0].text : '메모가 없습니다'}
        editorRef={editorRef}
        addMemo={addMemo}
      />
    </>
  )
}

export default Editor

export async function getServerSideProps(ctx: NextPageContext) {
  const { memoId } = ctx.query

  const loadMemo = async () => {
    console.log({ loadMemo_memoId: memoId })
    if (!memoId || typeof memoId === 'object') {
      return
    }
    const historyInfo = await loadHistories(memoId)
    return historyInfo
  }

  const histories = await loadMemo()

  return {
    props: {
      memoId,
      histories,
    },
  }
}
