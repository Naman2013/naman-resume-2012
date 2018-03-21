import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

const {
  arrayOf,
  bool,
  func,
  number,
  shape,
  string,
} = PropTypes;

const AnswerListItem = ({
  answer,
  isTopAnswer,
  showAllAnswers,
  toggleAnswers,
}) => (
  <div className="answer">
    {isTopAnswer && <div>Top Answer</div>}
    <div>{answer.displayName}</div>
    <div>{answer.content}</div>
    <div>
      <span>Like ({answer.likesCount})</span>
      <span>Discuss ({answer.replyCount})</span>
      {!showAllAnswers && <span><a onClick={toggleAnswers}>View All Answers to This Question</a></span>}
      {showAllAnswers && <span><a>View All Discussions</a></span>}
    </div>

    <style jsx>{`
      .answer {
        border: 1px solid black;
      }
    `}</style>
  </div>
);

AnswerListItem.defaultProps = {
  answer: {},
  isTopAnswer: false,
};
AnswerListItem.propTypes = {
  answer: shape({}),
  isTopAnswer: bool,
  toggleAnswers: func.isRequired,
};

export default AnswerListItem;
