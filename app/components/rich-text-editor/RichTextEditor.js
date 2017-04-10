import { CompositeDecorator, Editor, EditorState, RichUtils, Modifier } from 'draft-js';
import { convertToHTML } from 'draft-convert';
import React, { PropTypes } from 'react';
import classnames from 'classnames';
import 'draft-js/dist/Draft.css';
import styles from './RichTextEditor.scss';

class RichTextEditor extends React.Component {
  static propTypes = {
    onChange: PropTypes.func,
  }

  constructor(props) {
    super(props);

    const decorator = new CompositeDecorator([
      {
        strategy: findLinkEntities,
        component: Link,
      },
    ]);

    this.state = {
      editorState: EditorState.createEmpty(decorator),
      showURLInput: false,
      urlValue: '',
    };
  }

  onChange = (editorState) => {
    const {
      onChange,
    } = this.props;
    this.setState({
      editorState,
    });
    const content = editorState.getCurrentContent();
    const threadContent = content.getPlainText().trim() && convertToHTML({
      blockToHTML: (block) => {
        if (block.text === '') {
          return <p><br/></p>;
        }
      },
      entityToHTML: (entity, originalText) => {
        if (entity.type === 'LINK') {
          return <a href={entity.data.url} target="_blank" rel="noopener noreferrer">{originalText}</a>;
        }
        return originalText;
      }
    })(content);
    onChange(threadContent);
  }

  onTab = (e) => { // sets tab spacing (i.e.: ul)
    const maxDepth = 4;
    this.onChange(RichUtils.onTab(e, this.state.editorState, maxDepth));
  }

  handleKeyCommand = (command) => { // allows ctl+b ctl+i like commands
    const { editorState } = this.state;
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  }

  // "BlockType" is the top line of tools on the editor,
  // block elements affect all text on that line of the editor
  toggleBlockType = (blockType) => {
    this.onChange(
      RichUtils.toggleBlockType(
        this.state.editorState,
        blockType,
      )
    );
  }

  // "inline styles" (second line of the editor) styles will not affect the whole line of text,
  // just what is highlighted
  toggleInlineStyle = (inlineStyle) => {
    this.onChange(
      RichUtils.toggleInlineStyle(
        this.state.editorState,
        inlineStyle
      )
    );
  }

  promptForLink = (e) => {
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

      let url = '';
      if (linkKey) {
        const linkInstance = contentState.getEntity(linkKey);
        url = linkInstance.getData().url;
      }
      this.setState({
        showURLInput: true,
        urlValue: url,
      }, () => {
        this.urlInput.focus();
      });
    }
  }

  confirmLink = (e) => {
    e.preventDefault();
    const { editorState, urlValue } = this.state;
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
     'LINK',
     'MUTABLE',
     { url: urlValue }
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity });
    this.setState({
      editorState: RichUtils.toggleLink(
        newEditorState,
        newEditorState.getSelection(),
        entityKey
      ),
      showURLInput: false,
      urlValue: '',
    }, () => {
      this.editor.focus();
    });
  }

  onLinkInputKeyDown = (e) => {
    if (e.which === 13) {
      this.confirmLink(e);
    }
  }

  removeLink = (e) => {
    e.preventDefault();
    const { editorState } = this.state;
    const selection = editorState.getSelection();
    if (!selection.isCollapsed()) {
      this.setState({
        editorState: RichUtils.toggleLink(editorState, selection, null),
      });
    }
  }

  onURLChange = (e) => {
    this.setState({
      urlValue: e.target.value
    })
  };

  render() {
    const { editorState, showURLInput } = this.state;
    const linkClass = classnames('RichEditor-styleButton', {
      'RichEditor-activeButton': showURLInput,
    });

    // If the user changes block type before entering any text, we can
    // either style the placeholder or hide it. Let's just hide it now.
    let className = 'RichEditor-editor';
    const contentState = editorState.getCurrentContent();
    let urlInput;
    if (showURLInput) {
      urlInput = (
        <div className={styles.urlInputContainer}>
          <input
            onChange={this.onURLChange}
            className={styles.urlInput}
            type="text"
            value={this.state.urlValue}
            onKeyDown={this.onLinkInputKeyDown}
            placeholder="http://"
            ref={(input) => { this.urlInput = input; }}
          />
          <button onMouseDown={this.confirmLink}>
            Add
          </button>
        </div>);
    }
    if (!contentState.hasText()) {
      if (contentState.getBlockMap().first().getType() !== 'unstyled') {
        className += ' RichEditor-hidePlaceholder';
      }
    }

    return (
      <div className={`RichEditor-root ${styles.RichTextEditor}`}>
        <div className="RichEditor-controls-container">
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
              onClick={this.promptForLink}
            />
            <span className="fa fa-chain-broken RichEditor-styleButton" onClick={this.removeLink} />
          </div>
          {urlInput}
        </div>
        <div className={className}>
          <Editor
            id="rich-editor"
            blockStyleFn={getBlockStyle}
            editorState={editorState}
            handleKeyCommand={this.handleKeyCommand}
            onChange={this.onChange}
            onTab={this.onTab}
            ref={(input) => { this.editor = input; }}
          />
        </div>
      </div>
    );
  }

}

function getBlockStyle(block) {
  switch (block.getType()) {
    case 'blockquote': return 'RichEditor-blockquote';
    default: return null;
  }
}

function findLinkEntities(contentBlock, callback, contentState) {
  contentBlock.findEntityRanges(
    (character) => {
      const entityKey = character.getEntity();
      return (
        entityKey !== null &&
        contentState.getEntity(entityKey).getType() === 'LINK'
      );
    },
    callback
  );
}

const Link = (props) => {
  const { url } = props.contentState.getEntity(props.entityKey).getData();
  return (
    <a href={url} className={styles.link} target="_blank" rel="noopener noreferrer">
      {props.children}
    </a>
  );
};

class StyleButton extends React.Component {
  constructor() {
    super();
    this.onToggle = (e) => {
      e.preventDefault();
      this.props.onToggle(this.props.style);
    };
  }

  render() {
    let className = 'RichEditor-styleButton';
    if (this.props.active) {
      className += ' RichEditor-activeButton';
    }

    return (
      <span className={className}
        onMouseDown={this.onToggle}
        dangerouslySetInnerHTML={{ __html: this.props.label }}
      />
    );
  }
}

const BLOCK_TYPES = [
  { label: '<i class="fa fa-header header-icon-h1" key="h1" />', style: 'header-one' },
  { label: '<i class="fa fa-header header-icon-h2" key="h2" />', style: 'header-two' },
  { label: '<i class="fa fa-header header-icon-h3" key="h3" />', style: 'header-three' },
  { label: '<i class="fa fa-header header-icon-h4" key="h4" />', style: 'header-four' },
  { label: '<i class="fa fa-header header-icon-h5" key="h5" />', style: 'header-five' },
  { label: '<i class="fa fa-header header-icon-h6" key="h6" />', style: 'header-six' },
  { label: '<i class="fa fa-quote-left" />', style: 'blockquote' },
  { label: '<i class="fa fa-list-ul" />', style: 'unordered-list-item' },
  { label: '<i class="fa fa-list-ol" />', style: 'ordered-list-item' },
];

const BlockStyleControls = (props) => {
  const { editorState } = props;
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return (
    <div className="RichEditor-controls">
      {BLOCK_TYPES.map((type) =>
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

const INLINE_STYLES = [
  { label: '<i class="fa fa-bold" />', style: 'BOLD' },
  { label: '<i class="fa fa-italic" />', style: 'ITALIC' },
  { label: '<i class="fa fa-underline" />', style: 'UNDERLINE' },
];

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

export default RichTextEditor;
