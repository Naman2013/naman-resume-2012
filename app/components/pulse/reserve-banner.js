import React, { Component, PropTypes } from 'react';
import styles from './reserve-banner.scss';

const ReserveBanner = () =>
  <div className={styles.reserveBanner}>
    <div className="title col-md-5 pull-left">
      <h1>SLOOH PULSE</h1>
    </div>
    <button className="button btn-primary pull-right">Create new post</button>
  </div>;

export default ReserveBanner;
