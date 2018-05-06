/***********************************
* V4 Community Group Activity List
*
*
*
***********************************/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { likeReply } from '../../../services/discussions/like';
import Heart from '../../common/heart/heart';
import CommentList from './comment-list';
import { dropShadowedContainer, profPic } from '../styles';
import {
  darkBlueGray,
  white,
} from '../../../styles/variables/colors';

const {
  arrayOf,
  bool,
  func,
  number,
  shape,
  string,
} = PropTypes;


const ActivityListItem = ({
  avatarURL,
  comments,
  content,
  creationDate,
  customerId,
  displayName,
  likeParams,
  likePrompt,
  likesCount,
  membershipDisplay,
  replyCount,
  showLikePrompt,
  threadId,
  topicId,
  toggleAllCommentsAndDisplay,
  displayedComments,
}) => (
  <div className="activity-item" key={threadId}>
  <div className="user-info">
    <div style={profPic(avatarURL)} />
    <div className="user-info-text">
      <h5 dangerouslySetInnerHTML={{ __html: displayName }} />
      <div dangerouslySetInnerHTML={{ __html: membershipDisplay }} />
    </div>
  </div>
    <span className="date">Posted {`${moment(creationDate).fromNow()}`}</span>
    <div dangerouslySetInnerHTML={{ __html: content }} />
    <div className="activity-actions">
      <div className="action-left">
        <Heart
          likeAction={likeReply}
          theme="dark"
          count={likesCount}
          authorId={customerId}
          showLikePrompt={showLikePrompt}
          likePrompt={likePrompt}
          params={likeParams}
        />
        <span>Comments ({replyCount})</span>
      </div>
      <div className="action-right">
        {!comments.showAllComments ? <div className="comment-action" onClick={() => toggleAllCommentsAndDisplay({
          threadId,
          showAllComments: true,
        })}>{replyCount > 0 ? `View Comments` : `Add Comment`}</div> : null}
      </div>
      {comments.showAllComments ? <div>
        <div className="comment-action" onClick={() => toggleAllCommentsAndDisplay({
          threadId,
          showAllComments: false,
        })}>Close Comments</div>
        {displayedComments.length > 0 ? <CommentList
          displayedComments={displayedComments}
          threadId={threadId}
          topicId={topicId}
        /> :
        <div>No Comments to display</div>}
      </div> : null}
    </div>
    <style jsx>{`
      .activity-item {
        ${dropShadowedContainer}
      }

      .action-left {
        display: flex;
        flex-direction: row;
        align-items: center;
        min-height: 50px;
      }

      .comment-action {
        cursor: pointer;
      }

      .user-info {
        display: flex;
        flex-direction: row;
      }
      .user-info-text {
        margin-left: 10px;
      }
    `}</style>
  </div>
);

ActivityListItem.defaultProps = {
  displayedComments:[],
  comments: {},
  threadReplies: {
    avatarURL: '',
    displayName: '',
    content: '',
    likesCount: 0,
    replyCount: 0,
    replyId: 0,
  },
};
ActivityListItem.propTypes = {
  avatarURL: string.isRequired,
  content: string.isRequired,
  creationDate: string.isRequired,
  customerId: string.isRequired,
  displayName: string.isRequired,
  likeParams: shape({}),
  likePrompt: string.isRequired,
  likesCount: number.isRequired,
  membershipDisplay: string.isRequired,
  replyCount: number.isRequired,
  comments: shape({}),
  showLikePrompt: bool.isRequired,
  threadId: number.isRequired,
  threadReplies: shape({
    page: number,
    replies: arrayOf(shape({
      avatarURL: string.isRequired,
      displayName: string.isRequired,
      content: string.isRequired,
      likesCount: number.isRequired,
      replyCount: number.isRequired,
      replyId: number.isRequired,
    })),
  }),
  toggleAllCommentsAndDisplay: func.isRequired,
  topicId: number.isRequired,
};

export default ActivityListItem;
