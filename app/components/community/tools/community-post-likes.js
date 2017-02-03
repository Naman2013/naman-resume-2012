import React, { Component, PropTypes } from 'react';
import styles from './community-post-tools.scss';

const CommunityPostLikes = ({ likes }) =>

  <div className={styles.CommunityPostLikes}>
    <div className={styles.CommunityPostLikesIcon}>
      <img src="" width={30} height={30}/>
      <span>{likes}</span>
    </div>
    Like
  </div>;


export default CommunityPostLikes;

CommunityPostLikes.propTypes = {
  likes: PropTypes.any
};
