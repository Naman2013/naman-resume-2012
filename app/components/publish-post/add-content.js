import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RichTextEditor from '../../components/rich-text-editor/RichTextEditor';
import style from './add-content.scss';

class AddContent extends Component {
  render() {
    return(
      <div className="add-content-wrapper">
        <label htmlFor="headline" className="label text-uppercase">Type in a simple headline for your post.</label>
        <input
          value={this.props.headlineContent}
          onChange={this.props.handleHeadlineChange}
          type="text"
          id="headline"
          placeholder="Headline"
          className="input input-headline"
        />

        <label htmlFor="content" className="label text-uppercase">Paste or type your main content here.</label>
        <RichTextEditor
          id="content"
          editorValue={this.props.bodyContent}
          onChange={this.props.handleBodyContentChange}
        />
      </div>
    )
  }
}

const { string, func } = PropTypes;
AddContent.propTypes = {
  headlineContent: string,
  handleHeadlineChange: func.isRequired,
  bodyContent: string,
  handleBodyContentChange: func.isRequired,
};

export default AddContent;
