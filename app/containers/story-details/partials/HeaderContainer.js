import React from 'react';
import PropTypes from 'prop-types';
import LikeSomethingButton from 'components/common/LikeSomethingButton';
import ToggleReadingList from 'components/common/ToggleReadingList';
import { STORY } from 'services/reading-lists';
import like from 'services/community-content/like';

import styles from '../StoryDetails.style';

const {
  arrayOf,
  bool,
  number,
  oneOfType,
  shape,
  string,
} = PropTypes;

const HeaderContainer = ({
  authorInfo,
  canLikeFlag,
  readingListPrompt,
  promptIconUrl,
  isDesktop,
  postId,
  likeParams,
  likePrompt,
  likesCount,
  objectId,
  showLikePrompt,
  title,
  toggleReadingListFlag,
  user,
  mainImage,
}) =>
  (<div className="header-container shadowed">
    <div className="">
      <div dangerouslySetInnerHTML={{ __html: title }} className="story-title" />
      <div className="flex by-line">
        <span className="author">Written by Helen Avery</span>
        <div className="flex actions">
          {toggleReadingListFlag ? <ToggleReadingList
            itemId={postId}
            readingListType={STORY}
            readingListPrompt={readingListPrompt}
            promptIconUrl={promptIconUrl}
          /> : null}
          <LikeSomethingButton
            likeHandler={like}
            likesCount={likesCount}
            likePrompt={likePrompt}
            likeParams={likeParams}
            showLikePrompt={showLikePrompt}
            user={user}
            customerId={authorInfo.customerId}
          />
        </div>
      </div>
      {mainImage ? <div className="vert-line-container">
        <div className="vert-line" />
          <div className="story-main-image-container">
            <img src={mainImage} className="story-main-image" />
          </div>
        </div> :
        null}
    </div>
    <style jsx>{styles}</style>
  </div>);

HeaderContainer.propTypes = {
  isDesktop: bool,
};

HeaderContainer.defaultProps = {
  isDesktop: true,
  user: {},
};

export default HeaderContainer;
