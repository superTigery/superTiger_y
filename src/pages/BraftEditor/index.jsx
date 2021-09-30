import React, { useRef, useState, useCallback } from 'react';
import { RichTextInput } from '@/components/RichTextInput';
import { Button, Space } from 'antd';
export default function Index() {
  const contentRef = useRef(null);
  const [contentState, setContentState] = useState(
    RichTextInput.createEditorState('我是你大爷'),
  );
  const handleRichInputChange = useCallback((editorState) => {
    console.log(editorState.isEmpty() ? undefined : editorState.toHTML());
    setContentState(editorState);
  }, []);
  const handleClick = () => {
    contentRef.current?.insertParam(`测试${Math.random() * 10}`, '-');
  };

  return (
    <Space direction="vertical">
      <Button type="primary" onClick={handleClick} style={{ width: 200 }}>
        追加字符串
      </Button>
      <RichTextInput
        ref={contentRef}
        height={560}
        value={contentState}
        onChange={handleRichInputChange}
        placeholder="请编辑内容"
      />
    </Space>
  );
}
