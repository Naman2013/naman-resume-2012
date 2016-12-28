import React, { Component, PropTypes } from 'react';
import styles from './style/pulse-post-by.scss';

const PulsePostBy = ({ image, name, from, post }) =>
  <div className={styles.pulsePostBy}>
    <p><img src={image}/></p>
    <span className={styles.pulsePostByName}>{name}</span>
    <span className={styles.pulsePostByPost}>{post}</span>
    <br/>
    <span className={styles.pulsePostByFrom}>{from}</span>
  </div>;

export default PulsePostBy;

PulsePostBy.propTypes = {
  image: PropTypes.string,
  name: PropTypes.string,
  from: PropTypes.string,
  post: PropTypes.string,
};
