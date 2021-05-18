import Link from 'next/link'
import styled from 'styled-components'

const CustomDiv = styled.div`
  font-size: 30px;
`

export default function Index() {
  return (
    <>
      <CustomDiv>KUM (Korea Univ Memo)</CustomDiv>
      <p>전산학특강 8조 프로젝트 과제입니다.</p>
      <Link href={{ pathname: '/hello', query: { name: 'test' } }}>테스트</Link>
      <br />
      <Link href={{ pathname: '/imagetest' }}>정적 이미지 테스트</Link>
      <br />
      <Link href={{ pathname: '/textmemo' }}>텍스트 작성</Link>
    </>
  )
}
