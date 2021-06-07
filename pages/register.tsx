import React, { useState } from 'react'

import { Button, Form, Input, Radio, Typography } from 'antd'

import { FlexDiv } from 'style/div'

type SizeType = Parameters<typeof Form>[0]['size']

/**
 * @설명 혹시 네아로가 아닌 custom 회원가입이 필요할 경우에 쓸 페이지입니다.
 *
 */
const Register = () => {
  const [componentSize, setComponentSize] =
    useState<SizeType | 'default'>('default')
  const onFormLayoutChange = ({ size }: { size: SizeType }) => {
    setComponentSize(size)
  }
  return (
    <>
      <FlexDiv margin="1rem">
        <Typography.Title>회원가입</Typography.Title>
      </FlexDiv>
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        initialValues={{ size: componentSize }}
        onValuesChange={onFormLayoutChange}
        size={componentSize as SizeType}>
        <Form.Item label="Form Size" name="size">
          <Radio.Group>
            <Radio.Button value="small">Small</Radio.Button>
            <Radio.Button value="default">Default</Radio.Button>
            <Radio.Button value="large">Large</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="이메일">
          <Input />
        </Form.Item>
        <Form.Item label="이름">
          <Input />
        </Form.Item>
        <Form.Item label="닉네임">
          <Input />
        </Form.Item>
        <FlexDiv>
          <Button>로그인</Button>
          <Button>가입하기</Button>
        </FlexDiv>
      </Form>
    </>
  )
}

export default Register
