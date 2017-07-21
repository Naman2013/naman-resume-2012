import React from 'react';
import PropTypes from 'prop-types';
import styles from './community-post-tools.scss';

const CommunityPostHot = ({ hot }) =>
  <div className={styles.CommunityPostHot}>
    <img alt="" src="" width={30} height={30} />
    <span><b>{hot}</b>/500</span>
  </div>;

CommunityPostHot.propTypes = {
  hot: PropTypes.any,
};

export default CommunityPostHot;
