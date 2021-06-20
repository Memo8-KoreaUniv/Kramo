import React from 'react'

import { Col, Row } from 'antd'

import { GPS } from 'src/types'
import { MemoInfo } from 'src/types/memo'
import { WeatherInfo } from 'src/utils/weather'

import AddCardButton from '../AddCardButton'
import MemoCardItem from './MemoCardItem'

const MemoView = ({
  memos,
  addMemo,
  deleteMemo,
  sortMemos,
}: {
  memos: MemoInfo[]
  addMemo: (
    memoId: string,
    category: string,
    text: string,
    gps: GPS,
    weather: WeatherInfo,
  ) => void
  deleteMemo: (memoId: string) => void
  sortMemos: (memoId: string) => void
}) => {
  return (
    <Col span={18}>
      <div className="site-card-wrapper">
        <Row gutter={[30, 30]}>
          {memos
            .sort(
              (a: MemoInfo, b: MemoInfo) =>
                (b.memo.pinned ? 1 : 0) - (a.memo.pinned ? 1 : 0),
            )
            .map((memo: MemoInfo) => {
              return (
                <Col key={`Col${memo._id}`}>
                  <MemoCardItem
                    key={`MemoCardItem_${memo._id}`}
                    memo={memo}
                    deleteMemo={deleteMemo}
                    sortMemos={sortMemos}
                  />
                </Col>
              )
            })}
          <Col key={`ColAddCardButton`}>
            <AddCardButton key={`AddCardButton`} addMemo={addMemo} />
          </Col>
        </Row>
      </div>
    </Col>
  )
}

export default MemoView
