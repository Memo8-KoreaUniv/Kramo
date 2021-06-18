import { LoadingOutlined } from '@ant-design/icons'
import { Spin } from 'antd'

import { FlexDiv } from 'style/div'

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />

interface SpinnerProps {
  width?: string
  height?: string
}

export const Spinner = ({ width = '100%', height = '100%' }: SpinnerProps) => {
  return (
    <FlexDiv width={width} height={height}>
      <Spin indicator={antIcon} />
    </FlexDiv>
  )
}
