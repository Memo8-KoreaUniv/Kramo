import React, { memo, useMemo, useState } from 'react'

import {
  DeleteOutlined,
  EditOutlined,
  FolderOpenOutlined,
  PushpinFilled,
  PushpinOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { Avatar, Button, Card, Col, Divider, Drawer, Row, Timeline } from 'antd'
import _ from 'lodash'
import Link from 'next/link'
import { parse } from 'node-html-parser'
import styled from 'styled-components'

import { MemoInfo } from 'src/types/memo'
import { sm } from 'src/utils/size'

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

  const memoPreviewTitle = useMemo(() => {
    const parsed = parse(memo.text.split('\n')[0])
    return parsed.text
  }, [memo, memo?.text])

  const memoPreviewDetail = useMemo(() => {
    const texts = _.filter(memo.text.split('\n'), (str) => {
      return !!str
    })
    if (texts.length >= 2) {
      return parse(memo.text).text
    }
    return memoPreviewTitle.trim()
  }, [memo, memo?.text])

  const showDrawer = () => {
    setVisible(true)
  }

  const onClose = () => {
    setVisible(false)
  }

  const togglePinned = () => {
    sortMemos(memo.memo._id)
  }

  return (
    <FlexibleCard
      // size={useWindowSize()[0] > sm ? 'default' : 'small'}
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
            {memoPreviewDetail !== memoPreviewTitle ? '...' : ''}
            <Divider />
            <MemoDetail
              gps={memo.gps}
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
            gps={memo.gps}
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
