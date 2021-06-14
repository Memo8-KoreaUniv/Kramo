import dynamic from 'next/dynamic';
import React,{useEffect} from 'react'
import { useRecoilState } from 'recoil'
import { HistoryInfo } from 'src/types/history'

import { historiesState, loadHistories } from 'src/state/history'
const PostEditor = dynamic(
  () => import('src/components/ToastEditor'),
  { ssr: false }   
)

const editPost = (memoId:string):JSX.Element => {
  /*
  const memo_Id = '60c27ae1cf0ada5f6370861d'
  const [histories, setHistories] = useRecoilState(historiesState)

  useEffect(() => {
    loadMemo()
  }, [histories, setHistories])


  const loadMemo = async () => {
    const historyInfo = await loadHistories(memo_Id)
    setHistories(historyInfo)
    console.log(historyInfo)

  }
*/
  return (
    <>
      <PostEditor memo={' '}/>
    </>
  )
}

export default editPost;
