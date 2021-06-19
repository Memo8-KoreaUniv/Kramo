import React from 'react'

import { Timeline, Typography } from 'antd'
import { useRecoilValue } from 'recoil'
import styled from 'styled-components'

import TimelinePopover from 'src/components/memo/TimelinePopover'
import { historyIndexState } from 'src/state/history'
import { HistoryInfo } from 'src/types/history'
import { FlexDiv } from 'style/div'

const TimeLineContainer = styled.div`
  padding: 0.5rem;
  background-color: white;
`

const HistoryTimeline = ({ histories }: { histories: HistoryInfo[] }) => {
  const historyIndex = useRecoilValue(historyIndexState)

  return (
    <TimeLineContainer>
      <FlexDiv>
        <Typography.Title level={2}>Timeline</Typography.Title>
      </FlexDiv>
      <Timeline>
        {histories.map((history, index) => {
          return (
            <TimelinePopover
              key={`Timeline_${history._id}`}
              history={history}
              index={index}
              historyIndex={historyIndex}
            />
          )
        })}
      </Timeline>
    </TimeLineContainer>
  )
}

export default HistoryTimeline
