import React from 'react';
import { injectIntl, intlShape } from 'react-intl';
import RichTextEditor from 'components/rich-text-editor/RichTextEditor';
import messages from './headline-and-content-inputs.messages';

import styles from './headline-and-content-inputs.style';

const HeadlineAndContentInputs = (props) => {
  const {
    headlineContent,
    handleHeadlineChange,
    bodyContent,
    handleBodyContentChange,
    intl,
  } = props;
  return (
    <form>
      <div className="input-container">
        <input
          value={headlineContent}
          onChange={handleHeadlineChange}
          type="text"
          placeholder={intl.formatMessage(messages.contentHeaderPlaceholder)}
          className="field-input"
        />
      </div>
      <div className="input-container">
        <RichTextEditor editorValue={bodyContent} onChange={handleBodyContentChange} />
      </div>
      <style jsx>{styles}</style>
    </form>
  );
};

HeadlineAndContentInputs.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(HeadlineAndContentInputs);
