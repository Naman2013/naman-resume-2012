import React from 'react';
import PropTypes from 'prop-types';
import QuestionListItem from './question-list-item';

const {
  arrayOf,
  func,
  number,
  shape,
  string,
} = PropTypes;

const QuestionList = ({
  allAnswers,
  allDisplayedAnswers,
  objectId,
  questions,
  toggleAllAnswersAndDisplay,
}) => (
  <div>
    {
      questions.map(item => {
        const threadAnswers = allAnswers[item.threadId] || { replies: [] };
        const allDisplayedAnswersObjs = threadAnswers
          .replies
          .filter(answer => allDisplayedAnswers[item.threadId] && allDisplayedAnswers[item.threadId].indexOf(answer.replyId) > -1);
        return (<QuestionListItem
          answers={allAnswers[item.threadId]}
          displayedAnswers={allDisplayedAnswersObjs}
          key={item.threadId}
          item={item}
          toggleAllAnswersAndDisplay={toggleAllAnswersAndDisplay}
          objectId={objectId}
        />)
    },
      )
    }
  </div>
);

QuestionList.defaultProps = {
  questions: [],
  allAnswers: {},
  allDisplayedAnswers: {},
};
QuestionList.propTypes = {
  allAnswers: shape({}),
  allDisplayedAnswers: shape({}),
  questions: arrayOf(shape({
    threadId: number.isRequired,
  })),
  toggleAllAnswersAndDisplay: func.isRequired,
  objectId: string.isRequired,
};

export default QuestionList;
