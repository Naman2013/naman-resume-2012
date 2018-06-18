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
import {
  black,
} from 'styles/variables/colors';
import Heart from '../heart/heart';
import { profPic } from './styles';

const {
  bool,
  number,
  oneOfType,
  shape,
  string,
} = PropTypes;

class CommentListItem extends Component {
  static defaultProps = {
    callSource: null,
    count: 10,
    forumId: null,
    likeParams: {},
    threadId: null,
    topicId: null,
  };

  static propTypes = {
    avatarURL: string.isRequired,
    callSource: string,
    content: string.isRequired,
    count: number,
    customerId: number.isRequired,
    displayName: string.isRequired,
    forumId: oneOfType([number, string]),
    likeParams: shape({}),
    likePrompt: string.isRequired,
    likesCount: number.isRequired,
    membershipDisplay: string,
    replyCount: number.isRequired,
    replyId: number.isRequired,
    showLikePrompt: bool.isRequired,
    threadId: oneOfType([number, string]),
    topicId: oneOfType([number, string]),
    user: shape({
      at: oneOfType([number, string]),
      token: oneOfType([number, string]),
      cid: oneOfType([number, string]),
    }).isRequired,
  };

  static defaultProps = {
    membershipDisplay: null,
  }

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
      creationDate,
      customerId,
      displayName,
      forumId,
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
        <span className="date"  dangerouslySetInnerHTML={{ __html: creationDate}} />
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
