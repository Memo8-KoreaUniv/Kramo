import React, { useState } from 'react'

import { MenuOutlined, FileTextTwoTone } from '@ant-design/icons'
import { Button, Drawer } from 'antd'
import Link from 'next/link'

import { xs, useWindowSize } from 'src/utils/size'
import { FlexDiv } from 'style/div'

import MenuLayout from './MenuLayout'

const MenuDrawer = () => {
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
        <Button type="primary" onClick={showDrawer} size="small">
          <MenuOutlined />
        </Button>
        <Drawer 
          className="menudrawer"
          placement="left"
          closable={false}
          onClose={onClose}
          visible={visible}>
          <Link href="/">
            <a onClick={onClose}>
              <FlexDiv justify={'center'} align={'center'}>
                <FileTextTwoTone
                  twoToneColor="#005f99"
                  style={{
                    fontSize: '2rem',
                    color: '#08c',
                    margin: '0.5rem 0',
                  }}
                />
                <h1 style={{ color: '#C3D4D9', margin: '0 0.5rem' }}>Kramo</h1>
              </FlexDiv>
            </a>
          </Link>
          <MenuLayout />
        </Drawer>
      </>
    )
  else return <></>
}

export default MenuDrawer
