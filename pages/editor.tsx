import dynamic from 'next/dynamic';
import React from 'react'

const PostEditor = dynamic(
  () => import('src/components/ToastEditor'),
  { ssr: false }
)

//TODO 여기서 이제 API를 이용해서, 받아온 메모 아이디 바탕으로
//DB에서 메모를 가져오고, 뿌리면 되나...?
function writePost():JSX.Element {
  return (
    <>
      <PostEditor memo="<br><br><br>제대로 입력되는지 테스트"/>
    </>
  )
}

export default writePost;
