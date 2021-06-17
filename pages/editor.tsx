import dynamic from 'next/dynamic'
import React, { LegacyRef, useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { HistoryInfo } from 'src/types/history'
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

    const newHistory: HistoryInfo = { ...histories[0], text: innerText }
    delete newHistory._id
    delete newHistory.createdAt

    addHistories(newHistory)
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
