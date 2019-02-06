import React from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';
import QuestionList from '../../../components/ask-astronomer/question-list';
import Filter from '../../../components/ask-astronomer/question-filter';
import styles from '../AskAstronomer.style';

const {
  arrayOf, bool, func, number, oneOfType, shape, string,
} = PropTypes;

const MainContainer = ({
  actions,
  allAnswers,
  allDisplayedAnswers,
  canReplyToAnswers,
  canAnswerQuestions,
  count,
  likeParams,
  modalActions,
  fetchingAnswers,
  fetchingQuestions,
  handlePageChange,
  isDesktop,
  objectId,
  page,
  questions,
  questionFilter,
  submitAnswer,
  totalCount,
  user = { user },
  updateQuestionsList,
  countText,
  showDropdown,
  dropdownOptions,
  changeAnswerState,
}) => (
  <div>
    <Filter
      changeAnswerState={changeAnswerState}
      totalCount={totalCount}
      selectedFilter={questionFilter}
      countText={countText}
      showDropdown={showDropdown}
      dropdownOptions={dropdownOptions}
    />
    {fetchingQuestions && <div className="fa fa-spinner loader" />}
    {!fetchingQuestions && (
      <QuestionList
        actions={actions}
        allAnswers={allAnswers}
        allDisplayedAnswers={allDisplayedAnswers}
        canReplyToAnswers={canReplyToAnswers}
        canAnswerQuestions={canAnswerQuestions}
        count={count}
        fetchingAnswers={fetchingAnswers}
        handlePageChange={handlePageChange}
        objectId={objectId}
        page={page}
        likeParams={likeParams}
        isDesktop={isDesktop}
        questions={questions}
        submitAnswer={submitAnswer}
        toggleAllAnswersAndDisplay={actions.toggleAllAnswersAndDisplay}
        totalCount={totalCount}
        modalActions={modalActions}
        user={user}
        updateQuestionsList={updateQuestionsList}
      />
    )}
    <style jsx>{styles}</style>
  </div>
);

MainContainer.propTypes = {
  actions: shape({}),
  allAnswers: shape({}),
  allDisplayedAnswers: shape({}),
  count: number,
  fetchingAnswers: shape({}),
  fetchingQuestions: bool,
  handlePageChange: func,
  objectId: oneOfType([number, string]),
  page: number,
  questions: arrayOf(shape({})),
  totalCount: number,
  modalActions: shape({
    closeModal: func,
    setModal: func,
    showModal: func,
  }).isRequired,
  updateQuestionsList: func,
  countText: string,
  showDropdown: bool,
  dropdownOptions: arrayOf(shape({})),
  changeAnswerState: func,
};

MainContainer.defaultProps = {
  actions: {},
  allAnswers: {},
  allDisplayedAnswers: {},
  count: 0,
  fetchingAnswers: {},
  fetchingQuestions: false,
  handlePageChange: noop,
  objectId: 0,
  page: 1,
  questions: [],
  totalCount: 0,
  updateQuestionsList: {},
  countText: null,
  showDropdown: true,
  dropdownOptions: null,
  changeAnswerState: {},
};
export default MainContainer;
