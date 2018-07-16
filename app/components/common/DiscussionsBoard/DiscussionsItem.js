/***********************************
* V4 Discussions Thread List Item
*
*
*
***********************************/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import uniqueId from 'lodash/uniqueId';
import DiscussionComments from './DiscussionComments';
import { likeThread } from 'services/discussions/like';
import DiscussionsCard from 'components/common/DiscussionsCard';


const {
  any,
  arrayOf,
  bool,
  number,
  oneOfType,
  shape,
  string,
} = PropTypes;

const DiscussionsItem = props => (
  <div
    key={uniqueId()}
  >
    <DiscussionsCard
      {...props}
      likeHandler={likeThread}
      isDesktop={props.isDesktop}
      renderChildReplies={() => (<DiscussionComments
        callSource={props.callSource}
        threadId={props.threadId}
        count={props.count}
        topicId={props.topicId}
        forumId={props.forumId}
        user={props.user}
        isDesktop={props.isDesktop}
      />)}
    />
  </div>);


DiscussionsItem.propTypes = {
  avatarURL: string.isRequired,
  callSource: string,
  count: number,
  customerId: string.isRequired,
  displayName: string.isRequired,
  forumId: number.isRequired,
  freshness: string.isRequired,
  likeParams: shape(any),
  user: shape({
    at: oneOfType([number, string]),
    token: oneOfType([number, string]),
    cid: oneOfType([number, string]),
  }).isRequired,
  isDesktop: bool.isRequired,
  likePrompt: string.isRequired,
  likesCount: number.isRequired,
  membershipDisplay: string.isRequired,
  replyCount: number.isRequired,
  S3Files: arrayOf(string),
  showLikePrompt: bool.isRequired,
  threadId: number.isRequired,
  title: string.isRequired,
  topicId: number.isRequired,
};

DiscussionsItem.defaultProps = {
  callSource: null,
  count: 10,
  likeParams: {},
  S3Files: [],
};

export default DiscussionsItem;
