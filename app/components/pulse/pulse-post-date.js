import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { iconCategory as icon } from '../community/tools/community-icon';
import styles from './style/pulse-post-date.scss';

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
