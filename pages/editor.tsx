import dynamic from 'next/dynamic';
import React,{useEffect} from 'react'
import { useRecoilState,useSetRecoilState, useRecoilValue } from 'recoil'

import { historiesState, loadHistories } from 'src/state/history'
import { HistoryInfo } from 'src/types/history';

const PostEditor = dynamic(
  () => import('src/components/ToastEditor'),
  { ssr: false }   
)

function editPost():JSX.Element {
  const memoId = '60a9e0db2183479d02922eda'
  const [histories,setHistories] = useRecoilState(historiesState)

  //TBD: how many history...?15
  const historyLoad = async () => {
    const historyInfo = await loadHistories(memoId)
    setHistories(historyInfo)
  }
  historyLoad()
  return (
    <>
      <PostEditor memo={histories[0].text}/>
    </>
  )
}

export default editPost;
