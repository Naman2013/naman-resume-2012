import BackButton from 'app/atoms/BackButton';
import AnswerList from 'app/modules/ask-astronomer/components/answer-list';
import Card from 'app/modules/ask-astronomer/components/Card';
import QuestionListItem from 'app/modules/ask-astronomer/components/question-list-item';
import style from 'app/modules/ask-astronomer/components/question-list-item.style';
import SubmitAnswerButton from 'app/modules/ask-astronomer/components/SubmitAnswerButton';
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
import { likeThread } from 'app/services/discussions/like';
import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import { browserHistory } from 'react-router';

export class Question extends Component {
  componentDidMount = () => {
    this.checkData();

    this.toggleAllAnswers(true);
  };

  componentWillUnmount = () => {
    this.toggleAllAnswers(false);
  };

  checkData = () => {
    const { questions, params } = this.props;

    if (!questions || !questions.length) {
      // go back to questions list
      browserHistory.push(`/object-details/${params.objectId}/ask`);
      return null;
    }
  };

  toggleAllAnswers = res => {
    const { questions, params, actions } = this.props;
    const { toggleAllAnswersAndDisplay } = actions;

    const item = questions.find(el => +el.threadId === +params.threadId);
    toggleAllAnswersAndDisplay({
      threadId: item.threadId,
      showAllAnswers: res,
    });
  };

  render() {
    const {
      questions,
      params,
      actions,
      allAnswers,
      canAnswerQuestions,
      canReplyToAnswers,
      fetchingAnswers,
      isDesktop,
      likeParams,
      user,
      objectId,
      submitAnswer,
      modalActions,
      updateQuestionsList,
      allDisplayedAnswers,
    } = this.props;

    if (!questions || !questions.length) {
      // go back to questions list
      browserHistory.push(`/object-details/${params.objectId}/ask`);
      return null;
    }

    const {
      askQuestion,
      changeAnswerState,
      fetchAstronomerQuestions,
      toggleAllAnswersAndDisplay,
      fetchObjectSpecialistsAction,
      submitAnswerToQuestion,
    } = actions;

    this.checkData();

    const item = questions.find(el => +el.threadId === +params.threadId) || {};

    const likeThreadParams = Object.assign({}, likeParams, {
      threadId: item.threadId,
      authorId: item.customerId,
      forumId: item.forumId,
    });

    const threadAnswers = allAnswers[item.threadId] || { replies: [] };
    const allDisplayedAnswersObjs = threadAnswers.replies.filter(
      answer =>
        allDisplayedAnswers[item.threadId] &&
        allDisplayedAnswers[item.threadId].indexOf(answer.replyId) > -1
    );

    const answers = allAnswers[params.threadId];
    const fetching = fetchingAnswers[params.threadId];

    return (
      <>
        <BackButton />

        <Container>
          <div className="shadowed-container margin">
            <Card
              {...item}
              objectId={objectId}
              showComments={answers.showAllAnswers}
              likeHandler={likeThread}
              likeParams={likeThreadParams}
              isDesktop={isDesktop}
              user={user}
              allowReplies={canAnswerQuestions}
              renderReplyButton={() => (
                <SubmitAnswerButton
                  {...item}
                  replyTo={item.threadId}
                  submitForm={submitAnswer}
                  modalActions={modalActions}
                  updateQuestionsList={updateQuestionsList}
                  user={user}
                />
              )}
              commentText="Answers"
              modalActions={modalActions}
              renderChildReplies={() => (
                <AnswerList
                  answers={answers}
                  canAnswerQuestions={canAnswerQuestions}
                  canReplyToAnswers={canReplyToAnswers}
                  displayedAnswers={allDisplayedAnswersObjs}
                  isDesktop={isDesktop}
                  numberOfAnswersToThread={item.replyToponlyCount}
                  objectId={objectId}
                  threadId={item.threadId}
                  topicId={item.topicId}
                  modalActions={modalActions}
                  updateQuestionsList={updateQuestionsList}
                />
              )}
            />
            {fetching && <div className="fa fa-spinner loader" />}
            <style jsx>{style}</style>
          </div>
        </Container>
      </>
    );
  }
}
