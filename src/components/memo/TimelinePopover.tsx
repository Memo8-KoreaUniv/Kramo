import React, { useCallback } from 'react'

import { Tooltip, Timeline, Typography, Button } from 'antd'
import { useRecoilState } from 'recoil'

import { historyIndexState } from 'src/state/history'
import { HistoryInfo } from 'src/types/history'
import { formatDate } from 'src/utils/date'
import { useMemoPreview } from 'src/utils/useMemoPreview'

const TimelinePopover = ({
  history,
  index,
}: {
  history: HistoryInfo
  index: number
}) => {
  const [historyIndex, setHistoryIndex] = useRecoilState(historyIndexState)
  const { memoPreviewTitle } = useMemoPreview(history.text)
  const color = index === historyIndex ? 'green' : 'blue'
  const onClickTimeline = useCallback(() => {
    setHistoryIndex(index)
  }, [historyIndex])

  return (
    <Tooltip title={memoPreviewTitle} color={'cyan'} key={'cyan'}>
      <Timeline.Item color={color} style={{ cursor: 'pointer' }}>
        <Button onClick={onClickTimeline}>
          <Typography>
            {formatDate(new Date(history.createdAt!), new Date())}
          </Typography>
        </Button>
      </Timeline.Item>
    </Tooltip>
  )
}

export default TimelinePopover
