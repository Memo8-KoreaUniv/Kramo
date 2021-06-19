import React, { LegacyRef, useEffect, useState } from 'react'

import { Editor as ToastUIEditor } from '@toast-ui/react-editor'
import { message } from 'antd'
import { NextPageContext } from 'next'
import dynamic from 'next/dynamic'
import { useSetRecoilState } from 'recoil'

import { historiesState, loadHistories, addHistories } from 'src/state/history'
import { GPS } from 'src/types'
import { HistoryInfo } from 'src/types/history'
import { DEFAULT_GPS, getLocation } from 'src/utils/gps'
import {
  WeatherInfo,
  getIconURL,
  getNowWeatherByGeo,
  EMPTY_WEATHER,
} from 'src/utils/weather'

const PostEditor = dynamic(() => import('src/components/ToastEditor'), {
  ssr: false,
})

const Editor = ({ histories }: { histories: HistoryInfo[] }): JSX.Element => {
  const setHistories = useSetRecoilState(historiesState)
  const editorRef: LegacyRef<ToastUIEditor> = React.createRef()

  console.log({ histories })
  useEffect(() => {
    setHistories(histories)
  }, [])

  const [GPS, setGPS] = useState<GPS>(DEFAULT_GPS)
  const [currentWeather, setCurrentWeather] =
    useState<WeatherInfo>(EMPTY_WEATHER)

  const addMemo = async () => {
    getLocation(navigator.geolocation, (pos: GeolocationPosition) => {
      setGPS({
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
      })
    })

    getNowWeatherByGeo(
      GPS.latitude,
      GPS.longitude,
      process.env.NEXT_PUBLIC_WEATHER_API_KEY!,
    ).then((res) => {
      setCurrentWeather(res)
    })

    const innerText = editorRef.current?.getInstance().getHtml()
    if (innerText === undefined) {
      return message.error('아무것도 입력되지 않았습니다!')
    }

    const newHistory: HistoryInfo = {
      ...histories[0],
      text: innerText,
      gps: GPS,
      weather: currentWeather,
    }
    delete newHistory._id
    delete newHistory.createdAt
    addHistories(newHistory)
  }

  return (
    <>
      <PostEditor
        memo={histories.length !== 0 ? histories[0].text : '메모가 없습니다'}
        editorRef={editorRef}
        addMemo={addMemo}
      />
    </>
  )
}

export default Editor

export async function getServerSideProps(ctx: NextPageContext) {
  const { memoId } = ctx.query

  const loadMemo = async () => {
    console.log({ loadMemo_memoId: memoId })
    if (!memoId || typeof memoId === 'object') {
      return [{ text: '에러가 발생했습니다! 이전 페이지로 돌아가주세요' }]
    }
    const historyInfo = await loadHistories(memoId)
    return historyInfo
  }

  const histories = await loadMemo()

  return {
    props: {
      histories,
    },
  }
}
