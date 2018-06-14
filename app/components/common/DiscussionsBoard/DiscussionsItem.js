/***********************************
* V4 Discussions Thread List Item
*
*
*
***********************************/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DiscussionComments from './DiscussionComments';
import { THREAD_REPLIES } from 'services/discussions';
import { likeThread } from 'services/discussions/like';
import Heart from '../heart/heart';
// import CommentList from './comment-list';
import PulsePostThumbnails from 'components/pulse/pulse-post-image-thumbnails';
import { dropShadowedContainer, profPic } from './styles';
import {
  darkBlueGray,
  white,
} from 'styles/variables/colors';

const {
  arrayOf,
  bool,
  func,
  number,
  shape,
  string,
} = PropTypes;

class DiscussionsItem extends Component {

  static propTypes = {
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
    showLikePrompt: bool.isRequired,
    S3Files: arrayOf(string),
    threadId: number.isRequired,
    topicId: number.isRequired,
  };

  static defaultProps = {
    S3Files: [],
  };

  state = {
    showAllComments: false,
  };

  toggleAllComments = () => {
    const { showAllComments } = this.state;

    this.setState({
      showAllComments: !showAllComments,
    });
  }

  render () {
    const {
      avatarURL,
      callSource,
      count,
      customerId,
      displayName,
      forumId,
      freshness,
      likeParams,
      likePrompt,
      likesCount,
      membershipDisplay,
      page,
      title,
      replyCount,
      S3Files,
      showLikePrompt,
      threadId,
      topicId,
      user,
    } = this.props;

    const {
      showAllComments,
    } = this.state;

    const {
      toggleAllComments,
    } = this;

    return (
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
            <div className="activity-content" dangerouslySetInnerHTML={{ __html: title }} />
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
            {!showAllComments ? <div className="comment-action" onClick={toggleAllComments}>{replyCount > 0 ? `View Comments` : `Add Comment`}</div> : null}
          </div>
          {showAllComments ? <div>
            <div className="comment-action" onClick={toggleAllComments}>Close Comments</div>
            <DiscussionComments
              callSource={callSource}
              threadId={threadId}
              count={count}
              topicId={topicId}
              forumId={forumId}
              user={user}
            />
          </div> : null}
        </div>
        <style jsx>{`
          .activity-item {
            ${dropShadowedContainer}
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
  }
}

export default DiscussionsItem;
