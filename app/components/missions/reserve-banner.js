import React, { Component, PropTypes } from 'react';
import UniversalTime from '../common/universal-time';
import classnames from 'classnames';
import styles from './reserve-banner.scss';

const ReserveBanner = (time) => {
  return (
    <div className={styles.reserveBanner}>
      <div className="title col-md-5 pull-left">
        <h1>Reserve Telescope</h1>
      </div>
      <UniversalTime extraClass='pull-right' />
    </div>
  )
};

export default ReserveBanner;
