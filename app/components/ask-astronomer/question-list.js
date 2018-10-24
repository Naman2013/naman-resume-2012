/***********************************
* V4 Ask Astronomer Question List
*
*
*
***********************************/
import React from 'react';
import PropTypes from 'prop-types';
import Pagination from 'rc-pagination';
import QuestionListItem from './question-list-item';

const {
  arrayOf,
  func,
  number,
  shape,
  string,
} = PropTypes;

const QuestionList = ({
  actions,
  allAnswers,
  allDisplayedAnswers,
  canReplyToAnswers,
  canAnswerQuestions,
  count,
  fetchingAnswers,
  handlePageChange,
  isDesktop,
  objectId,
  page,
  questions,
  submitAnswer,
  toggleAllAnswersAndDisplay,
  totalCount,
}) => (
  <div>
    {
      questions.map((item) => {
        const threadAnswers = allAnswers[item.threadId] || { replies: [] };
        const allDisplayedAnswersObjs = threadAnswers
          .replies
          .filter(answer => allDisplayedAnswers[item.threadId] && allDisplayedAnswers[item.threadId].indexOf(answer.replyId) > -1);
        return (<QuestionListItem
          actions={actions}
          answers={allAnswers[item.threadId]}
          canAnswerQuestions={canAnswerQuestions}
          canReplyToAnswers={canReplyToAnswers}
          displayedAnswers={allDisplayedAnswersObjs}
          fetching={fetchingAnswers[item.threadId]}
          isDesktop={isDesktop}
          item={item}
          key={item.threadId}
          objectId={objectId}
          submitAnswer={submitAnswer}
          toggleAllAnswersAndDisplay={toggleAllAnswersAndDisplay}
        />)
    },
      )
    }
    {<Pagination
      onChange={handlePageChange}
      defaultPageSize={count}
      current={page}
      total={totalCount}
    />}
  </div>
);

QuestionList.defaultProps = {
  questions: [],
  allAnswers: {},
  allDisplayedAnswers: {},
  fetchingAnswers: {}
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
