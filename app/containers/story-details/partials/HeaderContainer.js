import React from 'react';
import PropTypes from 'prop-types';
import LikeSomethingButton from 'components/common/LikeSomethingButton';
import ToggleReadingList from 'components/common/ToggleReadingList';
import DisplayAtBreakpoint from 'components/common/DisplayAtBreakpoint';
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
  isDesktop,
  likeParams,
  likePrompt,
  likesCount,
  mainImage,
  objectId,
  postId,
  promptIconUrl,
  readingListPrompt,
  showLikePrompt,
  title,
  toggleReadingListFlag,
  user,
}) =>
  (<div className="header-container shadowed">
    <div className="">
      <div dangerouslySetInnerHTML={{ __html: title }} className="story-title" />
      <div className="flex by-line">
        <DisplayAtBreakpoint screenMedium screenLarge screenXLarge>
          <span className="author" dangerouslySetInnerHTML={{ __html: authorInfo.byline}} />
        </DisplayAtBreakpoint>
        <DisplayAtBreakpoint screenSmall>
          <span className="author short" dangerouslySetInnerHTML={{ __html: authorInfo.shortByline}} />
        </DisplayAtBreakpoint>
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
