import React, { memo, useState, useEffect } from 'react'

import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  PushpinFilled,
  PushpinOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { Avatar, Button, Card, Col, Divider, Drawer, Row } from 'antd'
import Link from 'next/link'
import styled from 'styled-components'

import { MemoInfo } from 'src/types/memo'
import { sm, useWindowSize } from 'src/utils/size'
import { useMemoPreview } from 'src/utils/useMemoPreview'

import MemoDetail from './MemoDetail'

const FlexibleCard = styled(Card)`
  width: 260px;
  @media (min-width: ${sm}px) {
    width: 300px;
  }
`

function MemoCardItem({
  memo,
  deleteMemo,
  sortMemos,
  currentMemo,
  setCurrentMemo,
}: {
  memo: MemoInfo
  deleteMemo: (memoId: string) => void
  sortMemos: (memoId: string) => void
  currentMemo: string
  setCurrentMemo: (update: string) => void
}) {
  const { Meta } = Card
  const [visible, setVisible] = useState(false)
  const { memoPreviewTitle, memoPreviewDetail } = useMemoPreview(memo.text)

  useEffect(()=>{
    currentMemo !== memo.memo._id ? setVisible(false) : setVisible(true)
  }, [currentMemo])

  const showDrawer = () => {
    setCurrentMemo(memo.memo._id)
  }

  const onClose = () => {
    setCurrentMemo('')
  }

  const togglePinned = () => {
    sortMemos(memo.memo._id)
  }

  return (
    <FlexibleCard
      actions={[
        <EyeOutlined key="open" onClick={() => {visible ? onClose() : showDrawer()}} />,
        <Link key={`Link_${memo._id}`} href={`/editor?memoId=${memo.memo._id}`}>
          <EditOutlined key="edit" />
        </Link>,
        <DeleteOutlined
          key="delete"
          onClick={() => deleteMemo(memo.memo._id)}
        />,
      ]}>
      <Meta
        avatar={<Avatar icon={<UserOutlined />} />}
        title={
          <>
            <Row>
              <Col span={20}>{memoPreviewTitle}</Col>
              <Col span={4}>
                <Button
                  shape="circle"
                  icon={
                    memo.memo.pinned ? <PushpinFilled /> : <PushpinOutlined />
                  }
                  onClick={togglePinned}
                />
              </Col>
            </Row>
          </>
        }
        description={
          <>
            {memoPreviewDetail}
            <br />
            <Divider />
            <MemoDetail
              gps={memo.gps}
              weather={memo.weather}
              updatedAt={memo.updatedAt}
            />
          </>
        }
      />
      <Drawer
        title={memoPreviewTitle}
        placement="right"
        closable={true}
        onClose={onClose}
        visible={visible}
        width={useWindowSize()[0] > sm ? 512 : 256}
        mask={useWindowSize()[0] > sm ? false : true}
        destroyOnClose={true}>
        <MemoDetail
          gps={memo.gps}
          weather={memo.weather}
          updatedAt={memo.updatedAt}
        />
        <Divider />
          <MemoDetail
            gps={memo.gps}
            weather={memo.weather}
            updatedAt={memo.updatedAt}
            darkMode={true}
          />
        <Divider />
        <span key={`span_1`}>
          {memoPreviewDetail}
          <br />
        </span>
      </Drawer>
    </FlexibleCard>
  )
}

export default memo(
  MemoCardItem,
  (prevProps, nextProps) => prevProps.memo === nextProps.memo,
)
