import dynamic from 'next/dynamic';
import React from 'react'
import { useSetRecoilState } from 'recoil'
import { historiesState, loadHistories } from 'src/state/history'


const PostEditor = dynamic(
  () => import('src/components/ToastEditor'),
  { ssr: false }   
)

function editPost():JSX.Element {
  const historyId = '60a9e0db2183479d02922eda'
  const setHistories = useSetRecoilState(historiesState)
  const memoLoad = async () => {
    const historyInfo = await loadHistories(historyId)
    setHistories(historyInfo)
  }
  memoLoad()
  return (
    <>
      <PostEditor memo="<br><br><br>제대로 입력되는지 테스트"/>
    </>
  )
}

export default editPost;
