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
import { xs, sm, md, lg, xl, useWindowSize } from 'src/size'
import MenuLayout from './MenuLayout'

const { Header, Footer, Sider, Content } = Layout
const { Search } = Input
const { SubMenu } = Menu

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

  const onCollapse = (collapsed: boolean) => {
    console.log(collapsed)
    setCollapsed(collapsed)
  }

  const MenuSider = () => {
    if (useWindowSize()[0] > xs)
      return (
        <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
          <FlexDiv>
            <Link href="/">
              <a>
                <FlexDiv justify={'center'} align={'center'}>
                  <FileTextTwoTone
                    twoToneColor="#005f99"
                    style={{
                      fontSize: '3rem',
                      color: '#08c',
                      margin: '1rem 0',
                    }}
                  />
                  {!collapsed ? (
                    <h1 style={{ color: '#C3D4D9', margin: '0 0.5rem' }}>
                      Kramo
                    </h1>
                  ) : (
                    ''
                  )}
                </FlexDiv>
              </a>
            </Link>
          </FlexDiv>
          <MenuLayout />
        </Sider>
      ) 
    
    else return (<></>)
  }

  function MenuDrawer() {
    const [visible, setVisible] = useState(false)

    const showDrawer = () => {
      setVisible(true)
    }
  
    const onClose = () => {
      setVisible(false)
    }

    if (useWindowSize()[0] <= xs)
      return (
        <>
          <Button type="primary" onClick={showDrawer}>
            <MenuOutlined />
          </Button>
          <Drawer
            placement="left"
            closable={false}
            onClose={onClose}
            visible={visible}
          >
            <Menu style={{ zIndex: 5 }} mode="inline">
              <SubMenu key="sub1" icon={<FolderOpenOutlined />} title="내 메모">
                <Menu.Item key="1" onClick={onClose}>
                  <Link href="/test">
                    <a>카테고리1</a>
                  </Link>
                </Menu.Item>
                <Menu.Item key="2" onClick={onClose}>카테고리2</Menu.Item>
              </SubMenu>
              {me ? (
                <Menu.Item key="2" icon={<UserOutlined />} onClick={onClose}>
                  <Link href="/mypage">
                    <a>마이페이지</a>
                  </Link>
                </Menu.Item>
              ) : (
                <Menu.Item key="2" icon={<UserOutlined />} onClick={onClose}>
                  <Link href="/login">
                    <a>로그인</a>
                  </Link>
                </Menu.Item>
              )}
              <Menu.Item key="3" icon={<UserAddOutlined />} onClick={onClose}>
                <Link href="/register">
                  <a>회원가입</a>
                </Link>
              </Menu.Item>
              <Menu.Item key="4" icon={<UserOutlined />} onClick={onClose}>
                <Link href="/metest">
                  <a>내정보 로드 테스트</a>
                </Link>
              </Menu.Item>
            </Menu>
          </Drawer>
        </>

      )
    
    else return (<></>)
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
              <Col></Col>
              <Col>{MenuDrawer()}</Col>
              <Col>
                <Space size="middle">
                  <Search placeholder="Search" style={{ width: useWindowSize()[0] > xs ? 200 : 150 }} />
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

