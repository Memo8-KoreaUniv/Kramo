import React, { useState } from 'react'

import { EnvironmentOutlined, PlusOutlined } from '@ant-design/icons'
import { Card, Col, Modal, Row, Input, Select } from 'antd'
import { useRecoilState } from 'recoil'

import { categoriesState } from 'src/state/categories'
import { meState } from 'src/state/me'
import { GPS } from 'src/types'
import { CategoryInfo } from 'src/types/category'
import { DEFAULT_GPS, getLocation } from 'src/utils/gps'
import {
  WeatherInfo,
  getIconURL,
  getNowWeatherByGeo,
  EMPTY_WEATHER,
} from 'src/utils/weather'

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
    getNowWeatherByGeo(
      GPS.latitude,
      GPS.longitude,
      process.env.NEXT_PUBLIC_WEATHER_API_KEY!,
    ).then((res) => {
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
      <Card
        key={`AddCardButton_Card`}
        style={{
          width: 300,
          textAlign: 'center',
          verticalAlign: 'middle',
          opacity: 0.5,
        }}
        size={'default'}
        onClick={showModal}>
        <PlusOutlined style={{ fontSize: '70px' }} />
      </Card>
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
        <TextArea
          rows={4}
          placeholder="메모 내용"
          allowClear={true}
          onChange={(e) => setContent(e.target.value)}
        />
        <Row>
          <Col span={4} style={{ textAlign: 'center' }}>
            <img width="30" src={getIconURL(currentWeather.icon)} />
          </Col>
          <Col span={20}>{currentWeather.description}</Col>
        </Row>
        <Row>
          <Col span={4} style={{ textAlign: 'center' }}>
            <EnvironmentOutlined />
          </Col>
          <Col span={20}>{`${GPS.latitude},${GPS.longitude}`}</Col>
        </Row>
      </Modal>
    </>
  )
}

export default AddCardButton
