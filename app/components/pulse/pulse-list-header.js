import React from 'react';
import { Link } from 'react-router';
import styles from './style/pulse-header-banner.scss';

const PulseListHeader = ({ title, showCreateNewPostButton }) =>
  <div className={styles.pulseListHeader}>
    <div className="title col-md-5 pull-left">
      <h1>{title}</h1>
    </div>
    {
      showCreateNewPostButton ? <Link className="button btn-primary pull-right" to="/publish-post">Create new post</Link> : null
    }
  </div>;

export default PulseListHeader;
