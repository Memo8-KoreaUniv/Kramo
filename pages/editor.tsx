import React, { LegacyRef, useEffect, useState } from 'react'

import { Editor as ToastUIEditor } from '@toast-ui/react-editor'
import { message, Select } from 'antd'
import { Button, Row, Col } from 'antd'
import { NextPageContext } from 'next'
import { useRouter } from 'next/dist/client/router'
import dynamic from 'next/dynamic'
import { useRecoilState, useRecoilValue } from 'recoil'

import HistoryTimeline from 'src/components/memo/HistoryTimeline'
import { Spinner } from 'src/components/Spinner'
import {
  categoriesState,
  isCategoryLoadingTriedState,
} from 'src/state/categories'
import { categoryState } from 'src/state/category'
import {
  historiesState,
  historyIndexState,
  loadHistories,
  addHistory,
  AddHistoryProps,
} from 'src/state/history'
import { meState } from 'src/state/me'
import { CategoryInfo } from 'src/types/category'
import { HistoryInfo } from 'src/types/history'
import { getLocation } from 'src/utils/gps'
import useMemos from 'src/utils/useMemos'
import { getNowWeatherByGeo } from 'src/utils/weather'
import { FlexDiv } from 'style/div'
const { Option } = Select

const PostEditor = dynamic(() => import('src/components/ToastEditor'), {
  ssr: false,
})

const INITIAL_HISTORY: any = {
  text: '첫 메모입니다!',
  createdAt: new Date().toUTCString(),
}

const Editor = ({
  initialHistories,
  firstCreation,
}: {
  initialHistories: HistoryInfo[]
  firstCreation: boolean
}): JSX.Element => {
  const [text, setText] = useState('')
  const [loading, setLoading] = useState<boolean>(false)
  const [value, setValue] = useState('기존 카테고리가 유지됩니다.')
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('')
  const me = useRecoilValue(meState)
  const categories = useRecoilValue(categoriesState)
  const isCategoryLoadingTried = useRecoilValue(isCategoryLoadingTriedState)
  const [category, setCategory] = useRecoilState(categoryState)
  const [histories, setHistories] = useRecoilState(historiesState)
  const [historyIndex, setHistoryIndex] = useRecoilState(historyIndexState)

  const editorRef: LegacyRef<ToastUIEditor> = React.createRef()
  const router = useRouter()
  const { addMemo } = useMemos()

  const categoryPairs: { [key: string]: string } = {}

  useEffect(() => {
    if (firstCreation) {
      setHistories([
        { ...INITIAL_HISTORY, createdAt: new Date().toUTCString() },
      ])
      return
    }
    setHistories(initialHistories)
  }, [])

  useEffect(() => {
    if (isCategoryLoadingTried && !me) {
      alert('로그인이 필요합니다!')
      router.push('/')
      return
    }
  }, [me, isCategoryLoadingTried])

  useEffect(() => {
    if (
      isCategoryLoadingTried &&
      (categories === [] || categories.length === 0)
    ) {
      alert('카테고리를 먼저 생성해주세요!')
      router.push('/')
      return
    }
    if (categories && categories.length !== 0) {
      setSelectedCategoryId(categories[0]._id)
      if (!category) {
        setCategory(categories[0])
        setSelectedCategoryId(categories[0]._id)
      }
    }
    if (category) {
      setValue(category.name)
    }
  }, [categories, category, isCategoryLoadingTried])

  useEffect(() => {
    const changedText =
      histories.length !== 0 ? histories[historyIndex].text : '메모가 없습니다'
    setText(changedText)
    editorRef.current?.getInstance().setHtml(changedText)
  }, [histories, historyIndex])

  const onClickSave = async () => {
    const innerText = editorRef.current?.getInstance().getHtml()
    if (!innerText) {
      return message.error('아무것도 입력되지 않았습니다!')
    }
    setLoading(true)
    getLocation(navigator.geolocation, (pos: GeolocationPosition) => {
      const GPS = {
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
      }
      getNowWeatherByGeo(GPS.latitude, GPS.longitude).then(
        async (currentWeather) => {
          const newHistory: AddHistoryProps = {
            ...histories[0],
            gps: GPS,
            text: innerText,
            weather: currentWeather,
          }
          delete newHistory._id
          if (newHistory.createdAt) delete newHistory.createdAt
          let newMemo
          if (firstCreation) {
            newMemo = await addMemo(
              me!._id,
              selectedCategoryId,
              innerText,
              GPS,
              currentWeather,
            )
            setLoading(false)
            setHistories([newMemo])
            setHistoryIndex(0)
            router.push(`/editor?memoId=${newMemo.memo._id}`, undefined, {
              shallow: false,
            })
          } else {
            newMemo = await addHistory(newHistory)
            setLoading(false)
            if (newMemo) {
              setHistories([newMemo, ...histories])
              setHistoryIndex(0)
              message.info('저장 성공!')
              return
            }
            message.error('저장이 실패하였습니다.')
            return
          }
        },
      )
    })
  }

  const onClickCancel = () => {
    router.back()
  }

  const onChangeSelector = (name: any) => {
    setValue(name)
    setSelectedCategoryId(categoryPairs[name])
    return
  }

  return (
    <>
      <Row style={{ marginBottom: '0.5rem' }} justify="space-around">
        <Col xs={12} md={17}>
          <Select
            style={{ width: '100%' }}
            defaultValue={
              category ? category.name : '기존 카테고리가 유지됩니다.'
            }
            value={value}
            disabled={!firstCreation}
            onChange={onChangeSelector}>
            {(categories as any).map((cate: CategoryInfo) => {
              categoryPairs[cate.name] = cate._id
              return (
                <Option key={`CategorySelector_${cate._id}`} value={cate.name}>
                  {cate.name}
                </Option>
              )
            })}
          </Select>
        </Col>
        <Col xs={12} md={6}>
          <FlexDiv direction="row" justify="flex-end">
            <Button
              type="primary"
              danger
              onClick={onClickCancel}
              style={{ marginRight: '3px' }}>
              뒤로 가기
            </Button>
            {loading ? (
              <Button type="primary">
                <Spinner />
              </Button>
            ) : (
              <Button type="primary" onClick={onClickSave}>
                저장
              </Button>
            )}
          </FlexDiv>
        </Col>
      </Row>
      <Row justify="space-around">
        <Col xs={24} md={17}>
          <PostEditor text={text} editorRef={editorRef} />
        </Col>
        <Col xs={24} md={6}>
          <HistoryTimeline />
        </Col>
      </Row>
    </>
  )
}

export default Editor

export async function getServerSideProps(ctx: NextPageContext) {
  const { memoId } = ctx.query
  const loadMemo = async () => {
    if (!memoId || typeof memoId === 'object') {
      return [[{ text: '첫 메모입니다!' }], true]
    }
    const historyInfo = await loadHistories(memoId)
    return [historyInfo, false]
  }

  const [initialHistories, firstCreation] = await loadMemo()

  return {
    props: {
      initialHistories,
      firstCreation,
    },
  }
}
