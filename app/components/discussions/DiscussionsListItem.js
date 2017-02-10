import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import _ from 'lodash';
import ByUserTag from '../common/by-user-tag/by-user-tag';

const { object } = PropTypes;

const DiscussionsListItem = ({ item }) => (
  <div className="list-item">
    <div className="row inner">
      <div className="col-md-7 description">
        <div className="topic">
          <Link to={`discussions/topic/${item.topicId}/${item.threadId}`}>
            <span dangerouslySetInnerHTML={{__html: item.title}}></span>
          </Link>
        </div>
        <div className="started-by">Started by:</div>
        <ByUserTag
          {...item}
        />
        <div className="within">within the <span className="forum-name">{item.forumName}</span></div>
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
  item: object.isRequired,
};

export default DiscussionsListItem;
