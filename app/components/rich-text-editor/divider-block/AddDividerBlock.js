import React from 'react';
import { EditorState, AtomicBlockUtils } from 'draft-js';
import PropTypes from 'prop-types';

const {
  func,
  instanceOf,
} = PropTypes;

class AddDividerBlock extends React.Component {
  static propTypes = {
    onChange: func.isRequired,
    editorState: instanceOf(EditorState).isRequired,
  }

  addHorizontalRule = (e) => {
    e.preventDefault();
    const { editorState, onChange } = this.props;
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
        'HORIZONTAL_RULE',
        'IMMUTABLE',
        {},
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = AtomicBlockUtils.insertAtomicBlock(
        editorState,
        entityKey,
        ' ',
    );

    onChange(newEditorState);
  }

  render() {
    return (
      <span
        className="fa fa-arrows-h RichEditor-styleButton"
        onClick={this.addHorizontalRule}
      />
    );
  }
}

export default AddDividerBlock;
