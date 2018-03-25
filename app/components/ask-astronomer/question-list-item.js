import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import AnswerList from './answer-list';
const {
  arrayOf,
  any,
  number,
  shape,
  string,
} = PropTypes;

const QuestionListItem = ({
  answers,
  displayedAnswers,
  item,
  objectId,
  toggleAllAnswersAndDisplay,
}) => {
  const closeAllAnswers = () => toggleAllAnswersAndDisplay({
    threadId: item.threadId,
    showAllAnswers: false,
  });
  return (
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
      {displayedAnswers.length > 1 && <div><a onClick={closeAllAnswers}>Close (x)</a></div>}
      <AnswerList
        answers={answers}
        displayedAnswers={displayedAnswers}
        objectId={objectId}
        threadId={item.threadId}
        topicId={item.topicId}
      />
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
  )
};

QuestionListItem.defaultProps = {
  answers: {
    replies: [],
    topAnswer: null,
  },
  displayedAnswers: [],
};
QuestionListItem.propTypes = {
  item: shape({
    creationDate: string.isRequired,
    threadId: number.isRequired,
    content: string.isRequired,
    topicName: string.isRequired,
    displayName: string.isRequired,
    replyCount: number.isRequired,
    topicId: number.isRequired,
  }).isRequired,
  answers: shape({
    replies: arrayOf(shape({
      avatarURL: string.isRequired,
      displayName: string.isRequired,
      content: string.isRequired,
      likesCount: number.isRequired,
      replyCount: number.isRequired,
      replyId: number.isRequired,
    })),
    topAnswer: number
  }),
  displayedAnswers: arrayOf(any), // array of ids
  objectId: string.isRequired,
};

export default QuestionListItem;
