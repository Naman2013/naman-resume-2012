import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import AnswerListItem from './answer-list-item';
const {
  arrayOf,
  number,
  shape,
  string,
} = PropTypes;

const AnswerList = ({ answers }) => (
  <div>
    {answers.replies.map(answer => <AnswerListItem
      answer={answer}
      key={answer.replyId}
      isTopAnswer={answers.topAnswer && answer.replyId === answers.topAnswer}
    />)}
    <style jsx>{`
    `}</style>
  </div>
);

AnswerList.defaultProps = {
  answers: {
    replies: [],
    topAnswer: null,
  },
};
AnswerList.propTypes = {
  answers: shape({}),
};

export default AnswerList;
