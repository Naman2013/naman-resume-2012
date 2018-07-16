/***********************************
* V4 Discussions Comment Reply List Item
*
*
*
***********************************/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import uniqueId from 'lodash/uniqueId';
import { likeReply } from 'services/discussions/like';
import {
  black,
  darkGray,
  lightGray,
} from 'styles/variables/colors';
import DiscussionsCard from 'components/common/DiscussionsCard';

const {
  any,
  bool,
  number,
  shape,
  string,
} = PropTypes;


const CommentRepliesListItem = (props) => (
  <div
    key={uniqueId()}
  >
    <DiscussionsCard
      {...props}
      likeHandler={likeReply}
      isDesktop={props.isDesktop}
    />
  </div>
);

CommentRepliesListItem.propTypes = {
  avatarURL: string.isRequired,
  content: string.isRequired,
  customerId: string.isRequired,
  displayName: string.isRequired,
  creationDate: string.isRequired,
  likeParams: shape({}),
  likePrompt: string.isRequired,
  likesCount: number.isRequired,
  isDesktop: bool.isRequired,
  membershipDisplay: string.isRequired,
  replyId: number.isRequired,
  showLikePrompt: bool.isRequired,
};

export default CommentRepliesListItem;
