import React, { useMemo } from 'react'

import { Popover, Timeline } from 'antd'
import { parse } from 'dotenv'
import _ from 'lodash'

import { HistoryInfo } from 'src/types/history'
import { formatDate } from 'src/utils/date'

const TimelinePopover = ({
  history,
  index,
  historyIndex,
}: {
  history: HistoryInfo
  index: number
  historyIndex: number
}) => {
  const memoPreviewTitle = useMemo(() => {
    const parsed = parse(history.text.split('\n')[0])
    if (parsed.text) return parsed.text
    return history.text.split('\n')[0]
  }, [history, history?.text])

  const memoPreviewDetail = useMemo(() => {
    const texts = _.filter(history.text.split('\n'), (str) => {
      return !!str
    })
    if (texts.length >= 2) {
      return parse(history.text).text
    }
    return memoPreviewTitle ? memoPreviewTitle.trim() : '에러 발생'
  }, [history, history?.text])

  const color = index === historyIndex ? 'green' : 'blue'
  return (
    <Popover
      content={memoPreviewDetail}
      title={memoPreviewTitle}
      trigger="hover">
      <Timeline.Item color={color}>
        {formatDate(new Date(history.createdAt), new Date())}
      </Timeline.Item>
    </Popover>
  )
}

export default TimelinePopover
