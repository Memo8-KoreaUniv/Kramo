import React, { useState } from 'react'
import axios from 'axios'
import { Button } from 'antd'

const NAVER_LOGIN_URL = 'https://nid.naver.com/oauth2.0/authorize'

const Login = () => {
  const [url, setURL] = useState('')

  const onClickLoginButton = async () => {
    const res = await axios.get('http://localhost:3000/api/user/naverlogin')
    setURL(res.data)
  }

  const onClickCallBackButton = async () => {
    const res = await axios.get('http://localhost:3000/api/user/callback')
    console.log(res.data)
  }

  return (
    <div>
      <Button onClick={onClickLoginButton}>naverlogin test</Button>
      <Button onClick={onClickCallBackButton}>callback test</Button>
      <a href={url}>
        <img
          height="50"
          src="http://static.nid.naver.com/oauth/small_g_in.PNG"
        />
      </a>
    </div>
  )
}

export default Login
