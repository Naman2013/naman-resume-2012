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
  canAnswerQuestions,
  canReplyToAnswers,
  count,
  fetchingAnswers,
  handlePageChange,
  isDesktop,
  modalActions,
  likeParams,
  objectId,
  page,
  questions,
  submitAnswer,
  toggleAllAnswersAndDisplay,
  user,
  totalCount,
  updateQuestionsList,
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
          likeParams={likeParams}
          user={user}
          key={item.threadId}
          objectId={objectId}
          submitAnswer={submitAnswer}
          modalActions={modalActions}
          toggleAllAnswersAndDisplay={toggleAllAnswersAndDisplay}
          updateQuestionsList={updateQuestionsList}
        />)
    },
      )
    }
    <div className="d-flex">
      <Pagination
        onChange={handlePageChange}
        defaultPageSize={count}
        current={page}
        total={totalCount}
        showTitle={false}
        prevIcon={<span className="icon icon-arrow-left" />}
        nextIcon={<span className="icon icon-arrow-right" />}
      />
    </div>
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
  modalActions: shape({
    closeModal: func,
    setModal: func,
    showModal: func,
  }).isRequired,
  updateQuestionsList: func.isRequired,
};

export default QuestionList;
