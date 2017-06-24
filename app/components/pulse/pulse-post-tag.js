import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import uniqueId from 'lodash/uniqueId';
import styles from './style/pulse-post-tag.scss';

const PulsePostTag = ({ tags }) =>

  <figure className={styles.PulsePostTags}>
    <span>Tags: </span>
    {
      tags.map(tag =>
        <div key={uniqueId()} className={styles.PulsePostTag}>
          <Link to="#">{tag}</Link>
        </div>
      )
    }
  </figure>;

PulsePostTag.defaultProps = {
  tags: [],
};

PulsePostTag.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string),
};

export default PulsePostTag;
