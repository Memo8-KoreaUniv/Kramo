import React, { useState } from 'react'

import {
  PlusCircleOutlined,
  FolderFilled,
  BookTwoTone,
  SmileTwoTone,
  UserOutlined,
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
import { UserInfo } from 'src/types/user'
import { FlexDiv } from 'style/div'

const MENU_LABEL_COLOR = '#fff5eb'

const CategoryTitleLabel = ({
  me = null,
  collapsed,
}: {
  me: UserInfo | null
  collapsed: boolean
}) => {
  return me ? (
    <FlexDiv>
      {collapsed ? (
        <BookTwoTone twoToneColor="white" style={{ fontSize: '1.5rem' }} />
      ) : (
        <Typography.Title level={4} style={{ color: MENU_LABEL_COLOR }}>
          카테고리
        </Typography.Title>
      )}
    </FlexDiv>
  ) : (
    <FlexDiv>
      {collapsed ? (
        <SmileTwoTone twoToneColor="white" style={{ fontSize: '1.5rem' }} />
      ) : (
        <Typography.Title level={4} style={{ color: MENU_LABEL_COLOR }}>
          로그인 필요
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

  console.log(menuCollapsed)
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
        onCancel={handleCancel}
        destroyOnClose={true}>
        <Input
          value={categoryValue}
          onChange={(e) => {
            setCategoryValue(e.target.value)
          }}
          placeholder="카테고리명"
          autoFocus={true}
        />
      </Modal>
      <Divider style={{ color: MENU_LABEL_COLOR }} />
      <CategoryTitleLabel collapsed={menuCollapsed} me={me} />
      <br />
      <Menu style={{ zIndex: 5 }} mode="inline" theme="dark">
        {categories.map((category: CategoryInfo) => {
          return (
            <Menu.Item key={`menu_${category._id}`} icon={<FolderFilled />}>
              {category.name}
            </Menu.Item>
          )
        })}
        {categoryAddAvail ? (
          <Menu.Item key="1" icon={<PlusCircleOutlined />} onClick={showModal}>
            추가
          </Menu.Item>
        ) : (
          <Menu.Item key="0_login" icon={<UserOutlined />}>
            <Link href="/login">
              <a>로그인</a>
            </Link>
          </Menu.Item>
        )}
      </Menu>
    </>
  )
}

export default MenuLayout
