/***********************************
* V4 Community Group Activity List
*
*
*
***********************************/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { likeThread } from '../../../services/discussions/like';
import Heart from '../../common/heart/heart';
import CommentList from './comment-list';
import PulsePostThumbnails from '../../../components/pulse/pulse-post-image-thumbnails';
import { dropShadowContainer } from 'styles/mixins/utilities';
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
  freshness,
  forumId,
  customerId,
  displayedComments,
  displayName,
  likeParams,
  likePrompt,
  likesCount,
  membershipDisplay,
  replyCount,
  S3Files,
  showLikePrompt,
  threadId,
  toggleAllCommentsAndDisplay,
  topicId,
}) => (
  <div className="activity-item" key={threadId}>
    <div className="user-info">
      <div style={profPic(avatarURL)} />
      <div className="user-info-text">
        <h5 dangerouslySetInnerHTML={{ __html: displayName }} />
        <div dangerouslySetInnerHTML={{ __html: membershipDisplay }} />
      </div>
    </div>
      <div className="activity-info">
        <span className="date" dangerouslySetInnerHTML={{ __html: freshness }} />
        {
          S3Files && S3Files.length > 0 ? <PulsePostThumbnails images={S3Files} /> : null
        }
        <div className="activity-content" dangerouslySetInnerHTML={{ __html: content }} />
    </div>
    <div className="activity-actions">
      <div className="action-left">
        <Heart
          likeAction={likeThread}
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
        <CommentList
          comments={comments}
          displayedComments={displayedComments}
          threadId={threadId}
          topicId={topicId}
          forumId={forumId}
        />
      </div> : null}
    </div>
    <style jsx>{`
      .activity-item {
        ${dropShadowContainer}
      }

      .activity-info {
        min-height: 150px;
      }

      .activity-content {
        padding: 25px 0;
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
  S3Files: [],
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
  freshness: string.isRequired,
  customerId: string.isRequired,
  displayName: string.isRequired,
  likeParams: shape({}),
  likePrompt: string.isRequired,
  likesCount: number.isRequired,
  membershipDisplay: string.isRequired,
  replyCount: number.isRequired,
  comments: shape({}),
  showLikePrompt: bool.isRequired,
  S3Files: arrayOf(string),
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
