import React, { useEffect } from 'react'

import { UserOutlined } from '@ant-design/icons'
import { Layout, Menu, Row, Col, Dropdown, Button, Divider } from 'antd'
import 'normalize.css'
import 'antd/dist/antd.css'
import { useRouter } from 'next/dist/client/router'
import Link from 'next/link'
import cookie from 'react-cookies'
import { useRecoilState, useSetRecoilState } from 'recoil'

import { categoriesState, loadCategories } from 'src/state/categories'

import { loadMe, meState } from '../state/me'
import MenuDrawer from './MenuDrawer'
import MenuSider from './MenuSider'

const { Header, Footer, Content } = Layout

const MainLayout = ({ children }: { children: JSX.Element }): JSX.Element => {
  const [me, setMe] = useRecoilState(meState)
  const setCategories = useSetRecoilState(categoriesState)
  const router = useRouter()

  const loadMyInfo = async () => {
    const meInfo = await loadMe()
    setMe(meInfo)
    if (meInfo && meInfo._id) {
      const categoryInfo = await loadCategories(meInfo._id)
      if (categoryInfo) {
        // 성공했을 시
        setCategories(categoryInfo)
      }
    }
  }

  useEffect(() => {
    if (me?._id) return
    loadMyInfo()
  }, [me, setMe])

  const onClickLogout = () => {
    cookie.remove(process.env.NEXT_PUBLIC_JWT_TOKEN_NAME!)
    setMe(null)
    setCategories([])
    alert('로그아웃 성공!')
    router.push('/')
    return
  }

  const loggedOutUserMenu = () => {
    return (
      <Button>
        <Link href="/login">
          <a>로그인</a>
        </Link>
      </Button>
    )
  }

  const loggedInUserMenu = () => {
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
  }

  return (
    <>
      <Layout>
        {MenuSider()}
        <Layout className="site-layout">
          <Header
            className="site-layout-background"
            style={{
              padding: 0,
              background: '#fff',
              textAlign: 'center',
              minHeight: '5vh',
            }}>
            <Row justify="space-between" align="middle" gutter={10}>
              <Col span={1}></Col>
              <Col>{MenuDrawer()}</Col>
              <Col span={10}></Col>
              <Col>{me?._id ? loggedInUserMenu() : loggedOutUserMenu()}</Col>
              <Col span={1}></Col>
            </Row>
          </Header>
          <Content
            style={{
              margin: '24px 16px 0',
              overflow: 'initial',
              minHeight: '80vh',
            }}>
            {children}
          </Content>
          <Divider />
          <Footer style={{ textAlign: 'center', minHeight: '8vh' }}>
            Kramo ©2021 Created by 남창균, 서상혁, 이정주, 정성준
          </Footer>
        </Layout>
      </Layout>
    </>
  )
}

export default MainLayout
