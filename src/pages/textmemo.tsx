import React, { useState} from 'react';
import "codemirror/lib/codemirror.css";
import "@toast-ui/editor/dist/toastui-editor.css";

import { Editor } from "@toast-ui/react-editor";

function WritePage() {

  const editorRef:any = React.createRef();
  
  const [text, setText] = useState("");
//useref -> 보통 많이 쓰는 방법 
//editor ref
  const handleClick = () => {
    console.log(text);
    setText(editorRef.current.getInstance().getHtml());
    //useEffect?
    console.log(text, typeof text);
  };

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
  );
}

export default WritePage;
