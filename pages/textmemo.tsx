import React, { LegacyRef } from 'react'
import 'codemirror/lib/codemirror.css'
import '@toast-ui/editor/dist/toastui-editor.css'

import { Editor } from '@toast-ui/react-editor'

function WritePage() {
  const editorRef: LegacyRef<Editor> = React.createRef()

  const handleClick = () => {
    console.log(editorRef.current?.getInstance().getHtml())
  }

  return (
    <>
      <Editor
        previewStyle="vertical"
        height="400px"
        initialEditType="wysiwyg"
        // TODO: 수정할 때 initial에 기존 메모 값 가져오기
        initialValue="메모를 입력하세요"
        ref={editorRef}
      />
      <button onClick={handleClick}>submit</button>
    </>
  )
}

export default WritePage
