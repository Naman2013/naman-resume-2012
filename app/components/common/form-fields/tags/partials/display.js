import React from 'react';
import PropTypes from 'prop-types';
import Tag from './tag';
import styles from './display.style';

const {
  arrayOf,
  func,
  number,
  shape,
  string,
} = PropTypes;

const DisplayTags = (props) => {
  const { tags, deleteTag } = props;
  return (
    <div className="root">
      {tags.length === 0 ? <span className="title-text">There are no tags</span> : null}
      {tags.map(tag => <Tag {...tag} deleteTag={deleteTag} />)}
      <style jsx>{styles}</style>
    </div>
  );
};

DisplayTags.propTypes = {
  tags: arrayOf(shape({
    tagIndex: number.isRequired,
    tagText: string.isRequired,
  })),
  deleteTag: func.isRequired,
};

DisplayTags.defaultProps = {
  tags: [],
};

export default DisplayTags;
