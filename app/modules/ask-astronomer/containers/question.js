import { Question } from 'app/modules/ask-astronomer/components/question';
import {
  clearAnswers,
  submitAnswerToQuestion,
  toggleAllAnswersAndDisplay,
} from 'app/modules/ask-astronomer/reducers/ask-astronomer-answers/actions';
import {
  askQuestion,
  changeAnswerState,
  fetchAstronomerQuestions,
  refetchAstronomerQuestions,
} from 'app/modules/ask-astronomer/reducers/ask-astronomer-questions/actions';
import { fetchObjectSpecialistsAction } from 'app/modules/object-details/actions';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';

const mapStateToProps = ({
  appConfig,
  astronomerAnswers,
  astronomerQuestions,
  astronomerDiscuss,
  objectDetails,
  user,
}) => ({
  allAnswers: astronomerAnswers.allAnswers,
  answers: astronomerAnswers.answers,
  visibleAnswersCount: astronomerAnswers.visible,
  fetching: astronomerAnswers.fetching,
  allDisplayedAnswers: astronomerAnswers.allDisplayedAnswers,
  answerFetching: astronomerAnswers.fetching,
  appConfig,
  objectData: objectDetails.objectData,
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
  objectDetails,
  objectSpecialists: objectDetails.objectSpecialists,
  fetchingReplies: astronomerDiscuss.fetchingReplies,
  fetchingDiscuss: astronomerDiscuss.fetching,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      askQuestion,
      changeAnswerState,
      fetchAstronomerQuestions,
      refetchAstronomerQuestions,
      toggleAllAnswersAndDisplay,
      fetchObjectSpecialistsAction,
      submitAnswerToQuestion,
      clearAnswers,
    },
    dispatch
  ),
});
export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Question);
