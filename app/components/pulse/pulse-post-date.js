import React, { Component, PropTypes } from 'react';
import styles from './style/pulse-post-date.scss';
import { iconCategory as icon } from './tools/pulse-icon'
import { Link } from 'react-router'

const PulsePostDate = ({ date, category }) =>

  <div className={styles.PulsePostDate}>
    <span>Posted on <span>{date}</span> in</span>

    <Link to={`/slooh-pulse/latest-posts/${icon.contentKey[category]}`}>
      &nbsp;{icon.title[category]} <img src={icon.icon[category]}/>
    </Link>

  </div>;


export default PulsePostDate;

PulsePostDate.propTypes = {
  data: PropTypes.string,
  category: PropTypes.string,
};
