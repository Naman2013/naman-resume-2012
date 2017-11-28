import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import {
  white,
  brightBlue,
} from '../../styles/variables/colors';
const { number, shape, string } = PropTypes;

const DiscussionsTopicItem = ({ item, toggleFollowTopic}) => (
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
        {item.followingFlag ?
          <button className="action-button following-button" onClick={() => toggleFollowTopic(item.topicId)}>Following</button> :
          <button className="action-button follow-button" onClick={() => toggleFollowTopic(item.topicId)}>Follow</button>}

      </div>
    </div>
    <style jsx>{`
      .action-button {
        padding: 5px 5px;
        margin: 4px auto;
        border-radius: 50px;
        cursor: pointer;
        min-width: 75px;
        border: 1px solid ${brightBlue};
      }

      .action-button:active,
      .action-button:focus {
        outline: 0;
      }

      .follow-button {
        color: ${brightBlue};
        background-color: ${white};
      }

      .following-button {
        background-color: ${brightBlue};
        color: ${white};
      }
    `}</style>
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
