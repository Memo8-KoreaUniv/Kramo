import React, { useState, useEffect } from 'react'

import { EnvironmentOutlined } from '@ant-design/icons'
import { Col, Row } from 'antd'

import { GPS } from 'src/types'
import { formatDate } from 'src/utils/date'
import { getPlace } from 'src/utils/gps'
import { WeatherInfo, getIconURL } from 'src/utils/weather'

const MemoDetail = ({
  gps,
  weather,
  updatedAt,
  darkMode,
}: {
  gps: GPS
  weather: WeatherInfo
  updatedAt?: Date
  darkMode?: boolean
}) => {
  const { latitude, longitude } = gps
  const [place, setPlace] = useState<string>('알 수 없음')

  useEffect(() => {
    getPlace(latitude, longitude).then((loadedPlace) => setPlace(loadedPlace))
  }, [])

  return (
    <span>
      <Row>
        <Col span={4} style={{ textAlign: 'center' }}>
          {/* TODO : fallback 이미지 하나 넣어두고 쓰기 */}
          <img width="30" src={getIconURL(weather.icon)} />
        </Col>
        <Col span={20} style={darkMode ? { color: 'white' } : {}}>
          {updatedAt
            ? formatDate(new Date(updatedAt.toString()), new Date())
            : '알 수 없음'}
        </Col>
      </Row>
      <Row>
        <Col span={4} style={{ textAlign: 'center' }}>
          <EnvironmentOutlined style={darkMode ? { color: '#08c' } : {}} />
        </Col>
        <Col span={20} style={darkMode ? { color: 'white' } : {}}>
          {`${place}`}
        </Col>
      </Row>
    </span>
  )
}

export default MemoDetail
