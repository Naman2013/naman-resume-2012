import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import _ from 'lodash';
import ByUserTag from '../common/by-user-tag/by-user-tag';

const { arrayOf, number, shape, string } = PropTypes;

const DiscussionsListItem = ({ item }) => (
  <div className="list-item">
    <div className="row inner">
      <div className="col-md-7 description">
        <div className="topic">
          <Link to={`discussions/forums/${item.forumId}/topics/${item.topicId}/threads/${item.threadId}`}>
            <span dangerouslySetInnerHTML={{ __html: item.title }} />
          </Link>
        </div>
        <div className="started-by">Started by:</div>
        <ByUserTag
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
        {!_.isEmpty(item.mostRecentAuthor) && <div className="latest-post-by row">Latest post by {item.mostRecentAuthor.displayName}</div>}
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
