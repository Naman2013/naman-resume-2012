import React from 'react';
import PropTypes from 'prop-types';
import styles from './community-post-tools.scss';
import CommunityPostHot from './community-post-hot';
import CommunityPostShare from './community-post-share';
import Heart from '../../common/heart/heart';
import SocialSharingBar from '../../common/social-sharing-bar/SocialSharingBar';

const inlineSSCWithPhotoStyle = {
    display: 'block',
    marginTop: '2em',
    marginLeft: '0.5em',
};

const inlineSSCWithoutPhotoStyle = {
    display: 'block',
    marginTop: '2em',
    marginLeft: '-1em',
};


const CommunityPostTools = ({ hot, type, authorId, objectSlug, likesCount, likeId, share, showLikePrompt, likePrompt, title, description, shareURL, imageList }) =>
  <div className={styles.CommunityPostTools}>

    <Heart
      theme="dark"
      count={likesCount}
      likeId={likeId}
      showLikePrompt={showLikePrompt}
      likePrompt={likePrompt}
      type={type}
      authorId={authorId}
      objectSlug={objectSlug}
    />
    {hot ? <CommunityPostHot hot={hot} /> : null}
    {share ? <CommunityPostShare /> : null}

    {share == "true" && <div>
      {imageList.length > 0 ?
        <div style={inlineSSCWithPhotoStyle}>
          <SocialSharingBar
              contentLayout="horizontal"
              shareTitle={title}
              shareDescription={description}
              shareURL={shareURL}
              shareImageURL={imageList[0]}
            />
        </div>
        :
        <div style={inlineSSCWithoutPhotoStyle}>
          <SocialSharingBar
              contentLayout="horizontal"
              shareTitle={title}
              shareDescription={description}
              shareURL={shareURL}
            />
        </div>
        }
      </div>
    }
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
