import React, { useState, useEffect } from 'react'

import { EnvironmentOutlined } from '@ant-design/icons'
import { Col, Row, Image } from 'antd'

import { BASE64_FALLBACK_IMAGE } from 'src/enum'
import { GPS } from 'src/types'
import { formatDate } from 'src/utils/date'
import { getPlace } from 'src/utils/gps'
import { WeatherInfo, getIconURL } from 'src/utils/weather'
import { FlexDiv } from 'style/div'

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
        <FlexDiv>
          <Col span={4} style={{ textAlign: 'center' }}>
            <Image
              src={getIconURL(weather.icon)}
              fallback={BASE64_FALLBACK_IMAGE}
            />
          </Col>
          <Col span={20} style={darkMode ? { color: 'white' } : {}}>
            {updatedAt
              ? formatDate(new Date(updatedAt.toString()), new Date())
              : '알 수 없음'}
          </Col>
        </FlexDiv>
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
