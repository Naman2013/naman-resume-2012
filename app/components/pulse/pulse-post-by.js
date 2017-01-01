import React, { Component, PropTypes } from 'react';
import styles from './style/pulse-post-by.scss';

const PulsePostBy = ({ image, name, from, post }) =>
  <div className={styles.pulsePostBy}>
    <p><img src={image}/></p>
    <span className={styles.pulsePostByName}>{name}</span>
    {post.map((p, k) => <span key={k} className={styles.pulsePostByPost}>{p}</span>)}
    <br/>
    <span className={styles.pulsePostByFrom}>{from}</span>
  </div>;

export default PulsePostBy;

PulsePostBy.propTypes = {
  image: PropTypes.string,
  name: PropTypes.string,
  from: PropTypes.string,
  post: PropTypes.array,
};
