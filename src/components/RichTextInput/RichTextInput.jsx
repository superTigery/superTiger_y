import React, {
  CSSProperties,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import BraftEditor from 'braft-editor';
import { ContentUtils } from 'braft-utils';
import classNames from 'classnames';
import { paramItemExtension, getHtmlString } from './paramItemExtension';
import * as parser from './parser';
import * as validators from './validators';

import 'braft-editor/dist/index.css';
import styles from './RichTextInput.less';

BraftEditor.use(paramItemExtension);

// type RichTextInputProps = BraftEditorProps & {
//   /**
//    * 单行模式
//    */
//   singleLine?: boolean;
//   onBlur?: (editorState: EditorState) => void;
//   /**
//    * 隐藏控制栏
//    * @default true
//    */
//   hiddenControlbar?: boolean;
//   /**
//    * 高度
//    * @default 76
//    */
//   height?: CSSProperties['height'];
// };

// export type RichTextInputInstance = {
//   insertParam: (text: string, value: string) => void;
//   insertText: (text: string) => void;

//   /**
//    * 实例上还有很多方法，他的ts声明没写，这里直接省略了。要用的话，直接在控制台打印一下实例看看吧
//    * [详见](https://github.com/margox/braft-editor/blob/master/src/editor/index.jsx#L254)
//    */
//   [key: string]: any;
// };

const { createEditorState } = BraftEditor;

const Input = React.forwardRef(function RichTextInput(
  {
    singleLine,
    value: propValue,
    onChange,
    className,
    readOnly,
    hiddenControlbar,
    controlBarClassName,
    height = 76,
    contentStyle,
    controls = [],
    ...props
  },
  ref,
) {
  const contentStyles = {
    height: singleLine ? 30 : height,
    ...contentStyle,
  };
  const editorRef = useRef(null);
  const [innerValue, setInnerValue] = useState(
    createEditorState(propValue || null),
  );
  const value = propValue || innerValue;

  const handleChange = useCallback(
    (value) => {
      setInnerValue(value);
      onChange?.(value);
    },
    [onChange],
  );

  const handleBlur = useCallback(() => {
    handleChange(value);
  }, [handleChange, value]);

  const insertParam = useCallback(
    (text, submitValue) => {
      handleChange(
        ContentUtils.insertHTML(value, getHtmlString(text, submitValue)),
      );
    },
    [handleChange, value],
  );

  const insertText = useCallback(
    (text) => {
      handleChange(ContentUtils.insertText(value, text));
    },
    [handleChange, value],
  );

  useImperativeHandle(ref, () =>
    Object.assign(
      {
        insertParam,
        insertText,
      },
      editorRef.current,
    ),
  );

  return (
    <div
      className={classNames(
        className,
        styles.wrapper,
        {
          [styles.singleLine]: singleLine,
        },
        'rich-text-input',
      )}
    >
      <BraftEditor
        ref={editorRef}
        value={value}
        readOnly={readOnly}
        onChange={handleChange}
        controls={controls}
        contentStyle={contentStyles}
        controlBarClassName={classNames(controlBarClassName, {
          [styles.hiddenControlbar]: hiddenControlbar,
        })}
        onBlur={handleBlur}
        handleReturn={singleLine ? () => 'handled' : props?.handleReturn}
        {...props}
      />
    </div>
  );
});

export const RichTextInput = Object.assign(Input, parser, {
  createEditorState,
  validators,
});
