import React, { useState } from 'react'

import {
  PlusCircleOutlined,
  UserAddOutlined,
  UserOutlined,
  BookTwoTone,
  AppstoreTwoTone,
} from '@ant-design/icons'
import { Divider, Input, Menu, message, Typography } from 'antd'
import Modal from 'antd/lib/modal/Modal'
import Link from 'next/link'
import { useRecoilState, useRecoilValue } from 'recoil'

import {
  addCategories,
  categoriesState,
  categoryAddAvailState,
} from 'src/state/categories'
import { menuCollapsedState } from 'src/state/etc'
import { meState } from 'src/state/me'
import { CategoryInfo } from 'src/types/category'
import { FlexDiv } from 'style/div'

const MENU_LABEL_COLOR = '#fff5eb'

const CategoryTitleLabel = ({ collapsed }: { collapsed: boolean }) => {
  return (
    <FlexDiv>
      {collapsed ? (
        <BookTwoTone twoToneColor="white" style={{ fontSize: '1.5rem' }} />
      ) : (
        <Typography.Title level={4} style={{ color: MENU_LABEL_COLOR }}>
          카테고리
        </Typography.Title>
      )}
    </FlexDiv>
  )
}

const ElseLabel = ({ collapsed }: { collapsed: boolean }) => {
  return (
    <FlexDiv>
      {collapsed ? (
        <AppstoreTwoTone twoToneColor="white" style={{ fontSize: '1.5rem' }} />
      ) : (
        <Typography.Title level={4} style={{ color: MENU_LABEL_COLOR }}>
          기타 메뉴
        </Typography.Title>
      )}
    </FlexDiv>
  )
}

const MenuLayout = () => {
  const me = useRecoilValue(meState)
  const [categories, setCategories] = useRecoilState(categoriesState)
  const menuCollapsed = useRecoilValue(menuCollapsedState)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [categoryValue, setCategoryValue] = useState('')
  const categoryAddAvail = useRecoilValue(categoryAddAvailState)

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleOk = async () => {
    setIsModalVisible(false)
    if (!me || !me._id) {
      return message.error('로그인이 필요합니다!')
    }
    if (!categoryAddAvail) {
      return message.error('카테고리가 꽉찼습니다!')
    }
    const newCategory = await addCategories(me?._id, categoryValue)
    if (typeof newCategory === 'string') {
      return message.error(newCategory)
    }
    setCategories([newCategory, ...categories])
    message.info('카테고리 추가 성공!')
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }
  return (
    <>
      <Modal
        title="카테고리를 추가하시겠습니까?"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}>
        <Input
          value={categoryValue}
          onChange={(e) => {
            setCategoryValue(e.target.value)
          }}
          placeholder="카테고리명"
        />
      </Modal>
      <Divider style={{ color: MENU_LABEL_COLOR }} />
      <CategoryTitleLabel collapsed={menuCollapsed} />
      <Menu style={{ zIndex: 5 }} mode="inline" theme="dark">
        {categories.map((category: CategoryInfo) => {
          return (
            <Menu.Item key={`menu_${category._id}`}>{category.name}</Menu.Item>
          )
        })}
        {categoryAddAvail ? (
          <Menu.Item key="1" icon={<PlusCircleOutlined />} onClick={showModal}>
            추가
          </Menu.Item>
        ) : (
          ''
        )}
        <Divider style={{ color: MENU_LABEL_COLOR }} />
        <ElseLabel collapsed={menuCollapsed} />
        {me?._id ? (
          <Menu.Item key="2" icon={<UserOutlined />}>
            <Link href="/mypage">
              <a>마이페이지</a>
            </Link>
          </Menu.Item>
        ) : (
          <Menu.Item key="2" icon={<UserOutlined />}>
            <Link href="/login">
              <a>로그인</a>
            </Link>
          </Menu.Item>
        )}
        <Menu.Item key="3" icon={<UserAddOutlined />}>
          <Link href="/register">
            <a>회원가입</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="4" icon={<UserOutlined />}>
          <Link href="/metest">
            <a>내정보 로드 테스트</a>
          </Link>
        </Menu.Item>
      </Menu>
    </>
  )
}

export default MenuLayout
