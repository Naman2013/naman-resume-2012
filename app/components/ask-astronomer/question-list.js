import React from 'react';
import PropTypes from 'prop-types';
import QuestionsListItem from './question-list-item';

const {
  arrayOf,
  number,
  shape,
} = PropTypes;
const QuestionsList = ({ answers, questions }) => (
  <div>
    {
      questions.map(item => (<QuestionsListItem
        answers={answers[item.threadId]}
        key={item.threadId}
        item={item}
      />),
      )
    }
  </div>
);

QuestionsList.defaultProps = {
  questions: [],
  answers: {},
};
QuestionsList.propTypes = {
  answers: shape({}),
  questions: arrayOf(shape({
    threadId: number.isRequired,
  })),
};

export default QuestionsList;
