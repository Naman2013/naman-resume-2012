import React from 'react';
import PropTypes from 'prop-types';
import { closeAstronaut } from 'styles/variables/iconURLs';
import styles from './tag.style';

const {
  string,
  func,
} = PropTypes;

const Tag = (props) => {
  const {
    tagText,
    deleteTag,
  } = props;
  return (
    <div className="root">
      <img className="delete-tag" src={closeAstronaut} data-text={tagText} onClick={deleteTag} />
      <span dangerouslySetInnerHTML={{ __html: tagText }} />
      <style jsx>{styles}</style>
    </div>
  );
};

Tag.propTypes = {
  tagText: string.isRequired,
  deleteTag: func.isRequired,
};

Tag.defaultProps = {
};

export default Tag;
