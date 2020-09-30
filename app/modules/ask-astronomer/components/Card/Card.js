/***********************************
 * V4 Ask an Astronomer Question / Answer / Reply Item card
 *
 *
 *
 ***********************************/

import React, { Component } from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';
import moment from 'moment/moment';
import CommentButton from 'app/components/common/style/buttons/CommentButton';
import LikeSomethingButton from 'app/components/common/LikeSomethingButton';
import ViewImage from 'app/modules/multi-upload-images/components/view-image';
import Button from 'app/components/common/style/buttons/Button';
import ViewImagesButton from 'app/components/common/style/buttons/ViewImagesButton';
import {
  customModalStylesBlackOverlay,
  profilePhotoStyle,
} from 'app/styles/mixins/utilities';

import styles, { profPic } from './Card.style';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { setPublicCardStatusAction } from '../../../upcoming-events/upcoming-events-actions';

const {
  any,
  arrayOf,
  bool,
  func,
  number,
  oneOfType,
  shape,
  string,
} = PropTypes;

const Card = props => {
  const {
    avatarURL,
    allowReplies,
    creationDate,
    commentText,
    content,
    customerId,
    displayName,
    isDesktop,
    likeHandler,
    likeParams,
    likePrompt,
    likesCount,
    likedByMe,
    likeTooltip,
    modalActions,
    objectName,
    renderChildReplies,
    renderReplyButton,
    replyToponlyCount,
    replyCount,
    S3Files,
    title,
    toggleComments,
    showComments,
    showLikePrompt,
    showObjectName,
    user,
    commentBtnDisabled,
    authorInfo,
    setPublicCardStatusAction,    
  } = props;

  const setModalAndShow = updatedLikePrompt => {
    modalActions.setModal({
      promptComponent: (
        <div dangerouslySetInnerHTML={{ __html: updatedLikePrompt }} />
      ),
      promptStyles: customModalStylesBlackOverlay,
    });
    modalActions.showModal();
  };
  
  return (
    <div className="root">
      <div className="comment-item">
        <div className="user-info-container">
          <div className="user-info">
            <div style={profPic(avatarURL)} />
            <Link onClick={()=>setPublicCardStatusAction(authorInfo.customerUUID, true)}>
              <div
                className="display-name"
                dangerouslySetInnerHTML={{ __html: displayName }}
              />
            </Link>
          </div>
          <span className="date">{moment.utc(creationDate).fromNow()}</span>
        </div>

        {showObjectName && (
          <div className="object-name-container">{objectName}</div>
        )}

        <div
          className="content"
          dangerouslySetInnerHTML={{ __html: content || title }}
        />
        {!!S3Files.length && <ViewImage images={S3Files} />}
        <div className="explainantion-container">
          <div className="explainantion-item">
            {moment.utc(creationDate).fromNow()}
          </div>
          <div className="explainantion-item">
            {`Likes: ${likesCount} `}{' '}
          </div>
          {allowReplies ? (
            <div className="explainantion-item">
              <span>{`${commentText}: ${replyToponlyCount}`}</span>
            </div>
          ) : null}
        </div>
        <div className="activity-actions">
          <div className="action-left">
            <LikeSomethingButton
              likeHandler={likeHandler}
              likesCount={likesCount}
              likedByMe={likedByMe}
              likeTooltip={likeTooltip}
              likePrompt={likePrompt}
              likeParams={likeParams}
              showLikePrompt={showLikePrompt}
              customerId={customerId}
            />
            {renderChildReplies ? (
              <CommentButton
                isDisabled={commentBtnDisabled}
                isActive={showComments}
                onClickEvent={toggleComments}
                count={replyToponlyCount || replyCount}
                alwaysShowCount
              />
            ) : null}
            {/*{S3Files.length > 0 ? <ViewImagesButton images={S3Files} /> : null}*/}
          </div>
          <div className="action-right">
            {allowReplies ? renderReplyButton() : null}
          </div>
        </div>
      </div>
      {showComments && renderChildReplies
        ? renderChildReplies({
            renderToggle: () => (
              <Button
                icon="https://vega.slooh.com/assets/v4/common/close_icon.svg"
                onClickEvent={toggleComments}
              />
            ),
          })
        : null}
      <style jsx>{styles}</style>
    </div>
  );
};

Card.propTypes = {
  avatarURL: string.isRequired,
  allowReplies: bool,
  commentText: string,
  customerId: oneOfType([number, string]).isRequired,
  displayName: string.isRequired,
  openModal: func,
  freshness: string,
  likeHandler: func,
  likeParams: shape({}),
  isDesktop: bool.isRequired,
  modalActions: shape({
    closeModal: func,
    setModal: func,
    showModal: func,
  }).isRequired,
  user: shape({
    at: oneOfType([number, string]),
    token: oneOfType([number, string]),
    cid: oneOfType([number, string]),
  }).isRequired,
  likePrompt: string.isRequired,
  likesCount: number.isRequired,
  replyToponlyCount: number.isRequired,
  renderReplyButton: func,
  S3Files: arrayOf(string),
  showLikePrompt: bool.isRequired,
  renderChildReplies: func,
};

Card.defaultProps = {
  allowReplies: true,
  commentText: 'Answers',
  likeHandler: null,
  likeParams: {},
  modalActions: {
    showModal: noop,
  },
  S3Files: [],
  renderReplyButton: null,
  renderChildReplies: null,
};

const mapDispatchToProps = {
  setPublicCardStatusAction
}

export default compose(connect(null, mapDispatchToProps)) (Card);
