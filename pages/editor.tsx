import React, { LegacyRef, useEffect, useState } from 'react'

import { Editor as ToastUIEditor } from '@toast-ui/react-editor'
import { message, Select } from 'antd'
import { NextPageContext } from 'next'
import dynamic from 'next/dynamic'
import { useRecoilState, useSetRecoilState } from 'recoil'

import { categoriesState } from 'src/state/categories'
import { historiesState, loadHistories, addHistories } from 'src/state/history'
import { GPS } from 'src/types'
import { CategoryInfo } from 'src/types/category'
import { HistoryInfo } from 'src/types/history'
import { DEFAULT_GPS, getLocation } from 'src/utils/gps'
import {
  WeatherInfo,
  getNowWeatherByGeo,
  EMPTY_WEATHER,
} from 'src/utils/weather'

const PostEditor = dynamic(() => import('src/components/ToastEditor'), {
  ssr: false,
})

const Editor = ({ histories }: { histories: HistoryInfo[] }): JSX.Element => {
  const setHistories = useSetRecoilState(historiesState)
  const CategoryPairs: { [key: string]: string } = {}
  const [categories] = useRecoilState(categoriesState)
  const [categoryId, setCategoryId] = useState<string>('')
  const { Option } = Select
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
    alert(`메모 수정 완료!`)
  }

  return (
    <>
      <Select
        defaultValue={'기본값입니다.'}
        disabled={histories[0]._id !== 'error'}
        style={{ width: 120 }}
        onChange={(value: string) => setCategoryId(CategoryPairs[value])}>
        {categories.map((category: CategoryInfo) => {
          CategoryPairs[category.name] = category._id
          return (
            <Option
              key={`AddCardButton_Select_${category._id}`}
              value={category.name}>
              {category.name}
            </Option>
          )
        })}
      </Select>
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
    //console.log({ loadMemo_memoId: memoId })
    if (!memoId || typeof memoId === 'object') {
      return [
        {
          text: '에러가 발생했습니다! 이전 페이지로 돌아가주세요',
          _id: 'error',
        },
      ]
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
