import React from 'react'
import RichTextEditor from 'components/rich-text-editor/RichTextEditor';

import styles from './headline-and-content-inputs.style';

const HeadlineAndContentInputs = (props) => {
  const {
    headlineContent,
    handleHeadlineChange,
    bodyContent,
    handleBodyContentChange,
  } = props
  return (
    <form>
      <div className="input-container">
        <input
          value={headlineContent}
          onChange={handleHeadlineChange}
          type="text"
          placeholder="Type in a simple header"
          className="field-input"
        />
      </div>
      <div className="input-container">
        <RichTextEditor
          editorValue={bodyContent}
          onChange={handleBodyContentChange}
        />
      </div>
      <style jsx>{styles}</style>
    </form>
  )
}


export default HeadlineAndContentInputs;
