import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { iconPlanet as icon } from './tools/pulse-icon';
import styles from './style/pulse-header-banner.scss';

const PulsePostHeader = (list) =>
  <div className={styles.pulsePostHeader}>

    <div className="title">
      {icon[list.icon]} <h1>{list.name} </h1>
    </div>

    <div className="additional">
      <div className="button-nav">
        <Link className="button btn-primary" to="/reservations/slooh-recommends/">Reserve Telescope</Link>
        <Link className="button btn-primary" to="/publish-post">Create New Post</Link>
      </div>
    </div>

  </div>;

export default PulsePostHeader;

PulsePostHeader.propTypes = {
  list: PropTypes.object
};
