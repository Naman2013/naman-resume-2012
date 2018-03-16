import React from 'react';
import PropTypes from 'prop-types';

const {
  arrayOf,
  number,
  shape,
  string,
} = PropTypes;
const QuestionListItem = ({ item, answers }) => (
  <div>
    {item.topicName}
    {item.creationDate}
    Asked By {item.displayName}
    { item.content }
    {item.replyCount}
  </div>
);

QuestionListItem.defaultProps = {
  answers: [],
};
QuestionListItem.propTypes = {
  item: shape({
    creationDate: string.isRequired,
    threadId: number.isRequired,
    content: string.isRequired,
    topicName: string.isRequired,
    displayName: string.isRequired,
    replyCount: number.isRequired,
  }).isRequired,
  answers: arrayOf(shape({})),
};

export default QuestionListItem;
