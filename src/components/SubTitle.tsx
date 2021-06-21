import { useRecoilValue } from 'recoil'
import styled from 'styled-components'

import { subTitleState } from 'src/state/etc'
import { sm } from 'src/utils/size'
import { FlexDiv } from 'style/div'

const SubTitleDiv = styled(FlexDiv)`
  overflow: hidden;
`
const SubTitleH = styled.h1`
  margin-bottom: 0;
  font-weight: 600;
  font-size: 20px;
  overflow: auto;
  white-space: nowrap;

  @media (min-width: ${sm}px) {
    font-weight: 600;
    font-size: 30px;
    line-height: 1.35;
  }
`

const SubTitle = () => {
  const text = useRecoilValue(subTitleState)
  return (
    <SubTitleDiv>
      <SubTitleH>{text}</SubTitleH>
    </SubTitleDiv>
  )
}

export default SubTitle
