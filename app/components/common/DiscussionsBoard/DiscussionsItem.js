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
import styles from './DiscussionsBoard.style'

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
    className="shadowed-container margin"
    key={uniqueId()}
  >
    <DiscussionsCard
      {...props}
      replyTo={props.threadId}
      toggleComments={() => props.discussionsActions.toggleThreadComments(props.threadId)}
      likeHandler={likeThread}
      isDesktop={props.isDesktop}
      allowReplies={true}
      renderChildReplies={({
        renderToggle,
      }) => (<DiscussionComments
        validateResponseAccess={props.validateResponseAccess}
        discussions={props.discussions}
        discussionsActions={props.discussionsActions}
        callSource={props.callSource}
        threadId={props.threadId}
        count={props.count}
        replyCount={props.replyCount}
        page={props.page}
        topicId={props.topicId}
        forumId={props.forumId}
        user={props.user}
        isDesktop={props.isDesktop}
        renderToggle={renderToggle}
      />)}
    />
    <style jsx>{styles}</style>
  </div>);


DiscussionsItem.propTypes = {
  avatarURL: string.isRequired,
  callSource: string,
  count: number,
  customerId: oneOfType([number, string]).isRequired,
  displayName: string.isRequired,
  forumId: number.isRequired,
  freshness: string.isRequired,
  likeParams: shape({}),
  user: shape({
    at: oneOfType([number, string]),
    token: oneOfType([number, string]),
    cid: oneOfType([number, string]),
  }).isRequired,
  isDesktop: bool.isRequired,
  likePrompt: string.isRequired,
  likesCount: number.isRequired,
  membershipDisplay: string,
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
  membershipDisplay: '',
};

export default DiscussionsItem;
