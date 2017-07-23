import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import isEmpty from 'lodash/isEmpty';
import ByUserTag from '../common/by-user-tag/by-user-tag';
import Heart from '../common/heart/heart';
import { likeThread } from '../../services/discussions/like';
const { arrayOf, number, shape, string } = PropTypes;

const DiscussionsListItem = ({ item }) => (
  <div className="list-item">
    <div className="row inner">
      <div className="col-md-7 description">
        <div className="topic">
          <Link to={`discussions/forums/${item.forumId}/topics/${item.topicId}/threads/${item.threadId}`}>
            <span dangerouslySetInnerHTML={{ __html: item.title }} /> {item.closedFlag === 'yes' && <img className="closed-icon" src={item.closedIconURL} />}
          </Link>
        </div>
        <div className="started-by">Started by:</div>
        <ByUserTag
          accountType={item.membershipType}
          photo={item.avatarURL}
          name={item.displayName}
          {...item}
        />
        <div className="within">within the <Link className="forum-name" to={`discussions/forums/${item.forumId}/topics`}>{item.forumName}</Link></div>
      </div>
      <div className="col-md-5 info-container">
        <div className="info">
          <span className="info-item">{item.voiceCount}</span>
          <span className="info-item">{item.replyCount}</span>
          <span className="info-item">{item.freshness}</span>
        </div>
        {!isEmpty(item.mostRecentAuthor) && <div className="latest-post-by row">Latest post by {item.mostRecentAuthor.displayName}</div>}
      </div>
      <div className="auto-top">
        <Heart
          membershipType={item.membershipType}
          likeAction={likeThread}
          theme="dark"
          count={item.likesCount}
          showLikePrompt={item.showLikePrompt}
          likePrompt={item.likePrompt}
          authorId={item.customerId}
          params={{
            threadId: item.threadId,
            forumId: item.forumId,
            topicId: item.topicId,
          }}
        />
      </div>
    </div>
  </div>
);

DiscussionsListItem.propTypes = {
  item: shape({
    forumId: number.isRequired,
    topicId: number.isRequired,
    title: string.isRequired,
    threadId: number.isRequired,
    forumName: string.isRequired,
  }).isRequired,
};

export default DiscussionsListItem;
