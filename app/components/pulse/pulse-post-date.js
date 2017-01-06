import React, { Component, PropTypes } from 'react';
import styles from './style/pulse-post-date.scss';
import { iconCategory as icon } from './tools/pulse-icon'
import { Link } from 'react-router'

const PulsePostDate = ({ date, type, iconURL }) =>

  <div className={styles.PulsePostDate}>
    <span>Posted on <span>{date}</span> in</span>

    <Link to={`/slooh-pulse/latest-posts/${type}`}>
      &nbsp;{icon.title[type]} <img src={icon.icon[type]}/>
    </Link>

  </div>;


export default PulsePostDate;

PulsePostDate.propTypes = {
  data: PropTypes.string,
  type: PropTypes.string,
};
