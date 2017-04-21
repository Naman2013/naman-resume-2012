import React from 'react';
import PropTypes from 'prop-types';
import styles from './community-post-tools.scss';
import CommunityPostHot from './community-post-hot';
import CommunityPostShare from './community-post-share';
import Heart from '../../common/heart/heart';

const CommunityPostTools = ({ hot, likesCount, likeId, share, showLikePrompt, likePrompt }) =>
  <div className={styles.CommunityPostTools}>

    <Heart
      theme="dark"
      count={likesCount}
      likeId={likeId}
      showLikePrompt={showLikePrompt}
      likePrompt={likePrompt}
    />
    {hot ? <CommunityPostHot hot={hot} /> : null}
    {share ? <CommunityPostShare /> : null}

  </div>;


export default CommunityPostTools;

CommunityPostTools.propTypes = {
  hot: PropTypes.any,
  likes: PropTypes.any,
  share: PropTypes.bool,
  likesCount: PropTypes.number.isRequired,
  likeId: PropTypes.number.isRequired,
  showLikePrompt: PropTypes.bool,
  likePrompt: PropTypes.string,
};
