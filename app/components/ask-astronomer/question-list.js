import React from 'react';
import PropTypes from 'prop-types';
import QuestionListItem from './question-list-item';

const {
  arrayOf,
  func,
  number,
  shape,
} = PropTypes;
const QuestionList = ({
  allAnswers,
  allDisplayedAnswers,
  questions,
  toggleAllAnswersAndDisplay,
}) => (
  <div>
    {
      questions.map(item => (<QuestionListItem
        answers={allAnswers[item.threadId]}
        displayedAnswers={allDisplayedAnswers[item.threadId]}
        key={item.threadId}
        item={item}
        toggleAllAnswersAndDisplay={toggleAllAnswersAndDisplay}
      />),
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
};

export default QuestionList;
