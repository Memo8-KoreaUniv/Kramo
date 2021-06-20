import React from 'react'

import { Timeline, Typography } from 'antd'
import { useRecoilValue } from 'recoil'
import styled from 'styled-components'

import TimelinePopover from 'src/components/memo/TimelinePopover'
import { historiesState } from 'src/state/history'
import { FlexDiv } from 'style/div'

const TimeLineContainer = styled.div`
  padding: 0.5rem;
  background-color: white;
`

const HistoryTimeline = () => {
  const histories = useRecoilValue(historiesState)

  return (
    <TimeLineContainer>
      <FlexDiv style={{ marginBottom: '5px' }}>
        <Typography.Title level={2}>Timeline</Typography.Title>
      </FlexDiv>
      <Timeline>
        {histories.map((history, index) => {
          return (
            <TimelinePopover
              key={`Timeline_${history._id}`}
              history={history}
              index={index}
            />
          )
        })}
      </Timeline>
    </TimeLineContainer>
  )
}

export default HistoryTimeline
