import React, { Component, PropTypes } from 'react';
import styles from './pulse-post-tools.scss';

const PulsePostShare = ({ date, category }) =>

  <div className={styles.PulsePostShare}>
    <img src="" width={30} height={30}/>
    <span>Share</span>
  </div>;


export default PulsePostShare;

PulsePostShare.propTypes = {
  date: PropTypes.string,
  category: PropTypes.string
};