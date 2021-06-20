import React from 'react'

import 'codemirror/lib/codemirror.css'
import '@toast-ui/editor/dist/toastui-editor.css'
import { Editor } from '@toast-ui/react-editor'

interface ToastEditorProps {
  text: string | undefined
  editorRef: React.RefObject<any>
}

export default function ToastEditor({ text, editorRef }: ToastEditorProps) {
  return (
    <>
      <Editor
        previewStyle="vertical"
        height="600px"
        initialEditType="wysiwyg"
        initialValue={text}
        ref={editorRef}
      />
    </>
  )
}
