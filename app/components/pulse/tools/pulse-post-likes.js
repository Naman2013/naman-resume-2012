import React, { Component, PropTypes } from 'react';
import styles from './pulse-post-tools.scss';

const PulsePostLikes = ({ likes }) =>

  <div className={styles.PulsePostLikes}>
    <div className={styles.PulsePostLikesIcon}>
      <img src="" width={30} height={30}/>
      <span>{likes}</span>
    </div>
    Like
  </div>;


export default PulsePostLikes;

PulsePostLikes.propTypes = {
  likes: PropTypes.any
};