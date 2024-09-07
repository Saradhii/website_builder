import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { html } from '@codemirror/lang-html';

const MyEditor = () => {
  const [value, setValue] = React.useState('<div>Hello World</div>');

  return (
    <CodeMirror
      value={value}
      height="200px"
      extensions={[html()]}
      onChange={(val) => setValue(val)}
    />
  );
};

export default MyEditor;
