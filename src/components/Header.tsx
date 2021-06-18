import React from 'react'

import { Row, Col, Layout } from 'antd'
import 'normalize.css'
import 'antd/dist/antd.css'

import HeaderButton from './HeaderButton'
import MenuDrawer from './MenuDrawer'
import SubTitle from './SubTitle'
import UserMenu from './UserMenu'

const HeaderLayout = Layout.Header

const Header = () => {
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
        <Col xs={3} md={0}>
          <MenuDrawer />
        </Col>
        <Col xs={3} md={2}>
          <HeaderButton />
        </Col>
        <Col xs={13} md={10}>
          <SubTitle />
        </Col>
        <Col xs={5}>
          <UserMenu />
        </Col>
      </Row>
    </HeaderLayout>
  )
}

export default Header
