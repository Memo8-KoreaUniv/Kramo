<<<<<<< HEAD
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
=======
import React from 'react'

// import 'codemirror/lib/codemirror.css'
// import '@toast-ui/editor/dist/toastui-editor.css'
// import { Editor } from '@toast-ui/react-editor'
import { Button, Row, Col } from 'antd'

export default function MemoEditor() {
  // const editorRef: LegacyRef<Editor> = React.createRef()

  const handleClick = () => {
    // console.log(editorRef.current?.getInstance().getHtml())
>>>>>>> dev
  }
  memoLoad()
  return (
    <>
<<<<<<< HEAD
      <PostEditor memo="<br><br><br>제대로 입력되는지 테스트"/>
=======
      <Row justify="end">
        <Col span={1}>
          <Button danger>취소</Button>
        </Col>
        <Col span={1}>
          <Button type="primary" onClick={handleClick}>
            저장
          </Button>
        </Col>
      </Row>
      {/* <Editor
        previewStyle="vertical"
        height="400px"
        initialEditType="wysiwyg"
        initialValue={'메모를 입력하세요'}
        ref={editorRef}
      /> */}
>>>>>>> dev
    </>
  )
}

export default editPost;
