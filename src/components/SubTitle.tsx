import { Typography } from 'antd'
import { useRecoilValue } from 'recoil'
import styled from 'styled-components'

import { subTitleState } from 'src/state/etc'
import { FlexDiv } from 'style/div'

export const SubTitleH1 = styled(Typography.Title)`
  margin-bottom: 0;
`

const SubTitle = () => {
  const text = useRecoilValue(subTitleState)
  return (
    <FlexDiv>
      <SubTitleH1>{text}</SubTitleH1>
    </FlexDiv>
  )
}

export default SubTitle
