import React from 'react'

import { FileTextTwoTone } from '@ant-design/icons'
import { Layout } from 'antd'
import Link from 'next/link'
import { useRecoilState } from 'recoil'

import { menuCollapsedState } from 'src/state/etc'
import { xs, useWindowSize } from 'src/utils/size'
import { FlexDiv } from 'style/div'

import MenuLayout from './MenuLayout'

const { Sider } = Layout

const MenuSider = () => {
  const [collapsed, setCollapsed] = useRecoilState(menuCollapsedState)
  const onCollapse = (collapsed: boolean) => {
    setCollapsed(collapsed)
  }

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
  else return <></>
}

export default MenuSider
