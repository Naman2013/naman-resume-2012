import DisplayAtBreakpoint from 'app/components/common/DisplayAtBreakpoint';
import { Link } from 'react-router';
import LikeSomethingButton from 'app/components/common/LikeSomethingButton';
import ToggleReadingList from 'app/components/common/ToggleReadingList';
import { STORY } from 'app/services/reading-lists';
import PropTypes from 'prop-types';
import React from 'react';

import styles from '../StoryDetails.style';

const { arrayOf, bool, number, oneOfType, shape, string } = PropTypes;

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
  theme = {},
  toggleReadingListFlag,
  user,
  likeStory,
}) => (
  <div className="header-container shadowed" style={theme}>
    <div className="">
      <div
        dangerouslySetInnerHTML={{ __html: title }}
        className="story-title"
      />
      <div className="flex by-line">
        <DisplayAtBreakpoint screenMedium screenLarge screenXLarge>
          <Link to={authorInfo.linkUrl}>
            <span
              className="author"
              dangerouslySetInnerHTML={{ __html: authorInfo.byline }}
            />
          </Link>
        </DisplayAtBreakpoint>
        <DisplayAtBreakpoint screenSmall>
          <Link to={authorInfo.linkUrl}>
            <span
              className="author short"
              dangerouslySetInnerHTML={{ __html: authorInfo.shortByline }}
            />
          </Link>
        </DisplayAtBreakpoint>
        <div className="flex actions">
          {toggleReadingListFlag ? (
            <ToggleReadingList
              itemId={postId}
              readingListType={STORY}
              readingListPrompt={null}
              promptIconUrl={promptIconUrl}
            />
          ) : null}
          <LikeSomethingButton
            likeHandler={likeStory}
            likesCount={likesCount}
            likePrompt={likePrompt}
            likeParams={likeParams}
            showLikePrompt={showLikePrompt}
            customerId={authorInfo.customerId}
          />
        </div>
      </div>
      {mainImage ? (
        <div className="vert-line-container">
          <div className="vert-line" />
          <div className="story-main-image-container">
            <div className="story-circle-container">
              <img
                style={{ backgroundImage: `url(${mainImage})` }}
                className="story-main-image"
              />
            </div>
          </div>
        </div>
      ) : null}
    </div>
    <style jsx>{styles}</style>
  </div>
);

HeaderContainer.propTypes = {
  isDesktop: bool,
};

HeaderContainer.defaultProps = {
  isDesktop: true,
  user: {},
};

export default HeaderContainer;
