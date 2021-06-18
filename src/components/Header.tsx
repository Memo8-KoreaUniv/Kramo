import React, { useCallback } from 'react'

import { UserOutlined } from '@ant-design/icons'
import { SearchOutlined } from '@ant-design/icons'
import { Row, Col, Button, Tooltip, Dropdown, Menu, Layout } from 'antd'
import 'normalize.css'
import 'antd/dist/antd.css'
import { useRouter } from 'next/dist/client/router'
import Link from 'next/link'
import cookie from 'react-cookies'
import { useRecoilState, useSetRecoilState } from 'recoil'

import { categoriesState } from 'src/state/categories'
import { meState } from 'src/state/me'

import MenuDrawer from './MenuDrawer'
import SubTitle from './SubTitle'
import { FlexDiv } from 'style/div'

const HeaderLayout = Layout.Header

const Header = () => {
  const [me, setMe] = useRecoilState(meState)
  const setCategories = useSetRecoilState(categoriesState)
  const router = useRouter()

  const onClickLogout = () => {
    cookie.remove(process.env.NEXT_PUBLIC_JWT_TOKEN_NAME!)
    setMe(null)
    setCategories([])
    alert('로그아웃 성공!')
    router.push('/')
    return
  }

  const loggedOutUserMenu = useCallback(() => {
    return (
      <Button>
        <Link href="/login">
          <a>로그인</a>
        </Link>
      </Button>
    )
  }, [])

  const loggedInUserMenu = useCallback(() => {
    return (
      <Dropdown
        overlay={
          <Menu>
            <Menu.Item>
              <Link href="/mypage">
                <a>마이페이지</a>
              </Link>
            </Menu.Item>
            <Menu.Item onClick={onClickLogout}>
              <a>로그아웃</a>
            </Menu.Item>
            <Menu.Item>
              <Link href="/metest">
                <a>내정보 로드 테스트</a>
              </Link>
            </Menu.Item>
          </Menu>
        }
        placement="bottomRight"
        arrow>
        <Button>
          {<UserOutlined />}
          {me?.nickname}
        </Button>
      </Dropdown>
    )
  }, [me])

  return (
    <HeaderLayout
      className="site-layout-background"
      style={{
        padding: 0,
        background: '#fff',
        textAlign: 'center',
        minHeight: '5vh',
      }}>
      <Row justify="space-between" align="middle" gutter={10}>
        <Col span={2}>
          <FlexDiv>
            <Tooltip title="카테고리 삭제">
              <Button type="primary" shape="circle" icon={<SearchOutlined />} />
            </Tooltip>
          </FlexDiv>
        </Col>
        <Col>{MenuDrawer()}</Col>
        <Col span={10}>
          <SubTitle />
        </Col>
        <Col>{me?._id ? loggedInUserMenu() : loggedOutUserMenu()}</Col>
        <Col span={2}></Col>
      </Row>
    </HeaderLayout>
  )
}

export default Header
