import React, { PropTypes } from 'react';
import style from './add-tags.scss';

function AddTags({
  newTagText,
  handleTagTextChange,
  handleAddNewTag,
  handleRemoveTag,
  tags,
}) {
  return (
    <div className="add-tags-wrapper">
      <ul className="tags-list">
        {
          tags.map((tag, index) => (
            <li key={`tag-${tag.tagIndex}`} className="tag">
              {tag.tagText}
              <button
                className="remove-tag-btn"
                onClick={event => handleRemoveTag(event, index)}
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
  );
}

AddTags.defaultProps = {
  tags: [],
};

AddTags.propTypes = {
  newTagText: PropTypes.string.isRequired,
  handleTagTextChange: PropTypes.func.isRequired,
  handleAddNewTag: PropTypes.func.isRequired,
  handleRemoveTag: PropTypes.func.isRequired,
  tags: PropTypes.arrayOf(PropTypes.shape({
    tagIndex: PropTypes.number.isRequired,
    tagText: PropTypes.string.isRequired,
  })),
};

export default AddTags;
