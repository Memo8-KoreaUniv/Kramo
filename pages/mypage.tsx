import React, { CSSProperties, useEffect, useState } from 'react'

import { Descriptions, Badge, Button, Input, message } from 'antd'
import _ from 'lodash'
import { useRouter } from 'next/dist/client/router'
import { useRecoilState, useSetRecoilState } from 'recoil'
import styled from 'styled-components'

import AskAgainButton from 'src/components/AskAgain'
import { Spinner } from 'src/components/Spinner'
import { subtitles } from 'src/enum'
import kaxios from 'src/interceptors'
import { subTitleState } from 'src/state/etc'
import { meState } from 'src/state/me'
import { FlexDiv } from 'style/div'

const myLabelStyle: CSSProperties = {
  color: 'black',
  fontWeight: 'bolder',
  fontSize: '1rem',
}

const myContentStyle: CSSProperties = {
  fontSize: '0.8rem',
}

const DescriptionsItem = styled(Descriptions.Item)``
DescriptionsItem.defaultProps = {
  labelStyle: myLabelStyle,
  contentStyle: myContentStyle,
  span: 2,
}

const Mypage = () => {
  const [me, setMe] = useRecoilState(meState)
  const setSubTitle = useSetRecoilState(subTitleState)

  const router = useRouter()
  const [loading, setLoading] = useState<boolean>(false)
  const [onUpdateMode, setOnUpdateMode] = useState<boolean>(false)
  const [updateValues, setUpdateValues] = useState<{
    name?: string
    nickname?: string
    mobile?: string
  }>({})

  useEffect(() => {
    if (!me) {
      alert('로그인이 필요합니다!')
      router.push('/')
      return
    }
    setUpdateValues(_.pick(me, 'name', 'nickname', 'mobile'))
    setSubTitle(subtitles.mypage)
  }, [me, router, onUpdateMode, loading])

  const onClickUpdateButton = () => {
    setOnUpdateMode(!onUpdateMode)
  }

  const onConfirmUpdate = async () => {
    if (!me?._id) {
      message.warning('유저정보 로드가 실패했습니다.')
      return
    }
    if (_.isEqual(_.pick(me, 'name', 'nickname', 'mobile'), updateValues)) {
      message.warning('변경사항이 없습니다!')
      return
    }
    setLoading(true)
    try {
      const updatedUser = await kaxios({
        url: `/user/${me?._id}`,
        method: 'put',
        data: updateValues,
      })
      setOnUpdateMode(false)
      setMe(updatedUser.data.updatedUser)
      message.success('유저정보 업데이트 성공!')
    } catch (e) {
      message.error('유저정보 업데이트가 실패했습니다.')
    }
    setLoading(false)
  }

  if (loading) {
    return <Spinner></Spinner>
  }

  return (
    <>
      <Descriptions
        bordered
        title="내 정보"
        layout="vertical"
        column={{ xs: 1, sm: 2, md: 4 }}>
        <DescriptionsItem label="이름">
          {onUpdateMode ? (
            <Input
              value={updateValues?.name}
              onChange={(e) => {
                setUpdateValues({ ...updateValues, name: e.target.value })
              }}></Input>
          ) : (
            me?.name
          )}
        </DescriptionsItem>
        <DescriptionsItem label="닉네임">
          {onUpdateMode ? (
            <Input
              value={updateValues?.nickname}
              onChange={(e) => {
                setUpdateValues({ ...updateValues, nickname: e.target.value })
              }}></Input>
          ) : (
            me?.nickname
          )}
        </DescriptionsItem>
        <DescriptionsItem label="이메일" span={4}>
          {me?.email ? me?.email : '정보없음'}
        </DescriptionsItem>
        <DescriptionsItem label="전화번호">
          {onUpdateMode ? (
            <Input
              value={updateValues.mobile}
              onChange={(e) => {
                setUpdateValues({ ...updateValues, mobile: e.target.value })
              }}></Input>
          ) : (
            me?.mobile
          )}
        </DescriptionsItem>
        <DescriptionsItem label="생성일자">
          {me?.createdAt ? new Date(me?.createdAt).toString() : '정보없음'}
        </DescriptionsItem>
        <DescriptionsItem label="정상여부">
          <Badge
            status={me ? 'success' : 'error'}
            text={me ? '정상' : '에러'}
          />
        </DescriptionsItem>
        <DescriptionsItem label="기타">내용없음</DescriptionsItem>
      </Descriptions>
      <FlexDiv>
        <Button onClick={onClickUpdateButton}>
          {onUpdateMode ? '돌아가기' : '수정모드'}
        </Button>
        {onUpdateMode ? (
          <AskAgainButton
            buttonText="수정하기"
            confirmText="수정하시겠습니까?"
            onConfirm={onConfirmUpdate}
          />
        ) : (
          ''
        )}
      </FlexDiv>
    </>
  )
}

export default Mypage
