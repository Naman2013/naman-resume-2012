import React, { Component, PropTypes } from 'react';
import styles from './pulse-post-tools.scss';
import PulsePostHot from './pulse-post-hot'
import PulsePostLikes from './pulse-post-likes'
import PulsePostShare from './pulse-post-share'

const PulsePostTools = ({ hot, likes, share }) =>
  <div className={styles.PulsePostTools}>
    
    {hot !== undefined ? <PulsePostHot hot={hot} /> : ""}
    {likes !== undefined ? <PulsePostLikes likes={likes} /> : ""}
    {share !== undefined ? <PulsePostShare /> : ""}
  
  </div>;


export default PulsePostTools;

PulsePostTools.propTypes = {
  hot: PropTypes.any,
  likes: PropTypes.any,
  share: PropTypes.bool,
};
