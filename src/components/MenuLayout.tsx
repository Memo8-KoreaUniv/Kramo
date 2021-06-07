import React from 'react'

import {
  FolderOpenOutlined,
  UserAddOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { Menu } from 'antd'
import Link from 'next/link'
import { useRecoilValue } from 'recoil'

import { categoriesState } from 'src/state/categories'
import { meState } from 'src/state/me'
import { CategoryInfo } from 'src/types/category'

const { SubMenu } = Menu

const MenuLayout = () => {
  const categories = useRecoilValue(categoriesState)
  const me = useRecoilValue(meState)
  return (
    <>
      <Menu style={{ zIndex: 5 }} mode="inline" theme="dark">
        <SubMenu key="sub1" icon={<FolderOpenOutlined />} title="내 메모">
          {categories.map((category: CategoryInfo) => {
            return (
              <Menu.Item key={`menu_${category._id}`}>
                {category.name}
              </Menu.Item>
            )
          })}
        </SubMenu>
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
