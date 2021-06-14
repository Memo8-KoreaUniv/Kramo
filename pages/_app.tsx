import 'normalize.css'
import 'antd/dist/antd.css'
import './style.css'

import React from 'react'

import { AppProps } from 'next/app'
import { RecoilRoot } from 'recoil'

import MainLayout from '../src/components/MainLayout'

function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <>
      <RecoilRoot>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0, minimum-scale=1, viewport-fit=cover"
        />
        <MainLayout>
          <Component {...pageProps}></Component>
        </MainLayout>
      </RecoilRoot>
    </>
  )
}

export default App
