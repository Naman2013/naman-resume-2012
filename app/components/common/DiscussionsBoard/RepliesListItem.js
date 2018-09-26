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
import DiscussionsCardSimple from 'components/common/DiscussionsCardSimple';
import DiscussionReplies from './DiscussionComments';
import styles from './DiscussionsBoard.style';

const {
  bool,
  func,
  number,
  oneOfType,
  shape,
  string,
} = PropTypes;


const RepliesListItem = props => (
  <div
    className="comment-list-item"
    key={uniqueId()}
  >
    <DiscussionsCard
      {...props}
      replyTo={props.replyId}
      likeHandler={likeReply}
      isDesktop={props.isDesktop}
      allowReplies={false}
    />
    <style jsx>{styles}</style>
  </div>
);

RepliesListItem.defaultProps = {
  callSource: null,
  count: 10,
  forumId: null,
  likeParams: {},
  threadId: null,
  topicId: null,
};

RepliesListItem.propTypes = {
  avatarURL: string.isRequired,
  callSource: string,
  content: string.isRequired,
  count: number,
  customerId: number.isRequired,
  displayName: string.isRequired,
  forumId: oneOfType([number, string]),
  isDesktop: bool.isRequired,
  isSimple: bool,
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


export default RepliesListItem;
