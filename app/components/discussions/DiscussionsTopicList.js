import React, { PropTypes } from 'react';
import { List } from 'immutable';
import DiscussionsTopicListItem from './DiscussionsTopicItem';

const { instanceOf } = PropTypes;
const DiscussionsTopicList = ({ topics }) => (
  <div>
    { topics && topics.map(item => (
      <DiscussionsTopicListItem key={item.topicId} item={item} />
    ))}
  </div>
);

DiscussionsTopicList.defaultProps = {
  topics: new List(),
};

DiscussionsTopicList.propTypes = {
  topics: instanceOf(List),
};

export default DiscussionsTopicList;
