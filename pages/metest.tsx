import React from 'react'

import * as cookie from 'cookie'
import { NextPageContext } from 'next'
import ReactJson from 'react-json-view-ssr'

import kaxios from 'src/interceptors'

const metest = ({ me }: any) => {
  console.log({ me })

  return (
    <div>
      <ReactJson name="me" src={me} theme="monokai"></ReactJson>
    </div>
  )
}

export default metest

export async function getServerSideProps(context: NextPageContext) {
  if (!context?.req?.headers.cookie) {
    return {
      props: { me: { message: '쿠키가 없습니다!' } }, // will be passed to the page component as props
    }
  }
  try {
    const parsedCookies = cookie.parse(context?.req?.headers.cookie)
    console.log(parsedCookies)
    console.log('parsedCookies')
    const res = await kaxios({
      url: '/user',
      method: 'get',
      headers: {
        Cookie: context?.req?.headers.cookie,
      },
    })
    console.log(res)
    return {
      props: { me: res.data.userInfo }, // will be passed to the page component as props
    }
  } catch (e) {
    console.log(e)
  }
}
