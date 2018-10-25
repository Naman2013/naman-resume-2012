/***********************************
* V4 Ask an Astronomer Question / Answer / Reply Item card
*
*
*
***********************************/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import uniqueId from 'lodash/uniqueId';
import moment from 'moment';
import CommentButton from 'components/common/style/buttons/CommentButton';
import LikeSomethingButton from 'components/common/LikeSomethingButton';
import ReplyButton from 'components/common/DiscussionsBoard/ReplyButton';
import Button from 'components/common/style/buttons/Button';
import ViewImagesButton from 'components/common/style/buttons/ViewImagesButton';
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
    openModal,
    renderChildReplies,
    replyToponlyCount,
    replyTo,
    S3Files,
    toggleComments,
    showComments,
    showLikePrompt,
    submitReply,
    title,
    user,
  } = props;

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

        <div className="content" dangerouslySetInnerHTML={{ __html: title || content }} />
        <div className="explainantion-container">
          <div className="explainantion-item">{moment(creationDate).fromNow()}</div>
          <div className="explainantion-item">Likes: {likesCount}     {commentText}: {replyToponlyCount}</div>
        </div>
        <div className="activity-actions">
          <div className="action-left">
            <LikeSomethingButton
              likeHandler={likeHandler}
              likesCount={likesCount}
              likePrompt={likePrompt}
              likeParams={likeParams}
              openModal={openModal}
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
            {allowReplies ? <ReplyButton
              {...props}
              replyTo={replyTo}
              submitForm={submitReply}
            /> : null }

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
  user: shape({
    at: oneOfType([number, string]),
    token: oneOfType([number, string]),
    cid: oneOfType([number, string]),
  }).isRequired,
  likePrompt: string.isRequired,
  likesCount: number.isRequired,
  replyToponlyCount: number.isRequired,
  S3Files: arrayOf(string),
  submitReply: func,
  showLikePrompt: bool.isRequired,
  renderChildReplies: func,
};

Card.defaultProps = {
  allowReplies: true,
  commentText: 'Answers',
  likeHandler: null,
  likeParams: {},
  openModal: null,
  S3Files: [],
  renderChildReplies: null,
  submitReply: null,
};

export default Card;
