import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import isEmpty from 'lodash/isEmpty';
import ByUserTag from '../common/by-user-tag/by-user-tag';
import { gray } from '../../styles/variables/colors';

const { arrayOf, number, shape, string } = PropTypes;

const DiscussionsSearchItem = ({ item }) => (
  <div className="list-item">
    <div className="row inner">
      <div className="col-xs-7">
        <ByUserTag
          accountType={item.membershipType}
          photo={item.avatarURL}
          name={item.displayName}
          {...item}
        />
        <div className="thread-info">
          Thread: <Link to={`/discussions/forums/${item.forumId}/topics/${item.topicId}/threads/${item.threadId}`}>
            <span dangerouslySetInnerHTML={{ __html: item.title }} /> {item.closedFlag === 'yes' && <img className="closed-icon" src={item.closedIconURL} />}
          </Link>
          <div dangerouslySetInnerHTML={{ __html: item.content }} />
        </div>
      </div>
    </div>
    <style jsx>{`

      .list-item {
        padding: 15px 0;
        border-bottom: 1px solid ${gray};
      }
      .thread-info {
        margin-left: 50px;
      }
    `}</style>
  </div>
);

DiscussionsSearchItem.propTypes = {
  item: shape({
    forumId: number.isRequired,
    forumName: string.isRequired,
    postId: number.isRequired,
    threadId: number.isRequired,
    threadName: string.isRequired,
    title: string.isRequired,
    topicId: number.isRequired,
    topicName: string.isRequired,
    type: string.isRequired,
    content: string.isRequired,
    creationDate: string.isRequired,
    modified: string.isRequired,
    closedFlag: string.isRequired,
    customerId: number.isRequired,
    firstName: string.isRequired,
    location: string.isRequired,
    membershipType: string.isRequired,
    displayName: string.isRequired,
    userid: string.isRequired,
    memberSince: string.isRequired,
    avatarType: string.isRequired,
    avatarURL: string.isRequired,
  }).isRequired,
};

export default DiscussionsSearchItem;
