import React, {useState} from 'react'
import { Layout } from 'antd'
import { FileTextTwoTone } from '@ant-design/icons'
import { FlexDiv } from 'style/div'
import { xs, sm, md, lg, xl, useWindowSize } from 'src/utils/size'
import Link from 'next/link'
import MenuLayout from './MenuLayout'

const { Header, Footer, Sider, Content } = Layout

const MenuSider = () => {
    const [collapsed, setCollapsed] = useState(true)
    const onCollapse = (collapsed: boolean) => {
        console.log(collapsed)
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
    
    else return (<></>)
  }

export default MenuSider