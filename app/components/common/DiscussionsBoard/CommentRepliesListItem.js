/***********************************
* V4 Discussions Comment Reply List Item
*
*
*
***********************************/

import React from 'react';
import PropTypes from 'prop-types';
import { likeReply } from 'services/discussions/like';
import Heart from '../heart/heart';
import {
  black,
} from 'styles/variables/colors';
import { profPic } from './styles';

const {
  any,
  bool,
  number,
  shape,
  string,
} = PropTypes;


const CommentRepliesListItem = ({
  avatarURL,
  content,
  customerId,
  displayName,
  freshness,
  likeParams,
  likePrompt,
  likesCount,
  membershipDisplay,
  replyCount,
  replyId,
  showLikePrompt,
}) => (
  <div className="comment-item" key={replyId}>
    <div className="user-info">
      <div style={profPic(avatarURL)} />
      <div className="user-info-text">
        <h5 dangerouslySetInnerHTML={{ __html: displayName }} />
        <div dangerouslySetInnerHTML={{ __html: membershipDisplay }} />
      </div>
    </div>
    <span className="date"  dangerouslySetInnerHTML={{ __html: freshness}} />
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
      </div>
      <div className="action-right">
      </div>
    </div>
    <style jsx>{`
      .comment-item {
        margin: 25px;
        padding: 25px;
        margin-left: 50px;
        border: 1px solid ${black};
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

CommentRepliesListItem.defaultProps = {
  likeParams: {},
};
CommentRepliesListItem.propTypes = {
  avatarURL: string.isRequired,
  displayName: string.isRequired,
  content: string.isRequired,
  customerId: string.isRequired,
  freshness: string.isRequired,
  likesCount: number.isRequired,
  likePrompt: string.isRequired,
  showLikePrompt: bool.isRequired,
  replyCount: number.isRequired,
  replyId: number.isRequired,
  membershipDisplay: string.isRequired,
  likeParams: shape({}),
};

export default CommentRepliesListItem;
