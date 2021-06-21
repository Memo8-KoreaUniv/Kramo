import React, { useState } from 'react'

import { EnvironmentOutlined, PlusOutlined } from '@ant-design/icons'
import { Image, Col, Modal, Row, Input, Select, Typography } from 'antd'
import { useRecoilState } from 'recoil'
import styled from 'styled-components'

import { BASE64_FALLBACK_IMAGE } from 'src/enum'
import { categoriesState } from 'src/state/categories'
import { meState } from 'src/state/me'
import { GPS } from 'src/types'
import { CategoryInfo } from 'src/types/category'
import { DEFAULT_GPS, getLocation } from 'src/utils/gps'
import { sm } from 'src/utils/size'
import {
  WeatherInfo,
  getIconURL,
  getNowWeatherByGeo,
  EMPTY_WEATHER,
} from 'src/utils/weather'
import { FlexDiv } from 'style/div'

const FlexibleAddCard = styled.div`
  width: 260px;
  height: 104px;
  text-align: center;
  vertical-align: middle;
  opacity: 0.5;
  cursor: pointer;
  background-color: #a2dbfa;
  border: 0px solid #686d76;

  @media (min-width: ${sm}px) {
    width: 300px;
    height: 120px;
  }
`

function AddCardButton({
  addMemo,
}: {
  addMemo: (
    memoId: string,
    category: string,
    text: string,
    gps: GPS,
    weather: WeatherInfo,
  ) => void
}) {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false)
  const [content, setContent] = useState<string>('')
  const [categoryId, setCategoryId] = useState<string>('')
  const [GPS, setGPS] = useState<GPS>(DEFAULT_GPS)
  const [currentWeather, setCurrentWeather] =
    useState<WeatherInfo>(EMPTY_WEATHER)
  const CategoryPairs: { [key: string]: string } = {}
  const [categories] = useRecoilState(categoriesState)
  const [me] = useRecoilState(meState)
  const { TextArea } = Input
  const { Option } = Select

  const showModal = () => {
    getLocation(navigator.geolocation, (pos: GeolocationPosition) => {
      setGPS({
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
      })
    })
    getNowWeatherByGeo(GPS.latitude, GPS.longitude).then((res) => {
      setCurrentWeather(res)
    })
    setIsModalVisible(true)
  }

  const handleOk = () => {
    addMemo(me!._id!, categoryId, content, GPS, currentWeather)
    setIsModalVisible(false)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }
  if (!me || !me._id) {
    return <></>
  }

  return (
    <>
      <FlexibleAddCard onClick={showModal}>
        <FlexDiv height="100%">
          <PlusOutlined style={{ fontSize: '70px' }} />
        </FlexDiv>
      </FlexibleAddCard>
      <Modal
        title="메모 추가"
        visible={isModalVisible}
        centered={true}
        okText="확인"
        cancelText="취소"
        onOk={handleOk}
        onCancel={handleCancel}>
        <Select
          key={`AddCardButton_Select`}
          style={{ width: '100%', marginBottom: '5px' }}
          onChange={(value: string) => setCategoryId(CategoryPairs[value])}>
          {(categories as any).map((category: CategoryInfo) => {
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
        <TextArea
          rows={4}
          placeholder="메모 내용"
          allowClear={true}
          onChange={(e) => setContent(e.target.value)}
        />
        <Row>
          <Col span={4} style={{ textAlign: 'center' }}>
            <Image
              src={getIconURL(currentWeather.icon)}
              fallback={BASE64_FALLBACK_IMAGE}
            />
          </Col>
          <Col span={20}>
            <FlexDiv height="100%" justify="flex-start">
              <Typography>
                {currentWeather.description.toUpperCase()}
              </Typography>
            </FlexDiv>
          </Col>
        </Row>
        <Row>
          <Col span={4} style={{ textAlign: 'center' }}>
            <EnvironmentOutlined />
          </Col>
          <Col span={20}>
            <Typography>{`${GPS.latitude},${GPS.longitude}`}</Typography>
          </Col>
        </Row>
      </Modal>
    </>
  )
}

export default AddCardButton
