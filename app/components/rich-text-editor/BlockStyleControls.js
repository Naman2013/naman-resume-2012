import React from 'react';
import PropTypes from 'prop-types';
import { EditorState } from 'draft-js';

import StyleButton from './StyleButton';
import { BLOCK_TYPES } from './constants';

const {
  func,
  instanceOf,
} = PropTypes;

const BlockStyleControls = (props) => {
  const { editorState } = props;
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return (
    <div className="RichEditor-controls">
      {BLOCK_TYPES.map(type =>
        <StyleButton
          key={type.label}
          active={type.style === blockType}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      )}
    </div>
  );
};

BlockStyleControls.propTypes = {
  onToggle: func.isRequired,
  editorState: instanceOf(EditorState).isRequired,
};


export default BlockStyleControls;
