import React, { LegacyRef, useEffect } from 'react'

import { Editor as ToastUIEditor } from '@toast-ui/react-editor'
import { message } from 'antd'
import { Button, Row, Col } from 'antd'
import { NextPageContext } from 'next'
import dynamic from 'next/dynamic'
import { useRecoilState, useSetRecoilState } from 'recoil'

import HistoryTimeline from 'src/components/memo/HistoryTimeline'
import {
  historiesState,
  historyIndexState,
  loadHistories,
  addHistory,
  AddHistoryProps,
} from 'src/state/history'
import { HistoryInfo } from 'src/types/history'

const PostEditor = dynamic(() => import('src/components/ToastEditor'), {
  ssr: false,
})

const Editor = ({ histories }: { histories: HistoryInfo[] }): JSX.Element => {
  const [historyIndex, setHistoryIndex] = useRecoilState(historyIndexState)
  const setHistories = useSetRecoilState(historiesState)
  const editorRef: LegacyRef<ToastUIEditor> = React.createRef()

  useEffect(() => {
    setHistories(histories)
  }, [])

  const addMemo = async () => {
    const innerText = editorRef.current?.getInstance().getHtml()
    if (innerText === undefined) {
      return message.error('아무것도 입력되지 않았습니다!')
    }

    const newHistory: AddHistoryProps = { ...histories[0], text: innerText }
    delete newHistory._id
    if (newHistory.createdAt) delete newHistory.createdAt

    addHistory(newHistory)
  }

  return (
    <>
      <Row justify="end">
        <Col span={4}>
          <Button danger>취소</Button>
        </Col>
        <Col span={4}>
          <Button type="primary" onClick={addMemo}>
            저장
          </Button>
        </Col>
      </Row>
      <Row justify="space-around">
        <Col xs={24} md={17}>
          <PostEditor
            text={
              histories.length !== 0
                ? histories[historyIndex].text
                : '메모가 없습니다'
            }
            editorRef={editorRef}
          />
        </Col>
        <Col xs={24} md={6}>
          <HistoryTimeline histories={histories} />
        </Col>
      </Row>
    </>
  )
}

export default Editor

export async function getServerSideProps(ctx: NextPageContext) {
  const { memoId } = ctx.query

  const loadMemo = async () => {
    console.log({ loadMemo_memoId: memoId })
    if (!memoId || typeof memoId === 'object') {
      return [{ text: '에러가 발생했습니다! 이전 페이지로 돌아가주세요' }]
    }
    const historyInfo = await loadHistories(memoId)
    return historyInfo
  }

  const histories = await loadMemo()

  return {
    props: {
      histories,
    },
  }
}
