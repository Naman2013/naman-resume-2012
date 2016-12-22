import React, { Component, PropTypes } from 'react';
import styles from './pulse-post-by.scss';

const PulsePostBy = ({ image, name, from }) =>
  <div className={styles.pulsePostBy}>
    <p><img src={image}/></p>
    <span className={styles.pulsePostByName}>{name}</span><br/>
    <span className={styles.pulsePostByFrom}>{from}</span>
  </div>;

export default PulsePostBy;
