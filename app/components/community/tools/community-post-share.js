import React from 'react';
import PropTypes from 'prop-types';
import styles from './community-post-tools.scss';

const CommunityPostShare = ({ date, category }) =>
  <div className={styles.CommunityPostShare}>
    <img src="" width={30} height={30}/>
    <span>Share</span>
  </div>;


export default CommunityPostShare;

CommunityPostShare.propTypes = {
  date: PropTypes.string,
  category: PropTypes.string
};
