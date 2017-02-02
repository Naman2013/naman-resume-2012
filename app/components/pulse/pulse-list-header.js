import React from 'react';
import { Link } from 'react-router';
import styles from './style/pulse-header-banner.scss';

const PulseListHeader = () =>
  <div className={styles.pulseListHeader}>
    <div className="title col-md-5 pull-left">
      <h1>SLOOH PULSE</h1>
    </div>
    <Link className="button btn-primary pull-right" to="/publish-post">Create new post</Link>
  </div>;

export default PulseListHeader;
