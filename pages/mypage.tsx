import React, { CSSProperties, useEffect } from 'react'

import { Descriptions, Badge } from 'antd'
import { useRouter } from 'next/dist/client/router'
import { useRecoilValue } from 'recoil'
import styled from 'styled-components'

import { meState } from 'src/state/me'

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
  const me = useRecoilValue(meState)
  const router = useRouter()

  useEffect(() => {
    if (!me) {
      alert('로그인이 필요합니다!')
      router.push('/')
      return
    }
  }, [me, router])

  return (
    <Descriptions
      bordered
      title="내 정보"
      layout="vertical"
      column={{ xs: 1, sm: 2, md: 4 }}>
      <DescriptionsItem label="이름">
        {me?.name ? me?.name : '정보없음'}
      </DescriptionsItem>
      <DescriptionsItem label="닉네임">
        {me?.nickname ? me?.nickname : '정보없음'}
      </DescriptionsItem>
      <DescriptionsItem label="이메일" span={4}>
        {me?.email ? me?.email : '정보없음'}
      </DescriptionsItem>
      <DescriptionsItem label="전화번호">{me?.mobile}</DescriptionsItem>
      <DescriptionsItem label="생성일자">
        {me?.createdAt ? new Date(me?.createdAt).toString() : '정보없음'}
      </DescriptionsItem>
      <DescriptionsItem label="정상여부">
        <Badge status={me ? 'success' : 'error'} text={me ? '정상' : '에러'} />
      </DescriptionsItem>
      <DescriptionsItem label="기타">내용없음</DescriptionsItem>
    </Descriptions>
  )
}

export default Mypage
