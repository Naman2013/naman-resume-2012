import React from 'react';
import PropTypes from 'prop-types';
import QuestionListItem from './question-list-item';

const {
  arrayOf,
  number,
  shape,
} = PropTypes;
const QuestionList = ({ allAnswers, allDisplayedAnswers, questions }) => (
  <div>
    {
      questions.map(item => (<QuestionListItem
        answers={allAnswers[item.threadId]}
        displayedAnswers={allDisplayedAnswers[item.threadId]}
        key={item.threadId}
        item={item}
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
};

export default QuestionList;
