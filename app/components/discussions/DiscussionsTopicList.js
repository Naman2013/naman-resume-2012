import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'immutable';
import DiscussionsTopicListItem from './DiscussionsTopicItem';

const { instanceOf, func } = PropTypes;
const DiscussionsTopicList = ({ topics, toggleFollowTopic }) => (
  <div>
    { topics && topics.toArray().map(item => (
      <DiscussionsTopicListItem
        toggleFollowTopic={toggleFollowTopic}
        key={item.topicId} item={item}
      />
    ))}
  </div>
);

DiscussionsTopicList.defaultProps = {
  topics: new List(),
};

DiscussionsTopicList.propTypes = {
  topics: instanceOf(List),
  toggleFollowTopic: func.isRequired,
};

export default DiscussionsTopicList;
