import React, { Component, PropTypes } from 'react';
import { iconPlanet as icon } from './tools/pulse-icon';
import styles from './style/pulse-header-banner.scss';

const PulsePostHeader = (list) =>
  <div className={styles.pulsePostHeader}>

    <div className="title">
      {icon[list.icon]} <h1>{list.name} </h1>
    </div>

    <div className="additional">
      <div className="button-nav">
        <button className="button btn-primary">Reserve Telescope</button>
        <button className="button btn-primary">Follow This Object</button>
        <button className="button btn-primary">Create New Post</button>
      </div>
    </div>

  </div>;

export default PulsePostHeader;

PulsePostHeader.propTypes = {
  list: PropTypes.object
};
