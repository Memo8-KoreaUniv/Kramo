import React from 'react'
import { AppProps } from 'next/app'
import { Layout, Menu, Input, Row, Col, Dropdown, Button } from 'antd';
import {
  AppstoreOutlined,
  BarChartOutlined,
  CloudOutlined,
  ShopOutlined,
  TeamOutlined,
  UserOutlined,
  UploadOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import 'normalize.css'
import 'antd/dist/antd.css'

function App({ Component, pageProps }: AppProps) {
  const { Header, Footer, Sider, Content } = Layout;
  const { Search } = Input;

  return (
    <>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0, minimum-scale=1, viewport-fit=cover"
      />
      <Layout>
        <Sider
          width="60"
          style={{
            overflow: 'auto',
            height: '100vh',
            position: 'fixed',
            left: 0,
          }}
        >
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1" icon={<UserOutlined />} />
            <Menu.Item key="2" icon={<VideoCameraOutlined />} />
            <Menu.Item key="3" icon={<UploadOutlined />} />
            <Menu.Item key="4" icon={<BarChartOutlined />} />
            <Menu.Item key="5" icon={<CloudOutlined />} />
            <Menu.Item key="6" icon={<AppstoreOutlined />} />
            <Menu.Item key="7" icon={<TeamOutlined />} />
            <Menu.Item key="8" icon={<ShopOutlined />} />
          </Menu>
        </Sider>
        <Layout className="site-layout" style={{ marginLeft: 60 }}>
          <Header className="site-layout-background" style={{ padding: 0, background: '#fff' }}>
              <Row>
                  <Col span={8}>
                      <h1>
                        Kramo
                      </h1>
                  </Col>
                  <Col span={8} offset={8}>
                      <Search placeholder="Search" style={{ width: 200 }} />
                      <Dropdown overlay={
                        <Menu>
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
                          <Menu.Item>
                            <a target="_blank" rel="noopener noreferrer" href="#">
                              로그아웃
                            </a>
                          </Menu.Item>
                        </Menu>
                      } 
                        placement="bottomRight" 
                        arrow
                      >
                        <Button>User</Button>
                      </Dropdown>
                  </Col>
              </Row>
          </Header>
          <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
            <Component {...pageProps} />
          </Content>
          <Footer style={{ textAlign: 'center' }}>Kramo ©2021 Created by 남창균, 서상혁, 이정주, 정성준</Footer>
        </Layout>
      </Layout>
    </>
  )
}

export default App
   