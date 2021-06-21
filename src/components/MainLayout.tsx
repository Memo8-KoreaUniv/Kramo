import React, { useEffect } from 'react'

import { Layout, Divider } from 'antd'
import 'normalize.css'
import 'antd/dist/antd.css'
import { useRecoilState, useSetRecoilState } from 'recoil'

import {
  categoriesState,
  isCategoryLoadingTriedState,
  loadCategories,
} from 'src/state/categories'

import { loadMe, meState } from '../state/me'
import Header from './Header'
import MenuSider from './MenuSider'

const { Footer, Content } = Layout

const MainLayout = ({ children }: { children: JSX.Element }): JSX.Element => {
  const [me, setMe] = useRecoilState(meState)
  const setCategories = useSetRecoilState(categoriesState)
  const setTry = useSetRecoilState(isCategoryLoadingTriedState)

  const loadMyInfo = async () => {
    const meInfo = await loadMe()
    setMe(meInfo)
    if (meInfo && meInfo._id) {
      const categoryInfo = await loadCategories(meInfo._id)
      setTry(true)
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

  return (
    <>
      <Layout>
        {MenuSider()}
        <Layout className="site-layout">
          <Header />
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
