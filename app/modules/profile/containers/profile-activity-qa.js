import ProfileActivityQa from 'app/modules/profile/components/profile-activity-qa';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import {
  fetchAstronomerQuestions,
  askQuestion,
  changeAnswerState,
} from 'app/modules/ask-astronomer-questions/actions';
import {
  toggleAllAnswersAndDisplay,
  submitAnswerToQuestion,
} from 'app/modules/ask-astronomer-answers/actions';

const mapStateToProps = ({ astronomerAnswers, astronomerQuestions, user }) => ({
  allAnswers: astronomerAnswers.allAnswers,
  allDisplayedAnswers: astronomerAnswers.allDisplayedAnswers,
  questionFilter: astronomerQuestions.questionFilter,
  questions: astronomerQuestions.threadList,
  page: astronomerQuestions.page,
  totalCount: astronomerQuestions.threadCount,
  count: astronomerQuestions.count,
  canAnswerQuestions: astronomerQuestions.canAnswerQuestions,
  canReplyToAnswers: astronomerQuestions.canReplyToAnswers,
  fetchingQuestions: astronomerQuestions.fetching,
  fetchingAnswers: astronomerAnswers.fetchingObj,
  user,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      askQuestion,
      changeAnswerState,
      fetchAstronomerQuestions,
      toggleAllAnswersAndDisplay,
      submitAnswerToQuestion,
    },
    dispatch
  ),
});

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(ProfileActivityQa);
