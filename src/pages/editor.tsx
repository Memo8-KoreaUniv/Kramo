import React, { LegacyRef } from 'react'
import 'codemirror/lib/codemirror.css'
import '@toast-ui/editor/dist/toastui-editor.css'
import { Button, Row, Col } from 'antd';
import dynamic from 'next/dynamic'
const Editor = dynamic(() => import('@toast-ui/react-editor'), {
    ssr: false 
  }
)

const ForwardRefEditor = React.forwardRef((initialValue: string, ref) => 
  <Editor
    previewStyle="vertical"
    height="400px"
    initialEditType="wysiwyg"
    // TODO: 수정할 때 initial에 기존 메모 값 가져오기
    initialValue={initialValue}
    ref={ref}
  />
)

export function MemoEditor() {
  const editorRef: LegacyRef<Editor> = React.createRef()

  const handleClick = () => {
    console.log(editorRef.current?.getInstance().getHtml())
  }

  return (
    <>
      <Row justify="end">
        <Col span={1}>
          <Button danger>취소</Button>
        </Col>
        <Col span={1}>
          <Button type="primary" onClick={handleClick}>저장</Button>
        </Col>
      </Row>
      <ForwardRefEditor
          initialValue={"메모를 입력하세요"}
          ref={editorRef}
      />
    </>
  )
}
