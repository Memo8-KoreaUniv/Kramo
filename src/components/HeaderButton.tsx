import React from 'react'

import { SearchOutlined, DeleteOutlined, HomeOutlined } from '@ant-design/icons'
import { Button, Tooltip } from 'antd'
import 'normalize.css'
import 'antd/dist/antd.css'
import { useRecoilValue } from 'recoil'

import { subtitles } from 'src/enum'
import { categoryState } from 'src/state/category'
import { subTitleState } from 'src/state/etc'
import { FlexDiv } from 'style/div'
import Link from 'next/link'

const HeaderButton = () => {
  const subtitle = useRecoilValue(subTitleState)
  const category = useRecoilValue(categoryState)

  switch (subtitle) {
    case subtitles.main:
      return (
        <FlexDiv>
          <Tooltip title="지원 예정입니다!">
            <Button type="primary" shape="circle" icon={<SearchOutlined />} />
          </Tooltip>
        </FlexDiv>
      )
    case category?.name:
      return (
        <FlexDiv>
          <Tooltip title="카테고리 삭제">
            <Button type="primary" shape="circle" icon={<DeleteOutlined />} />
          </Tooltip>
        </FlexDiv>
      )
    default:
      return (
        <FlexDiv>
          <Tooltip title="홈으로 가기">
            <Link href="/">
              <a>
                <Button type="primary" shape="circle" icon={<HomeOutlined />} />
              </a>
            </Link>
          </Tooltip>
        </FlexDiv>
      )
  }
  return <div></div>
}

export default HeaderButton
