import styled from 'styled-components'

interface FlexDivProps {
  background?: string
  width?: string
  height?: string
  flex?: string
  direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse'
  justify?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly'
  align?: 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch'
  margin?: string
  padding?: string
}

export const FlexDiv = styled.div`
  display: flex;
  flex-direction: ${(p: FlexDivProps) => (p.direction ? p.direction : 'row')};
  justify-content: ${(p: FlexDivProps) => (p.justify ? p.justify : 'center')};
  align-items: ${(p: FlexDivProps) => (p.align ? p.align : 'center')};
  width: ${(p: FlexDivProps) => (p.width ? p.width : '100%')};
  height: ${(p: FlexDivProps) => (p.height ? p.height : 'auto')};
  background: ${(p: FlexDivProps) => p.background};
  margin: ${(p: FlexDivProps) => (p.margin ? p.margin : 'auto')};
  padding: ${(p: FlexDivProps) => (p.padding ? p.padding : 'auto')};
`
