import React, { useState } from 'react'

import { Button, Form, Input, Radio, Typography } from 'antd'

import kaxios from 'src/interceptors'
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

  const onClickLogin = async (values: { email: string; password: string }) => {
    try {
      await kaxios({
        url: '/admin/login',
        data: values,
        method: 'post',
      })
      alert('로그인 성공!')
    } catch (e) {
      alert(
        e.response?.data?.alertText
          ? e.response?.data?.alertText
          : '로그인 실패!',
      )
    }
  }

  return (
    <>
      <FlexDiv margin="1rem">
        <Typography.Title>관리자 로그인</Typography.Title>
      </FlexDiv>
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        initialValues={{ size: componentSize }}
        onValuesChange={onFormLayoutChange}
        onFinish={onClickLogin}
        size={componentSize as SizeType}>
        <Form.Item label="Form Size">
          <Radio.Group>
            <Radio.Button value="small">Small</Radio.Button>
            <Radio.Button value="default">Default</Radio.Button>
            <Radio.Button value="large">Large</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="이메일" name="email">
          <Input />
        </Form.Item>
        <Form.Item label="관리자용 비밀번호" name="password">
          <Input.Password />
        </Form.Item>
        <FlexDiv>
          <Button type="primary" htmlType="submit">
            로그인
          </Button>
        </FlexDiv>
      </Form>
    </>
  )
}

export default Register
