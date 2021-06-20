import React, { memo, useState, useEffect } from 'react'

import {
  DeleteOutlined,
  EditOutlined,
  FolderOpenOutlined,
  PushpinFilled,
  PushpinOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { Avatar, Button, Card, Col, Divider, Drawer, Row, Timeline } from 'antd'
import Link from 'next/link'
import styled from 'styled-components'

import { MemoInfo } from 'src/types/memo'
import { sm } from 'src/utils/size'
import { useMemoPreview } from 'src/utils/useMemoPreview'
import { getPlace } from 'src/utils/gps'

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
}: {
  memo: MemoInfo
  deleteMemo: (memoId: string) => void
  sortMemos: (memoId: string) => void
}) {
  const { Meta } = Card
  const [visible, setVisible] = useState(false)
  const { memoPreviewTitle, memoPreviewDetail } = useMemoPreview(memo.text)

  const showDrawer = () => {
    setVisible(true)
  }

  const onClose = () => {
    setVisible(false)
  }

  const togglePinned = () => {
    sortMemos(memo.memo._id)
  }

  const { latitude, longitude } = memo.gps
  const [place, setPlace] = useState<string>('알 수 없음')

  useEffect(() => {
    getPlace(latitude, longitude).then((loadedPlace) => setPlace(loadedPlace))
  }, [])

  return (
    <FlexibleCard
      actions={[
        <FolderOpenOutlined key="open" onClick={showDrawer} />,
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
              place={place}
              weather={memo.weather}
              updatedAt={memo.updatedAt}
              darkMode={false}
            />
          </>
        }
      />
      <Drawer
        title={memoPreviewTitle}
        placement="right"
        closable={true}
        onClose={onClose}
        visible={visible}>
        <Timeline>
          <MemoDetail
            place={place}
            weather={memo.weather}
            updatedAt={memo.updatedAt}
            darkMode={true}
          />
        </Timeline>
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
