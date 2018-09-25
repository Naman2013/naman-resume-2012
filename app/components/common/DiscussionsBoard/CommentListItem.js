/***********************************
* V4 Discussions Comment List Item
*
*
*
***********************************/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import uniqueId from 'lodash/uniqueId';
import { likeReply } from 'services/discussions/like';;
import DiscussionsCard from 'components/common/DiscussionsCard';
import DiscussionReplies from './DiscussionReplies';
import styles from './DiscussionsBoard.style';

const {
  bool,
  func,
  number,
  oneOfType,
  shape,
  string,
} = PropTypes;


const CommentListItem = props => (
  <div
    className="comment-list-item"
    key={uniqueId()}
  >
    <DiscussionsCard
      {...props}
      toggleComments={() => props.discussionsActions.toggleCommentsReplies(props.replyId)}
      likeHandler={likeReply}
      isDesktop={props.isDesktop}
      allowReplies={props.allowReplies}
      renderChildReplies={({
        renderToggle,
      }) => (<DiscussionReplies
        count={props.count}
        replyId={props.replyId}
        topicId={props.topicId}
        forumId={props.forumId}
        replyTo={props.replyId}
        threadId={props.threadId}
        callSource={props.callSource}
        user={props.user}
        isDesktop={props.isDesktop}
        renderToggle={renderToggle}
      />)}
    />
    <style jsx>{styles}</style>
  </div>
);

CommentListItem.defaultProps = {
  isDesktop: true,
  callSource: null,
  count: 10,
  forumId: null,
  likeParams: {},
  threadId: null,
  topicId: null,
};

CommentListItem.propTypes = {
  avatarURL: string.isRequired,
  callSource: string,
  content: string.isRequired,
  count: number,
  customerId: number.isRequired,
  displayName: string.isRequired,
  forumId: oneOfType([number, string]),
  isDesktop: bool.isRequired,
  likeParams: shape({}),
  likePrompt: string.isRequired,
  likesCount: number.isRequired,
  replyCount: number.isRequired,
  replyId: number.isRequired,
  showLikePrompt: bool.isRequired,
  submitReply: func.isRequired,
  threadId: oneOfType([number, string]),
  topicId: oneOfType([number, string]),
  user: shape({
    at: oneOfType([number, string]),
    token: oneOfType([number, string]),
    cid: oneOfType([number, string]),
  }).isRequired,
};


export default CommentListItem;
