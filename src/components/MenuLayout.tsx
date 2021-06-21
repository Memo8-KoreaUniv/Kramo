import React, { useState } from 'react'
import { useCallback } from 'react'

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
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'

import {
  addCategories,
  categoriesState,
  categoryAddAvailState,
} from 'src/state/categories'
import { categoryState } from 'src/state/category'
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
  const setCategory = useSetRecoilState(categoryState)
  const menuCollapsed = useRecoilValue(menuCollapsedState)
  const categoryAddAvail = useRecoilValue(categoryAddAvailState)

  const [isModalVisible, setIsModalVisible] = useState(false)
  const [categoryValue, setCategoryValue] = useState('')

  const showModal = useCallback(() => {
    setIsModalVisible(true)
  }, [isModalVisible])

  const handleOk = useCallback(async () => {
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
  }, [categories, isModalVisible, me, me?._id, categoryAddAvail, categoryValue])

  const handleCancel = useCallback(() => {
    setIsModalVisible(false)
  }, [isModalVisible])

  const onClickCategory = useCallback(
    (category: CategoryInfo) => () => {
      setCategory(category)
      setCategoryValue(category.name)
    },
    [categories],
  )

  return (
    <>
      <Modal
        title="카테고리를 추가하시겠습니까?"
        visible={isModalVisible}
        okText="확인"
        cancelText="취소"
        onOk={handleOk}
        onCancel={handleCancel}
        destroyOnClose={true}>
        <Input
          value={categoryValue}
          onChange={(e) => {
            setCategoryValue(e.target.value)
          }}
          placeholder="카테고리명"
        />
      </Modal>
      <Divider style={{ color: MENU_LABEL_COLOR }} />
      <CategoryTitleLabel collapsed={menuCollapsed} me={me} />
      <br />
      <Menu style={{ zIndex: 5 }} mode="inline" theme="dark">
        {(categories as any).map((category: CategoryInfo) => {
          return (
            <Menu.Item
              key={`menu_${category._id}`}
              icon={<FolderFilled />}
              onClick={onClickCategory(category)}>
              <Link href={`/?categoryId=${category._id}`}>
                <a>{category.name}</a>
              </Link>
            </Menu.Item>
          )
        })}

        {me ? (
          categoryAddAvail ? (
            <Menu.Item
              key="1"
              icon={<PlusCircleOutlined />}
              onClick={showModal}>
              추가
            </Menu.Item>
          ) : (
            <Typography>카테고리 가득 참</Typography>
          )
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
