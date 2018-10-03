import React from 'react';
import PropTypes from 'prop-types';
import ObjectDetailList from 'components/common/ObjectDetailList';
import LikeSomethingButton from 'components/common/LikeSomethingButton';
import GenericButton from 'components/common/style/buttons/Button';
import { toggleReadingListState, STORY } from 'services/reading-lists';
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
  canLikeFlag,
  followButtonText,
  followButtonIconURL,
  isDesktop,
  postId,
  like,
  likeParams,
  likePrompt,
  likesCount,
  likesParams,
  objectId,
  showLikePrompt,
  title,
  user,
  mainImage,
}) =>
  (<div className="header-container shadowed">
    <div className="">
      <div dangerouslySetInnerHTML={{ __html: title }} className="story-title" />
      <div className="flex by-line">
        <span className="author">Written by Helen Avery</span>
        <div className="flex actions">
          <GenericButton
            onClickEvent={() => {
              toggleReadingListState({
                listItemId: postId,
                readingListType: STORY,
              });
            }}
            text={followButtonText}
            icon={followButtonIconURL}
          />
          {canLikeFlag ? <LikeSomethingButton
            likeHandler={like}
            likesCount={likesCount}
            likePrompt={likePrompt}
            likeParams={likeParams}
            showLikePrompt={showLikePrompt}
            user={user}
            customerId={user.cid}
          /> : null}
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
