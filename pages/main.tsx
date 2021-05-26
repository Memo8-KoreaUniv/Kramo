import React, { useState } from 'react'
import {
  Card,
  Avatar,
  Row,
  Col,
  Divider,
  Timeline,
  Modal,
  Button,
  Drawer,
} from 'antd'
import {
  EditOutlined,
  DeleteOutlined,
  UserOutlined,
  EnvironmentOutlined,
  PushpinOutlined,
  PushpinFilled,
  FolderOpenOutlined,
} from '@ant-design/icons'
import { memo, info, MOCK_DATA } from './index'
import Link from 'next/link'

function useMemos() {
  const [memos, setMemos] = useState<memo[]>(MOCK_DATA)

  const deleteMemo = (id: string) => {
    const newMemos = memos.filter((memo) => memo.id !== id)
    setMemos(newMemos)
  }

  return {
    memos,
    deleteMemo,
  }
}

export function Main() {
  const { memos, deleteMemo } = useMemos()

  return (
    <div
      className="site-layout-background"
      style={{ padding: 24, textAlign: 'left' }}>
      <Row>
        <MemoView memos={memos} deleteMemo={deleteMemo} />
        <MemoTimeline />
      </Row>
    </div>
  )
}

function MemoView({ memos, deleteMemo }) {
  return (
    <Col span={18}>
      <div className="site-card-wrapper">
        <Row>
          {memos.map((memo: memo, index: number) => {
            return (
              <>
                <Col className="gutter-row" span={8}>
                  <MemoCardItem memo={memo} deleteMemo={deleteMemo} />
                </Col>
                {index % 3 == 2 ? <Divider /> : ''}
              </>
            )
          })}
        </Row>
      </div>
    </Col>
  )
}

function MemoTimeline() {
  return (
    <Col span={6}>
      <h1>Timeline</h1>
      <Timeline>
        <Timeline.Item color="blue">
          2021년 5월 21일 12:53
          <br />
          스타벅스 주엽강선점
        </Timeline.Item>
        <Timeline.Item color="blue">
          2021년 5월 22일 10:32
          <br />
          일산호수공원
        </Timeline.Item>
        <Timeline.Item color="gray" />
        <Timeline.Item color="gray" />
      </Timeline>
    </Col>
  )
}

function MemoInfo({ info }) {
  return (
    <span>
      <Row>
        <Col span={4} style={{ textAlign: 'center' }}>
          {info.weather}
        </Col>
        <Col span={20}>{info.time}</Col>
      </Row>
      <Row>
        <Col span={4} style={{ textAlign: 'center' }}>
          <EnvironmentOutlined />
        </Col>
        <Col span={20}>{info.place}</Col>
      </Row>
    </span>
  )
}

function MemoCardItem({ memo, deleteMemo }) {
  const { Meta } = Card
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isMemoPinned, setIsMemoPinned] = useState(false)
  const [visible, setVisible] = useState(false)

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleOk = () => {
    setIsModalVisible(false)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const showDrawer = () => {
    setVisible(true)
  }

  const onClose = () => {
    setVisible(false)
  }

  const togglePinned = () => {
    setIsMemoPinned(!isMemoPinned)
  }

  return (
    <Card
      style={{ width: 300 }}
      actions={[
        <FolderOpenOutlined key="open" onClick={showDrawer} />,
        <Link href={{ pathname: '/editor' }}>
          <EditOutlined key="edit" />
        </Link>,
        <DeleteOutlined key="delete" onClick={() => deleteMemo(memo.id)} />,
      ]}>
      <Meta
        avatar={<Avatar icon={<UserOutlined />} />}
        title={
          <>
            <Row>
              <Col span={20}>{memo.title}</Col>
              <Col span={4}>
                <Button
                  shape="circle"
                  icon={isMemoPinned ? <PushpinFilled /> : <PushpinOutlined />}
                  onClick={togglePinned}
                />
              </Col>
            </Row>
          </>
        }
        description={
          <>
            {memo.content.split('\n')[0]}
            <br />
            ...
            <Divider />
            <MemoInfo info={memo.infos[memo.infos.length - 1]} />
          </>
        }
      />
      <Drawer
        title={memo.title}
        placement="right"
        closable={true}
        onClose={onClose}
        visible={visible}>
        <Timeline>
          {memo.infos.map((info: info) => {
            return (
              <>
                <Timeline.Item color="blue">
                  <MemoInfo info={info} />
                </Timeline.Item>
              </>
            )
          })}
        </Timeline>
        <Divider />
        {memo.content.split('\n').map((line: string) => {
          return (
            <span key={`span_1_${line}`}>
              {line}
              <br />
            </span>
          )
        })}
      </Drawer>
      <Modal
        title={memo.title}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}>
        <Timeline>
          {memo.infos.map((info: info) => {
            return (
              <>
                <Timeline.Item color="blue">
                  <MemoInfo info={info} />
                </Timeline.Item>
              </>
            )
          })}
        </Timeline>
        <Divider />
        {memo.content.split('\n').map((line: string) => {
          return (
            <span key={`span_2_${line}`}>
              {line}
              <br />
            </span>
          )
        })}
      </Modal>
    </Card>
  )
}
