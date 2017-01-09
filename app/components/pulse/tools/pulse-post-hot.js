import React, { Component, PropTypes } from 'react';
import styles from './pulse-post-tools.scss';

const PulsePostHot = ({ hot }) =>

  <div className={styles.PulsePostHot}>
    <img src="" width={30} height={30}/>
    <span><b>{hot}</b>/500</span>
  </div>;


export default PulsePostHot;

PulsePostHot.propTypes = {
  hot: PropTypes.any
};
