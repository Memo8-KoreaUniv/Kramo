import { Typography } from 'antd'
import { useRecoilValue } from 'recoil'

import { subTitleState } from 'src/state/etc'
import { FlexDiv } from 'style/div'

const SubTitle = () => {
  const text = useRecoilValue(subTitleState)
  return (
    <FlexDiv>
      <Typography.Title level={2} style={{ marginBottom: 0 }}>
        {text}
      </Typography.Title>
    </FlexDiv>
  )
}

export default SubTitle
