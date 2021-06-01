import React, { useEffect, useState } from 'react'

import { FileTextTwoTone, UserOutlined, MenuOutlined, UserAddOutlined, FolderOpenOutlined } from '@ant-design/icons'
import { Layout, Menu, Input, Row, Col, Dropdown, Button, Divider, Drawer, Space } from 'antd'
import 'normalize.css'
import 'antd/dist/antd.css'
import { useRouter } from 'next/dist/client/router'
import Link from 'next/link'
import cookie from 'react-cookies'
import { useRecoilState } from 'recoil'

import kaxios from 'src/interceptors'
import { FlexDiv } from 'style/div'

import { meState } from '../state/me'
import { xs, sm, md, lg, xl, useWindowSize } from 'src/utils/size'
import MenuLayout from './MenuLayout'
import MenuSider from './MenuSider'
import MenuDrawer from './MenuDrawer'

const { Header, Footer, Sider, Content } = Layout

const MainLayout = ({ children }: { children: JSX.Element }): JSX.Element => {
  const [collapsed, setCollapsed] = useState(true)
  const [me, setMe] = useRecoilState(meState)
  const router = useRouter()

  useEffect(() => {
    if (me) return
    kaxios({ url: '/user', method: 'get' })
      .then((res) => {
        console.log('me loaded')
        setMe(res.data.userInfo)
      })
      .catch((e) => {
        if (e.message === 'Request failed with status code 401') {
          console.log('로그인 되지 않은 상태')
          return
        }
        console.log(JSON.parse(JSON.stringify(e)))
      })
  }, [me, setMe])

  const onClickLogout = () => {
    cookie.remove(process.env.NEXT_PUBLIC_JWT_TOKEN_NAME!)
    setMe(null)
    alert('로그아웃 성공!')
    router.push('/')
    return
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
              <Col>
                <Space size="middle">
                  <Dropdown
                    overlay={<Menu>
                      <Menu.Item>
                        <a target="_blank" rel="noopener noreferrer" href="#">
                          마이페이지
                        </a>
                      </Menu.Item>
                      <Menu.Item>
                        <a target="_blank" rel="noopener noreferrer" href="#">
                          회원정보 수정
                        </a>
                      </Menu.Item>
                      <Menu.Item onClick={onClickLogout}>
                        <a>로그아웃</a>
                      </Menu.Item>
                    </Menu>}
                    placement="bottomRight"
                    arrow>
                    <Button>{<UserOutlined/>}User</Button>
                  </Dropdown>
                </Space>
              </Col>
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

