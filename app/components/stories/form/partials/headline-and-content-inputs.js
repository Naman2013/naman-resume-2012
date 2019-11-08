import React from 'react';
import PropTypes from 'prop-types';
import RichTextEditor from 'app/components/rich-text-editor/RichTextEditor';

import styles from './headline-and-content-inputs.style';

const HeadlineAndContentInputs = props => {
  const {
    headlineContent,
    handleHeadlineChange,
    bodyContent,
    handleBodyContentChange,
    titlePrompt,
  } = props;
  return (
    <form>
      <div className="input-container">
        <input
          value={headlineContent}
          onChange={handleHeadlineChange}
          type="text"
          placeholder={titlePrompt}
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
  );
};

HeadlineAndContentInputs.propTypes = {
  titlePrompt: PropTypes.string,
};
HeadlineAndContentInputs.defaultProps = {
  titlePrompt: '',
};

export default HeadlineAndContentInputs;
