/* eslint-disable */
import {
  CompositeDecorator,
  Editor,
  EditorState,
  RichUtils,
} from 'draft-js';
import { convertToHTML, convertFromHTML } from 'draft-convert';
import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import AddDividerBlock from './divider-block/AddDividerBlock';
import DividerBlock from './divider-block/DividerBlock';
import BlockStyleControls from './BlockStyleControls';
import InlineStyleControls from './InlineStyleControls';

import 'draft-js/dist/Draft.css';
import './RichTextEditor.scss';

function getBlockStyle(block) {
  switch (block.getType()) {
    case 'blockquote':
      return 'RichEditor-blockquote';
    case 'atomic':
      return 'RichEditor-horizontalRule';
    default:
      return null;
  }
}

function findLinkEntities(contentBlock, callback, contentState) {
  contentBlock.findEntityRanges(character => {
    const entityKey = character.getEntity();
    return (
      entityKey !== null &&
      contentState.getEntity(entityKey).getType() === 'LINK'
    );
  }, callback);
}

const Link = ({ contentState, entityKey, children }) => {
  const { url } = contentState.getEntity(entityKey).getData();
  return (
    <a href={url} className="link" target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
};

const editorStateDecorator = new CompositeDecorator([
  {
    strategy: findLinkEntities,
    component: Link,
  },
]);

export const getEditorStateFromHtml = html => EditorState.createWithContent(convertFromHTML(html));

class RichTextEditor extends React.Component {
  static propTypes = {
    onChange: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.state = {
      editorState: EditorState.createEmpty(editorStateDecorator),
      showURLInput: false,
      urlValue: '',
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { editorValue, value } = nextProps;
    const { editorState } = prevState;

    if (value) {
      return {
        editorState: value,
      };
    }

    return {
      editorState:
        !editorValue && editorState.getCurrentContent().hasText()
          ? EditorState.createEmpty(editorStateDecorator)
          : editorState,
    };
  }

  onChange = editorState => {
    const { onChange } = this.props;
    this.setState({
      editorState,
    });
    const content = editorState.getCurrentContent();
    const threadContent =
      content.getPlainText().trim() &&
      convertToHTML({
        blockToHTML: block => {
          if (block.type === 'atomic') {
            return {
              start: '<hr>',
              end: '</hr>',
            };
          }
          if (block.text === '') {
            return (
              <p>
                <br />
              </p>
            );
          }
        },
        entityToHTML: (entity, originalText) => {
          if (entity.type === 'LINK') {
            return (
              <a
                href={entity.data.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {originalText}
              </a>
            );
          }
          return originalText;
        },
      })(content);
    onChange(threadContent, editorState);
  };

  onTab = e => {
    const { editorState } = this.state;
    // sets tab spacing (i.e.: ul)
    const maxDepth = 4;
    this.onChange(RichUtils.onTab(e, editorState, maxDepth));
  };

  onURLChange = e => {
    this.setState({
      urlValue: e.target.value,
    });
  };

  onLinkInputKeyDown = e => {
    if (e.which === 13) {
      this.confirmLink(e);
    }
  };

  handleKeyCommand = command => {
    // allows ctl+b ctl+i like commands
    const { editorState } = this.state;
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  };

  // "BlockType" is the top line of tools on the editor,
  // block elements affect all text on that line of the editor
  toggleBlockType = blockType => {
    const { editorState } = this.state;
    this.onChange(RichUtils.toggleBlockType(editorState, blockType));
  };

  // "inline styles" (second line of the editor) styles will not affect the whole line of text,
  // just what is highlighted
  toggleInlineStyle = inlineStyle => {
    const { editorState } = this.state;
    this.onChange(RichUtils.toggleInlineStyle(editorState, inlineStyle));
  };

  promptForLink = e => {
    e.preventDefault();
    e.stopPropagation();
    this.setState({ urlValue: '' });
    const { editorState } = this.state;
    const selection = editorState.getSelection();
    if (!selection.isCollapsed()) {
      const contentState = editorState.getCurrentContent();
      const startKey = editorState.getSelection().getStartKey();
      const startOffset = editorState.getSelection().getStartOffset();
      const blockWithLinkAtBeginning = contentState.getBlockForKey(startKey);
      const linkKey = blockWithLinkAtBeginning.getEntityAt(startOffset);
      const url = linkKey ? contentState.getEntity(linkKey).getData().url : '';

      this.setState(
        {
          showURLInput: true,
          urlValue: url,
        },
        () => {
          this.urlInput.focus();
        }
      );
    }
  };

  confirmLink = e => {
    e.preventDefault();
    const { editorState, urlValue } = this.state;
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      'LINK',
      'MUTABLE',
      { url: urlValue }
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(editorState, {
      currentContent: contentStateWithEntity,
    });
    this.setState(
      {
        editorState: RichUtils.toggleLink(
          newEditorState,
          newEditorState.getSelection(),
          entityKey
        ),
        showURLInput: false,
        urlValue: '',
      },
      () => {
        this.editor.focus();
      }
    );
  };

  removeLink = e => {
    e.preventDefault();
    const { editorState } = this.state;
    const selection = editorState.getSelection();
    if (!selection.isCollapsed()) {
      this.setState({
        editorState: RichUtils.toggleLink(editorState, selection, null),
      });
    }
  };

  blockRenderer(block) {
    const { editorState } = this.state;
    const contentState = editorState.getCurrentContent();
    let entity;
    let isHorizontalRule;
    let ret;
    switch (block.getType()) {
      case 'atomic':
        entity = contentState.getEntity(block.getEntityAt(0));
        isHorizontalRule = entity.type === 'HORIZONTAL_RULE';
        if (isHorizontalRule) {
          ret = {
            component: DividerBlock,
            editable: false,
            props: {},
          };
        }
        break;
      default:
        ret = null;
        break;
    }

    return ret;
  }

  render() {
    const { editorState, showURLInput, urlValue } = this.state;
    const { className, readOnly } = this.props;
    const linkClass = cx('RichEditor-styleButton', {
      'RichEditor-activeButton': showURLInput,
    });

    // If the user changes block type before entering any text, we can
    // either style the placeholder or hide it. Let's just hide it now.
    let editorClassName = 'RichEditor-editor';
    const contentState = editorState.getCurrentContent();
    let urlInput;
    if (showURLInput) {
      urlInput = (
        <div className="urlInputContainer">
          <input
            onChange={this.onURLChange}
            className="urlInput"
            type="text"
            value={urlValue}
            onKeyDown={this.onLinkInputKeyDown}
            placeholder="http://"
            ref={input => {
              this.urlInput = input;
            }}
          />
          <button type="button" onMouseDown={this.confirmLink}>
            Add
          </button>
        </div>
      );
    }
    if (!contentState.hasText()) {
      if (
        contentState
          .getBlockMap()
          .first()
          .getType() !== 'unstyled'
      ) {
        editorClassName += ' RichEditor-hidePlaceholder';
      }
    }

    return (
      <div className={cx(['RichEditor-root', 'RichTextEditor', className])}>
        <div
          className={cx('RichEditor-controls-container', {
            readonly: readOnly,
          })}
        >
          <BlockStyleControls
            className="RichEditor-controls"
            editorState={editorState}
            onToggle={this.toggleBlockType}
          />
          <InlineStyleControls
            editorState={editorState}
            onToggle={this.toggleInlineStyle}
          />
          <div className="RichEditor-controls">
            <span
              className={`fa fa-link ${linkClass}`}
              role="button"
              tabIndex="0"
              onClick={this.promptForLink}
              onKeyPress={this.promptForLink}
            />
            <span
              className="fa fa-chain-broken RichEditor-styleButton"
              role="button"
              tabIndex="0"
              onClick={this.removeLink}
              onKeyPress={this.removeLink}
            />
            <AddDividerBlock
              editorState={editorState}
              onChange={this.onChange}
            />
          </div>
          {urlInput}
        </div>
        <div className={editorClassName}>
          <Editor
            readOnly={readOnly}
            id="rich-editor"
            blockStyleFn={getBlockStyle}
            blockRenderFn={this.blockRenderer}
            editorState={editorState}
            handleKeyCommand={this.handleKeyCommand}
            onChange={this.onChange}
            onTab={this.onTab}
            ref={input => {
              this.editor = input;
            }}
          />
        </div>
      </div>
    );
  }
}

export default RichTextEditor;
