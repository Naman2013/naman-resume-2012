import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router'
import styles from './style/pulse-post-tag.scss';

const PulsePostTag = ({ tags }) =>

  <figure className={styles.PulsePostTags}>
    <span>Tags: </span>

    {tags.map(tag =>
      <div key={tag.id} className={styles.PulsePostTag}>
        <Link to="#"><div dangerouslySetInnerHTML={{__html: tag.title}}/></Link>
      </div>
    )}
  </figure>;


export default PulsePostTag;

PulsePostTag.propTypes = {
  tags: PropTypes.array
};
