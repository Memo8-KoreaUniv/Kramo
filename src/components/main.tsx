import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { meState } from '../state/me';
import kaxios from 'src/interceptors';

import {
  DeleteOutlined,
  EditOutlined,
  EnvironmentOutlined,
  FolderOpenOutlined,
  PushpinFilled,
  PushpinOutlined,
  UserOutlined,
  PlusOutlined,
} from '@ant-design/icons'
import {
  Avatar,
  Button,
  Card,
  Col,
  Divider,
  Drawer,
  Modal,
  Row,
  Timeline,
  Input,
  Select,
} from 'antd'
import Link from 'next/link'

import { sm, md, useWindowSize } from 'src/utils/size'

import { MemoInfo } from '../types/memo'

function useMemos() {
  const [memos, setMemos] = useState<MemoInfo[]>([])

  const loadMemos = async (userId: string) => {
    try {
        const res = await kaxios({
          url: `/user/${userId}/memos`,
          method: 'get',
          params: {
            page: 1,
            count: 10,
          }
        })
        const loadedMemos = res.data.memos
        initPin(userId, loadedMemos as MemoInfo[])
      } catch (e) {
        console.error(e)
      }
    }

  const addMemo = async (userId: string, category: string, text: string) => {
    const body: object = {
      "user": userId,
      "category": category,
      "text": text,
      "weather": {
        "id": 0,
        "main": "날씨맑음",
        "description": "날씨맑음",
        "icon": "b01"
      },
      "gps": {
        "latitude": "37.663872",
        "longitude": "126.769791",
      }
    }
    try {
      await kaxios({
        url: `/memo`,
        method: 'post',
        data: body,
        })
    } catch (e) {
      console.error(e)
    }
  }

  const deleteMemo = async (memoId: string) => {
    try {
      await kaxios({
        url: `/memo/${memoId}`,
        method: 'delete',
      })
      const newMemos = memos.filter((memo: MemoInfo) => memo.memo !== memoId)
      setMemos(newMemos)
    } catch (e) {
      console.error(e)
    }
  }

  const sortMemos = (memoId: string) => {
    const newMemos = memos.map((memo: MemoInfo) => {
        if (memo.memo === memoId) {
          try {
            memo.pinned ? unpinMemo(memoId) : pinMemo(memoId)
            memo.pinned = !memo.pinned
          } catch(e) {
            return memo
          }
        }
        return memo
      }
    ).sort((a: MemoInfo, b: MemoInfo) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0))
    
    setMemos(newMemos)
  }

  const initPin = async (userId: string, loadedMemos: MemoInfo[]) => {
    try {
      const res = await kaxios({
        url: `/user/${userId}/pin`,
        method: 'get',
      })
      const pinInfo = res.data.pin
      const pinnedMemos = loadedMemos.map((memo) => {
        memo.pinned = pinInfo[memo.memo]
        return memo
        }
      )
      setMemos(pinnedMemos)
    } catch (e) {
      console.error(e)
    } 
  }

  const pinMemo = async (memoId: string) => {
    try {
      await kaxios({
        url: `/memo/${memoId}/pin`,
        method: 'post',
      })
    } catch (e) {
      console.error(e)
    }
  }

  const unpinMemo = async (memoId: string) => {
    try {
      await kaxios({
        url: `/memo/${memoId}/pin`,
        method: 'delete',
      })
    } catch (e) {
      console.error(e)
    }
  }

  return {
    memos,
    setMemos,
    loadMemos,
    addMemo,
    deleteMemo,
    sortMemos,
  }
}

export function Main() {
  const { memos, loadMemos, addMemo, deleteMemo, sortMemos } = useMemos()
  const [me] = useRecoilState(meState)

  useEffect(() => {
    if (!me) {
      return
    }
    if (!(me._id)) {
      return
    }
    loadMemos(me._id!);
  },[]);
  

  return (
    <div
      className="site-layout-background"
      style={{ padding: 24, textAlign: 'left' }}>
      <Row>
        <MemoView memos={memos} addMemo={addMemo} deleteMemo={deleteMemo} sortMemos={sortMemos} />
        <MemoTimeline />
      </Row>
    </div>
  )
}

function MemoView({
  memos,
  addMemo,
  deleteMemo,
  sortMemos,
}: {
  memos: MemoInfo[]
  addMemo: (memoId: string, category: string, text: string) => void
  deleteMemo: (memoId: string) => void
  sortMemos: (memoId: string) => void
}) {
  return (
    <Col span={18}>
      <div className="site-card-wrapper">
        <Row gutter={[30, 30]}>
          {memos.sort((a: MemoInfo, b: MemoInfo) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0)).map((memo: MemoInfo) => {
            return (
              <Col key={`Col${memo._id}`}>
                <MemoCardItem
                  key={`MemoCardItem_${memo._id}`}
                  memo={memo}
                  deleteMemo={deleteMemo}
                  sortMemos={sortMemos}
                />
              </Col>
            )
          })}
          <Col key={`ColAddCardButton`}>
            <AddCardButton key={`AddCardButton`} addMemo={addMemo} />
          </Col>
        </Row>
      </div>
    </Col>
  )
}

function MemoTimeline() {
  if (useWindowSize()[0] >= md)
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
  else return <></>
}

function MemoDetail({ gps, weather, updatedAt }: any) {
  return (
    <span>
      <Row>
        <Col span={4} style={{ textAlign: 'center' }}>
          {weather.icon}
        </Col>
        <Col span={20}>{updatedAt}</Col>
      </Row>
      <Row>
        <Col span={4} style={{ textAlign: 'center' }}>
          <EnvironmentOutlined />
        </Col>
        <Col span={20}>{gps.id}</Col>
      </Row>
    </span>
  )
}

function AddCardButton(
  {
    addMemo,
  }: 
  {
    addMemo: (memoId: string, category: string, text: string) => void,
  }
  ) {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [content, setContent] = useState('')
  const [categories, setCategories] = useState([])
  const [categoryId, setCategoryId] = useState('')
  const CategoryPairs: { [key: string]: string } = {}
  const [me] = useRecoilState(meState)

  const { Option } = Select;

  const getCategories = async (userId: string) => {

    try {
      const res = await kaxios({
        url: `/user/${userId}/categories`,
        method: 'get',
        params: {
          count: 10,
        }
      })
      const loadedCategories = res.data.categories
      setCategories(loadedCategories)
    } catch (e) {
      console.error(e)
    }
  }

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleOk = () => {

    addMemo(me!._id!, categoryId, content)
    setIsModalVisible(false)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const { TextArea } = Input;

  if (!me) {
    return <></>
  }

  if (!(me._id)) {
    return <></>
  }

  getCategories(me._id)

  return (
    <>
      <Card 
        style={{ 
          width: useWindowSize()[0] > sm ? 300 : 280, 
          textAlign: 'center', 
          verticalAlign: 'middle', 
          opacity: 0.5,
        }}
        size={useWindowSize()[0] > sm ? 'default' : 'small'}
        onClick={showModal}
      >
        <PlusOutlined style={{ fontSize: '70px' }} />
      </Card>
      <Modal
        title="메모 추가"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Select style={{ width: 120 }} onChange={(value: string)=>setCategoryId(CategoryPairs[value])}>
          {categories.map((category) => {
            CategoryPairs[category.name] = category._id
            return (
              <Option value={category.name}>
                {category.name}
              </Option>
              )
            }
          )}
        </Select>
        <TextArea
          rows={4}
          placeholder="메모 내용" 
          allowClear={true}
          onChange={(e) => setContent(e.target.value)}
        />
      </Modal>
    </>
  )
}

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

  const showDrawer = () => {
    setVisible(true)
  }

  const onClose = () => {
    setVisible(false)
  }

  const togglePinned = () => {
    sortMemos(memo.memo)
  }

  return (
    <Card
      style={{ width: useWindowSize()[0] > sm ? 300 : 280 }}
      size={useWindowSize()[0] > sm ? 'default' : 'small'}
      actions={[
        <FolderOpenOutlined key="open" onClick={showDrawer} />,
        <Link key={`Link_${memo._id}`} href={{ pathname: '/editor' }}>
          <EditOutlined key="edit" />
        </Link>,
        <DeleteOutlined key="delete" onClick={() => deleteMemo(memo.memo)} />,
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
                  icon={memo.pinned ? <PushpinFilled /> : <PushpinOutlined />}
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
            <MemoDetail gps={memo.gps} weather={memo.weather} updatedAt={memo.updatedAt} />
          </>
        }
      />
      <Drawer
        title={memo.text.split('\n')[0]}
        placement="right"
        closable={true}
        onClose={onClose}
        visible={visible}>
        <Timeline>
          {/*memo.infos.map((info: info) => {
            return (
              <div key={`timeline_upper_${info}`}>
                <Timeline.Item color="blue">
                  <MemoInfo info={info} />
                </Timeline.Item>
              </div>
            )
          })*/}
          <MemoDetail gps={memo.gps} weather={memo.weather} updatedAt={memo.updatedAt} />
        </Timeline>
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
