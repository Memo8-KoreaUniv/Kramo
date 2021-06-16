import React, { LegacyRef } from 'react'

import 'codemirror/lib/codemirror.css'
import '@toast-ui/editor/dist/toastui-editor.css'
import { Editor } from '@toast-ui/react-editor'
import { Button, Row, Col } from 'antd'

export default function ToastEditor({memo, addMemo, editorRef}) {
  // const editorRef: LegacyRef<Editor> = React.createRef() 

  // const handleClick = () => {
  //   console.log(editorRef.current?.getInstance().getHtml())
  // }

  return (
    <>
      <Row justify="end">
        <Col span={1}>
          <Button danger>취소</Button>
        </Col>
        <Col span={1}>
          <Button type="primary" onClick={addMemo}>
            저장
          </Button>
        </Col>
      </Row>
      <Editor
        previewStyle="vertical"
        height="600px"
        initialEditType="wysiwyg"
        initialValue={memo}
        ref={editorRef}
      />
    </>
  )
}
