import React from 'react'

import { FormOutlined } from '@ant-design/icons'
import Link from 'next/link'
import { useRecoilState } from 'recoil'
import styled from 'styled-components'

import { meState } from 'src/state/me'
import { sm } from 'src/utils/size'
import { FlexDiv } from 'style/div'

const FlexibleAddMemo = styled.div`
  width: 260px;
  height: 104px;
  text-align: center;
  vertical-align: middle;
  opacity: 0.5;
  cursor: pointer;
  background-color: #a2dbfa;
  border: 0px solid #686d76;
  border-top: 2px solid #e8f0f2;

  @media (min-width: ${sm}px) {
    width: 300px;
    height: 120px;
  }
`

function AddMemoButton() {
  const [me] = useRecoilState(meState)

  if (!me || !me._id) {
    return <></>
  }

  return (
    <Link href={`/editor`}>
      <FlexibleAddMemo>
        <FlexDiv height="100%">
          <FormOutlined style={{ fontSize: '50px' }} />
        </FlexDiv>
      </FlexibleAddMemo>
    </Link>
  )
}

export default AddMemoButton
