import React from 'react'

import { QuestionCircleOutlined } from '@ant-design/icons'
import { Button, Popconfirm } from 'antd'

const AskAgainButton = ({
  onConfirm = () => {
    return
  },
  onCancel = () => {
    return
  },
  confirmText = '진행해도 괜찮으시겠습니까?',
  buttonText = '버튼',
}) => {
  return (
    <Popconfirm
      placement="top"
      title={confirmText}
      onConfirm={onConfirm}
      onCancel={onCancel}
      okText="예"
      icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
      cancelText="아니오">
      <Button>{buttonText}</Button>
    </Popconfirm>
  )
}

export default AskAgainButton
