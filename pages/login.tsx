import React, { useEffect } from 'react'

declare global {
  interface Window {
    naver: any
  }
}

const Login = (): JSX.Element => {
  const naverLogin = () => {
    const login = new window.naver.LoginWithNaverId({
      clientId: process.env.NEXT_PUBLIC_NAVER_CLIENT_ID,
      callbackUrl: 'http://localhost:3000/login',
      loginButton: { color: 'green', type: 3, height: 80 },
      callbackHandle: true,
    })
    console.log(login)

    login.init()
  }

  const getNaverToken = () => {
    if (!location.hash) return
    const token = location.hash.split('=')[1].split('&')[0]
    console.log(token)
    return token
  }

  useEffect(() => {
    console.log(process.env)
    if (!process.env.NEXT_PUBLIC_NAVER_CLIENT_ID) {
      return
    }
    naverLogin()
    getNaverToken()
  }, [])

  return <div id="naverIdLogin" />
}

export default Login
