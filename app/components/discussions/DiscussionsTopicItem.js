import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

const { number, shape, string } = PropTypes;

const DiscussionsTopicItem = ({ item }) => (
  <div className="list-item">
    <div className="row inner">
      <div className="col-xs-5 description">
        <div className="topicItem">
          <Link className="link" to={`/discussions/forums/${item.parentForumId}/topics/${item.topicId}/threads`}>
            <span dangerouslySetInnerHTML={{ __html: item.title }} /> {item.closedFlag === 'yes' && <img className="closed-icon" src={item.closedIconURL} />}
          </Link>
          <div className="subtext" dangerouslySetInnerHTML={{ __html: item.topicDesc }} />
        </div>
      </div>
      <div className="col-xs-5 info-container">
        <div className="info">
          <span className="info-item">{item.threadCount}</span>
          <span className="info-item">{item.replyCount}</span>
          <span className="info-item">{item.freshness}</span>
        </div>
      </div>
      <div className="col-xs-2 info-container">
        <button>Follow</button>
      </div>
    </div>
  </div>
);

DiscussionsTopicItem.propTypes = {
  item: shape({
    title: string.isRequired,
    topicId: number.isRequired,
    topicDesc: string.isRequired,
    threadCount: number.isRequired,
    replyCount: number.isRequired,
    freshness: string.isRequired,
    parentForumId: number.isRequired,
  }).isRequired,
};

export default DiscussionsTopicItem;
