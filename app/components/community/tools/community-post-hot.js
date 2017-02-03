import React, { Component, PropTypes } from 'react';
import styles from './community-post-tools.scss';

const CommunityPostHot = ({ hot }) =>

  <div className={styles.CommunityPostHot}>
    <img src="" width={30} height={30}/>
    <span><b>{hot}</b>/500</span>
  </div>;


export default CommunityPostHot;

CommunityPostHot.propTypes = {
  hot: PropTypes.any
};
