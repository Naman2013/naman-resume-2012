import React, { Component, PropTypes } from 'react';
import styles from './pulse-post-tools.scss';
import PulsePostHot from './pulse-post-hot'
import PulsePostLikes from './pulse-post-likes'
import PulsePostShare from './pulse-post-share'

const PulsePostTools = ({ hot, likes }) =>

  <div className={styles.PulsePostTools}>

    <PulsePostHot hot={hot} />
    <PulsePostLikes likes={likes} />
    <PulsePostShare />

  </div>;


export default PulsePostTools;

PulsePostTools.propTypes = {
  hot: PropTypes.string,
  likes: PropTypes.string
};