import React, { useCallback } from 'react'

import { UserOutlined } from '@ant-design/icons'
import { Button, Dropdown, Menu, Typography } from 'antd'
import 'normalize.css'
import 'antd/dist/antd.css'
import { useRouter } from 'next/dist/client/router'
import Link from 'next/link'
import cookie from 'react-cookies'
import { useRecoilState } from 'recoil'

import { categoriesState } from 'src/state/categories'
import { meState } from 'src/state/me'
import { useWindowSize, sm } from 'src/utils/size'
import { FlexDiv } from 'style/div'

const UserMenu = () => {
  const [me, setMe] = useRecoilState(meState)
  const [categories, setCategories] = useRecoilState(categoriesState)
  const router = useRouter()
  const windowSize = useWindowSize()[0]

  const onClickLogout = useCallback(() => {
    cookie.remove(process.env.NEXT_PUBLIC_JWT_TOKEN_NAME!)
    setMe(null)
    setCategories([])
    alert('로그아웃 성공!')
    router.push('/')
    return
  }, [me, categories, router])

  return me ? (
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
        <FlexDiv justify="space-between" width="auto">
          {<UserOutlined />}
          {windowSize >= sm ? (
            <Typography style={{ marginLeft: '0.5em' }}>
              {me?.nickname}
            </Typography>
          ) : (
            ''
          )}
        </FlexDiv>
      </Button>
    </Dropdown>
  ) : (
    <Button>
      <Link href="/login">
        <a>로그인</a>
      </Link>
    </Button>
  )
}

export default UserMenu
