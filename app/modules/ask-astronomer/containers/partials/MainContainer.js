import { Spinner } from 'app/components/spinner/index';
import noop from 'lodash/noop';
import React from 'react';
import Filter from '../../components/question-filter';
import QuestionList from '../../components/question-list';
import styles from '../AskAstronomer.style';

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
  params,
  fetchingAnswersBool,
  pages,
}) => (
  <div style={{ position: 'relative' }}>
    <Filter
      changeAnswerState={changeAnswerState}
      totalCount={totalCount}
      selectedFilter={questionFilter}
      countText={countText}
      showDropdown={showDropdown}
      dropdownOptions={dropdownOptions}
    />
    <Spinner loading={fetchingQuestions || fetchingAnswersBool} />
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
        params={params}
        likeParams={likeParams}
        isDesktop={isDesktop}
        questions={questions}
        submitAnswer={submitAnswer}
        toggleAllAnswersAndDisplay={actions.toggleAllAnswersAndDisplay}
        totalCount={totalCount}
        modalActions={modalActions}
        user={user}
        updateQuestionsList={updateQuestionsList}
        pages={pages}
      />
    )}
    <style jsx>{styles}</style>
  </div>
);

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
