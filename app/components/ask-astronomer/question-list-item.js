import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import AnswerList from './answer-list';
const {
  arrayOf,
  number,
  shape,
  string,
} = PropTypes;

const QuestionListItem = ({ item, answers }) => (
  <div>
    {item.topicName}
    <div className="question-details">
      <span className="date">{moment(item.creationDate).fromNow()}</span>
      <span className="author">Asked By {item.displayName}</span>
    </div>

    <div className="question">{item.content}</div>
    <div className="reply-count">
      {item.replyCount > 0 && `${item.replyCount} answers`}
    </div>
    <AnswerList answers={answers} />
    <style jsx>{`
      .question-details {
        display: flex;
        flex-direction: row;
      }

      .date {
        padding-right: 15px;
        border-right: 1px solid black;
      }

      .author {
        padding: 0 15px;
      }
    `}</style>
  </div>
);

QuestionListItem.defaultProps = {
  answers: {
    replies: [],
    topAnswer: null,
  },
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
  answers: shape({}),
};

export default QuestionListItem;
