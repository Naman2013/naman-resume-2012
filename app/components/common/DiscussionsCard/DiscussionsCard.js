/***********************************
 * V4 Discussions Thread List Item
 *
 *
 *
 ***********************************/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import uniqueId from 'lodash/uniqueId';
import moment from 'moment';
import { FormattedMessage } from 'react-intl';
import CommentButton from 'app/components/common/style/buttons/CommentButton';
import LikeSomethingButton from 'app/components/common/LikeSomethingButton';
import ReplyButton from 'app/components/common/DiscussionsBoard/ReplyButton';
import Button from 'app/components/common/style/buttons/Button';
import ViewImagesButton from 'app/components/common/style/buttons/ViewImagesButton';
import FlagButton from 'app/components/common/FlagButton';
import styles, { profPic } from './DiscussionsCard.style';
import messages from './DiscussionsCard.messages';

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

const DiscussionsCard = props => {
  const {
    avatarURL,
    allowReplies,
    creationDate,
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
    threadId,
    user,
    showTitle,
    flagParams,
  } = props;

  return (
    <div className="root" key={uniqueId()} id={`card-${threadId}`}>
      <div className="comment-item">
        <div className="user-info-container">
          <div className="user-info">
            <div style={profPic(avatarURL)} />
            <div
              className="display-name"
              dangerouslySetInnerHTML={{ __html: displayName }}
            />
          </div>
          <span className="date">{moment.utc(creationDate).fromNow()}</span>
        </div>
        <br />
        {showTitle == true && (
          <div className="title" dangerouslySetInnerHTML={{ __html: title }} />
        )}
        <div
          className="content"
          dangerouslySetInnerHTML={{ __html: content }}
        />
        <div className="explainantion-container">
          <div className="explainantion-item">
            {moment.utc(creationDate).fromNow()}
          </div>
          <div className="explainantion-item">
            <FormattedMessage {...messages.Likes} />: {likesCount}{' '}
            <FormattedMessage {...messages.Comments} />: {replyToponlyCount}
          </div>
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
              customerId={customerId}
            />
            {renderChildReplies ? <CommentButton
              isActive={showComments}
              onClickEvent={toggleComments}
              count={replyToponlyCount}
              alwaysShowCount
            /> : null}
            {S3Files.length > 0 ? <ViewImagesButton images={S3Files} /> : null}
          </div>
          <div className="action-right">
            {allowReplies ? (
              <ReplyButton
                {...props}
                replyTo={replyTo}
                submitForm={submitReply}
              />
            ) : null}
            <FlagButton flagParams={flagParams} />
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

DiscussionsCard.propTypes = {
  avatarURL: string.isRequired,
  allowReplies: bool,
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

DiscussionsCard.defaultProps = {
  allowReplies: true,
  likeHandler: null,
  likeParams: {},
  openModal: null,
  S3Files: [],
  renderChildReplies: null,
  submitReply: null,
};

export default DiscussionsCard;
