import React from 'react'

import { FormOutlined } from '@ant-design/icons'
import Link from 'next/link'
import styled from 'styled-components'

import { sm } from 'src/utils/size'
import { FlexDiv } from 'style/div'

const FlexibleAddMemo = styled.div`
  width: 260px;
  height: 104px;
  text-align: center;
  vertical-align: middle;
  opacity: 0.5;
  cursor: pointer;
  background-color: #ffed99;
  border: 0px solid #686d76;
  border-top: 2px solid #686d76;

  @media (min-width: ${sm}px) {
    width: 300px;
    height: 120px;
  }
`

function AddMemoButton() {
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
