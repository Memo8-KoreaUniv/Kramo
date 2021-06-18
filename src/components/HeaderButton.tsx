import React from 'react'

import { SearchOutlined, DeleteOutlined, HomeOutlined } from '@ant-design/icons'
import { Button, message, Tooltip, Popconfirm } from 'antd'
import _ from 'lodash'
import 'normalize.css'
import 'antd/dist/antd.css'
import { useRouter } from 'next/dist/client/router'
import Link from 'next/link'
import { useRecoilState, useRecoilValue } from 'recoil'

import { subtitles } from 'src/enum'
import { categoriesState } from 'src/state/categories'
import { categoryState, deleteCategory } from 'src/state/category'
import { subTitleState } from 'src/state/etc'
import { FlexDiv } from 'style/div'

const HeaderButton = () => {
  const subtitle = useRecoilValue(subTitleState)
  const [category, setCategory] = useRecoilState(categoryState)
  const [categories, setCategories] = useRecoilState(categoriesState)
  const router = useRouter()

  const onClickDeleteCategory = async () => {
    if (!category || !category._id) {
      message.error('정상 카테고리가 아닙니다!')
      return
    }
    const result = await deleteCategory(category?._id)
    if (typeof result === 'string') {
      return message.info(result)
    }
    if (!result) {
      return message.info(result)
    }
    message.info('카테고리 삭제 성공!')
    setCategory(null)
    setCategories(
      _.filter(categories, (o) => {
        return o._id != category._id
      }),
    )
    router.push('/')
  }

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
          <Popconfirm
            placement="bottomLeft"
            title={'모든 데이터들이 삭제됩니다. 정말로 삭제하시겠습니까?'}
            onConfirm={onClickDeleteCategory}
            okText="Yes"
            cancelText="No">
            <Tooltip title="카테고리 삭제">
              <Button type="primary" shape="circle" icon={<DeleteOutlined />} />
            </Tooltip>
          </Popconfirm>
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
}

export default HeaderButton
