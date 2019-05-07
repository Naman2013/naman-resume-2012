import React from 'react';
import PropTypes from 'prop-types';
import styles from './input.style';

const { string, func } = PropTypes;

const TagInput = ({ newTagText, placeholder, handleTagTextChange }) => (
  <div className="root">
    <input
      className="add-tag-input"
      type="text"
      placeholder={placeholder}
      value={newTagText}
      onChange={handleTagTextChange}
    />
    <style jsx>{styles}</style>
  </div>
);

TagInput.propTypes = {
  handleTagTextChange: func.isRequired,
  newTagText: string.isRequired,
  placeholder: string,
};

TagInput.defaultProps = {
  placeholder: '',
};

export default TagInput;
