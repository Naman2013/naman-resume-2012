import React, { Component, PropTypes } from 'react';
import styles from './community-post-tools.scss';
import CommunityPostHot from './community-post-hot'
import CommunityPostLikes from './community-post-likes'
import CommunityPostShare from './community-post-share'

const CommunityPostTools = ({ hot, likes, share }) =>
  <div className={styles.CommunityPostTools}>

    {hot ? <CommunityPostHot hot={hot} /> : ""}
    {likes ? <CommunityPostLikes likes={likes} /> : ""}
    {share ? <CommunityPostShare /> : ""}

  </div>;


export default CommunityPostTools;

CommunityPostTools.propTypes = {
  hot: PropTypes.any,
  likes: PropTypes.any,
  share: PropTypes.bool,
};
