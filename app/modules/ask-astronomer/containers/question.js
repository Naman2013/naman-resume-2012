import { Question } from 'app/modules/ask-astronomer/components/question';
import {
  submitAnswerToQuestion,
  toggleAllAnswersAndDisplay,
} from 'app/modules/ask-astronomer/reducers/ask-astronomer-answers/actions';
import {
  askQuestion,
  changeAnswerState,
  fetchAstronomerQuestions,
} from 'app/modules/ask-astronomer/reducers/ask-astronomer-questions/actions';
import { fetchObjectSpecialistsAction } from 'app/modules/object-details/actions';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';

const mapStateToProps = ({
  appConfig,
  astronomerAnswers,
  astronomerQuestions,
  objectDetails,
  user,
}) => ({
  allAnswers: astronomerAnswers.allAnswers,
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
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      askQuestion,
      changeAnswerState,
      fetchAstronomerQuestions,
      toggleAllAnswersAndDisplay,
      fetchObjectSpecialistsAction,
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
)(Question);
