/***********************************
* V4 Discussions Comment List Item
*
*
*
***********************************/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CommentRepliesList from './CommentRepliesList';
import { likeReply } from 'services/discussions/like';
import Heart from '../heart/heart';
import {
  black,
} from 'styles/variables/colors';
import { profPic } from './styles';

const {
  bool,
  number,
  string,
} = PropTypes;

class CommentListItem extends Component {
  static defaultProps = {
    commentReplies: {
      showAllReplies: false,
      replies: [],
    },
    displayedReplies: [],
  };

  static propTypes = {
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
  };

  state = {
    showAllReplies: false,
  }

  toggleAllReplies = () => {
    const { showAllReplies } = this.state;

    this.setState({
      showAllReplies: !showAllReplies,
    });
  }

  render() {
    const {
      avatarURL,
      callSource,
      content,
      count,
      customerId,
      displayName,
      forumId,
      freshness,
      likeParams,
      likePrompt,
      likesCount,
      membershipDisplay,
      replyCount,
      replyId,
      showLikePrompt,
      threadId,
      topicId,
      user,
    } = this.props;

    const { showAllReplies } = this.state;
    return (
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
            <span>Comments ({replyCount})</span>
          </div>
          <div className="action-right">
          {!showAllReplies ? <div className="comment-action" onClick={this.toggleAllReplies}>{replyCount > 0 ? `View Comments` : `Add Comment`}</div> : null}
          </div>
          {showAllReplies ? <div>
            <div className="comment-action" onClick={this.toggleAllReplies}>Close Comments</div>
            <CommentRepliesList
              count={count}
              replyId={replyId}
              topicId={topicId}
              forumId={forumId}
              threadId={threadId}
              callSource={callSource}
              user={user}
            />
          </div> : null}
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
  }
}

export default CommentListItem;
