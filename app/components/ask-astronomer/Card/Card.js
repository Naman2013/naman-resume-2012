/***********************************
* V4 Ask an Astronomer Question / Answer / Reply Item card
*
*
*
***********************************/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import uniqueId from 'lodash/uniqueId';
import noop from 'lodash/noop';
import moment from 'moment';
import CommentButton from 'components/common/style/buttons/CommentButton';
import LikeSomethingButton from 'components/common/LikeSomethingButton';
import Button from 'components/common/style/buttons/Button';
import ViewImagesButton from 'components/common/style/buttons/ViewImagesButton';
import { customModalStylesBlackOverlay, profilePhotoStyle } from 'styles/mixins/utilities';

import styles, { profPic } from './Card.style'

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

const Card = (props) => {
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
    modalActions,
    renderChildReplies,
    renderReplyButton,
    replyToponlyCount,
    S3Files,
    toggleComments,
    showComments,
    showLikePrompt,
    title,
    user,
  } = props;

  const setModalAndShow = (updatedLikePrompt) => {
    modalActions.setModal({
      promptComponent: <div dangerouslySetInnerHTML={{ __html: updatedLikePrompt }} />,
      promptStyles: customModalStylesBlackOverlay,
    })
    modalActions.showModal();
  }

  return (
    <div className="root" key={uniqueId()}>
      <div className="comment-item">
        <div className="user-info-container">
          <div className="user-info">
            <div style={profPic(avatarURL)} />
            <div className="display-name" dangerouslySetInnerHTML={{ __html: displayName }} />
          </div>
          <span className="date">{moment(creationDate).fromNow()}</span>
        </div>

        <div className="content" dangerouslySetInnerHTML={{ __html: content }} />
        <div className="explainantion-container">
          <div className="explainantion-item">{moment(creationDate).fromNow()}</div>
          <div className="explainantion-item">{`Likes: ${likesCount} `}  {allowReplies ? <span>&nbsp;{`${commentText}: ${replyToponlyCount}`}</span> : null}</div>
        </div>
        <div className="activity-actions">
          <div className="action-left">
            <LikeSomethingButton
              likeHandler={likeHandler}
              likesCount={likesCount}
              likePrompt={likePrompt}
              likeParams={likeParams}
              openModal={setModalAndShow}
              showLikePrompt={showLikePrompt}
              user={user}
              customerId={customerId}
            />
            {renderChildReplies ? <CommentButton
              isActive={showComments}
              onClickEvent={toggleComments}
              count={replyToponlyCount}
            /> : null}
            {S3Files.length > 0 ? <ViewImagesButton images={S3Files} /> : null}
          </div>
          <div className="action-right">
            {allowReplies ? renderReplyButton() : null }

          </div>
        </div>
      </div>
      {showComments && renderChildReplies ? renderChildReplies({
        renderToggle: () => <Button icon="https://vega.slooh.com/assets/v4/common/close_icon.svg" onClickEvent={toggleComments} />
      }) : null}
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

export default Card;
