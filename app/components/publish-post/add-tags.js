import React, { Component, PropTypes } from 'react';
import style from './add-tags.scss';

class AddTags extends Component {
  render() {
    const {
      newTagText,
      handleTagTextChange,
      handleAddNewTag,
      handleRemoveTag,
      tags
    } = this.props;

    const tagsClean = tags || [];

    return  (
      <div className="add-tags-wrapper">
        <ul className="tags-list">
          {
            tagsClean.map((tag, index) => (
              <li key={index} className="tag">
                {tag}
                <button
                  className="remove-tag-btn"
                  onClick={(event) => handleRemoveTag(event, index)}
                >
                  x
                </button>
              </li>
            ))
          }
        </ul>

        <form
          className="tag-form"
          onSubmit={handleAddNewTag}
          method="POST"
        >
          <input
            className="tag-input text-center"
            type="text" placeholder="Type A Tag Here"
            value={newTagText}
            onChange={handleTagTextChange}
          />
        <button className="btn-primary" type="submit">Add</button>
        </form>
      </div>
    )
  }
}

AddTags.defaultProps = {
  tags: [],
};

AddTags.propTypes = {
  newTagText: PropTypes.string.isRequired,
  handleTagTextChange: PropTypes.func.isRequired,
  handleAddNewTag: PropTypes.func.isRequired,
  handleRemoveTag: PropTypes.func.isRequired,
  tags: PropTypes.array,
};

export default AddTags;
