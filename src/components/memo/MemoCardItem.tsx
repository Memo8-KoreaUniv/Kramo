import React, { useState, useEffect } from 'react'

import {
  DeleteOutlined,
  EditOutlined,
  FolderOpenOutlined,
  PushpinFilled,
  PushpinOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { Avatar, Button, Card, Col, Divider, Drawer, Row } from 'antd'
import Link from 'next/link'

import { MemoInfo } from 'src/types/memo'
import { sm, useWindowSize } from 'src/utils/size'

import MemoDetail from './MemoDetail'

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

  useEffect(()=>{
    if (currentMemo !== memo._id) {
      setVisible(false)
    }
  }, [currentMemo])

  const showDrawer = () => {
    setCurrentMemo(memo._id)
    setVisible(true)
  }

  const onClose = () => {
    setVisible(false)
  }

  const togglePinned = () => {
    sortMemos(memo.memo._id)
  }

  return (
    <Card
      style={{ width: useWindowSize()[0] > sm ? 300 : 280 }}
      size={useWindowSize()[0] > sm ? 'default' : 'small'}
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
              <Col span={20}>{memo.text.split('\n')[0]}</Col>
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
            {memo.text.split('\n')[0]}
            <br />
            ...
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
        title={memo.text.split('\n')[0]}
        placement="right"
        closable={true}
        onClose={onClose}
        visible={visible}
        width={useWindowSize()[0] > sm ? 512 : 256}
        mask={false}
        destroyOnClose={true}>
        <MemoDetail
          gps={memo.gps}
          weather={memo.weather}
          updatedAt={memo.updatedAt}
          darkMode={false}
        />
        <Divider />
        {memo.text.split('\n').map((line: string) => {
          return (
            <span key={`span_1_${line}`}>
              {line}
              <br />
            </span>
          )
        })}
      </Drawer>
    </Card>
  )
}

export default MemoCardItem
