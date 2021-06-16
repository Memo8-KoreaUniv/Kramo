import { LoadingOutlined } from '@ant-design/icons'
import { Spin } from 'antd'

import { FlexDiv } from 'style/div'

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />

export const Spinner = () => {
  return (
    <FlexDiv width="100%" height="100%">
      <Spin indicator={antIcon} />
    </FlexDiv>
  )
}
