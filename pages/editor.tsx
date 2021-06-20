import React, { LegacyRef, useEffect, useState } from 'react'

import { Editor as ToastUIEditor } from '@toast-ui/react-editor'
import { message } from 'antd'
import { Button, Row, Col } from 'antd'
import { NextPageContext } from 'next'
import { useRouter } from 'next/dist/client/router'
import dynamic from 'next/dynamic'
import { useRecoilState } from 'recoil'

import HistoryTimeline from 'src/components/memo/HistoryTimeline'
import {
  historiesState,
  historyIndexState,
  loadHistories,
  addHistory,
  AddHistoryProps,
} from 'src/state/history'
import { HistoryInfo } from 'src/types/history'
import { FlexDiv } from 'style/div'

const PostEditor = dynamic(() => import('src/components/ToastEditor'), {
  ssr: false,
})

const Editor = ({
  initialHistories,
}: {
  initialHistories: HistoryInfo[]
}): JSX.Element => {
  const router = useRouter()
  const [text, setText] = useState('')
  const [historyIndex, setHistoryIndex] = useRecoilState(historyIndexState)
  const [histories, setHistories] = useRecoilState(historiesState)
  const editorRef: LegacyRef<ToastUIEditor> = React.createRef()

  useEffect(() => {
    setHistories(initialHistories)
  }, [])

  useEffect(() => {
    const changedText =
      histories.length !== 0 ? histories[historyIndex].text : '메모가 없습니다'
    setText(changedText)
    editorRef.current?.getInstance().setHtml(changedText)
  }, [histories, historyIndex])

  const addMemo = async () => {
    const innerText = editorRef.current?.getInstance().getHtml()
    if (innerText === undefined) {
      return message.error('아무것도 입력되지 않았습니다!')
    }

    const newHistory: AddHistoryProps = { ...histories[0], text: innerText }
    delete newHistory._id
    if (newHistory.createdAt) delete newHistory.createdAt

    const newMemo = await addHistory(newHistory)
    if (newMemo) {
      setHistories([newMemo, ...histories])
      setHistoryIndex(0)
      return message.info('저장 성공!')
    }
    return message.error('저장이 실패하였습니다.')
  }

  const onClickCancel = () => {
    router.back()
  }

  return (
    <>
      <Row style={{ marginBottom: '0.5rem' }}>
        <Col xs={24} md={17}></Col>
        <Col xs={24} md={6}>
          <FlexDiv direction="row" justify="flex-end">
            <Button danger onClick={onClickCancel}>
              취소
            </Button>
            <Button type="primary" onClick={addMemo}>
              저장
            </Button>
          </FlexDiv>
        </Col>
      </Row>
      <Row justify="space-around">
        <Col xs={24} md={17}>
          <PostEditor text={text} editorRef={editorRef} />
        </Col>
        <Col xs={24} md={6}>
          <HistoryTimeline />
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

  const initialHistories = await loadMemo()

  return {
    props: {
      initialHistories,
    },
  }
}
