import React from 'react';
import PropTypes from 'prop-types';
import { EditorState } from 'draft-js';

import StyleButton from './StyleButton';
import { INLINE_STYLES } from './constants';

const {
  func,
  instanceOf,
} = PropTypes;

const InlineStyleControls = (props) => {
  const currentStyle = props.editorState.getCurrentInlineStyle();

  return (
    <div className="RichEditor-controls">
      {INLINE_STYLES.map(type =>
        <StyleButton
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      )}
    </div>
  );
};

InlineStyleControls.propTypes = {
  onToggle: func.isRequired,
  editorState: instanceOf(EditorState).isRequired,
};

export default InlineStyleControls;
