import React from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';
import QuestionList from 'components/ask-astronomer/question-list';
import styles from '../AskAstronomer.style';

const {
  arrayOf,
  bool,
  func,
  number,
  oneOfType,
  shape,
  string,
} = PropTypes;

const MainContainer = ({
  actions,
  allAnswers,
  allDisplayedAnswers,
  count,
  fetchingAnswers,
  fetchingQuestions,
  handlePageChange,
  isDesktop,
  objectId,
  page,
  questions,
  totalCount,
}) => (
  <div>
    {fetchingQuestions && <div className="fa fa-spinner loader" />}
    {!fetchingQuestions && <QuestionList
      allAnswers={allAnswers}
      allDisplayedAnswers={allDisplayedAnswers}
      count={count}
      fetchingAnswers={fetchingAnswers}
      handlePageChange={handlePageChange}
      objectId={objectId}
      page={page}
      isDesktop={isDesktop}
      questions={questions}
      toggleAllAnswersAndDisplay={actions.toggleAllAnswersAndDisplay}
      totalCount={totalCount}
    />}
    <style jsx>{styles}</style>
  </div>
);

MainContainer.propTypes = {
  actions: shape({}),
  allAnswers: shape({}),
  allDisplayedAnswers: shape({}),
  count: number,
  fetchingAnswers: bool,
  fetchingQuestions: bool,
  handlePageChange: func,
  objectId: oneOfType([number, string]),
  page: number,
  questions: arrayOf(shape({})),
  totalCount: number,
};

MainContainer.defaultProps = {
  actions: {},
  allAnswers: {},
  allDisplayedAnswers: {},
  count: 0,
  fetchingAnswers: false,
  fetchingQuestions: false,
  handlePageChange: noop,
  objectId: 0,
  page: 1,
  questions: [],
  totalCount: 0,

};
export default MainContainer;
