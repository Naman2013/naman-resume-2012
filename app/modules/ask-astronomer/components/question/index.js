import BackButton from 'app/atoms/BackButton';
import { Spinner } from 'app/components/spinner/index';
import AnswerList from 'app/modules/ask-astronomer/components/answer-list';
import Card from 'app/modules/ask-astronomer/components/Card';
import style from 'app/modules/ask-astronomer/components/question-list-item.style';
import SubmitAnswerButton from 'app/modules/ask-astronomer/components/SubmitAnswerButton';
import { likeThread } from 'app/services/discussions/like';
import { customModalStylesV4 } from 'app/styles/mixins/utilities';
import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import { Modal } from 'app/components/modal';
import { browserHistory } from 'react-router';

export class Question extends Component {
  state = {
    showPrompt: false,
    promptComponent: null,
    promptStyles: customModalStylesV4,
  };

  componentDidMount = () => {
    this.fetchQuestion();
  };

  componentWillUnmount = () => {
    const { actions } = this.props;
    actions.clearAnswers();
  };

  fetchQuestion = () => {
    const {
      actions,
      params: { objectId, threadId },
    } = this.props;
    const { refetchAstronomerQuestions } = actions;

    return refetchAstronomerQuestions({ objectId, threadId, currentPage: 1 });
  };

  showModal = () => {
    this.setState(() => ({
      showPrompt: true,
    }));
  };

  closeModal = () => {
    this.setState(() => ({
      showPrompt: false,
    }));
  };

  setModal = ({ promptComponent, promptStyles }) => {
    this.setState(state => ({
      promptComponent: promptComponent || state.promptComponent,
      promptStyles: promptStyles || state.promptComponent,
    }));
  };

  submitAnswer = (params, callback) => {
    const { actions } = this.props;
    const { submitAnswerToQuestion } = actions;
    return submitAnswerToQuestion(params).then(res => callback(res.payload));
  };

  render() {
    const {
      questions,
      actions,
      answers,
      visibleAnswersCount,
      fetching,
      canAnswerQuestions,
      canReplyToAnswers,
      isDesktop,
      likeParams,
      user,
      answerFetching,
      fetchingReplies,
      fetchingQuestions,
      fetchingDiscuss,
      params: { objectId },
      showObjectName,
      objectName,
    } = this.props;

    if (!questions || !questions.length) {
      return null;
    }

    const { showPrompt, promptComponent } = this.state;

    const { setModal, showModal, closeModal } = this;
    const modalActions = { setModal, showModal, closeModal };

    const item = questions[0];

    const likeThreadParams = Object.assign({}, likeParams, {
      threadId: item.threadId,
      authorId: item.customerId,
      forumId: item.forumId,
      callSource: 'qanda',
    });

    if (!answers) {
      return null;
    }

    return (
      <div style={{ position: 'relative' }}>
        <Spinner
          loading={
            fetching ||
            answerFetching ||
            fetchingReplies ||
            fetchingQuestions ||
            fetchingDiscuss
          }
        />

        <BackButton />

        <Modal show={showPrompt} onHide={this.closeModal}>
          {promptComponent}
        </Modal>

        <Container>
          {showObjectName && (
            <h1 className="h1-custom">Question about {objectName}</h1>
          )}

          <div className="shadowed-container margin">
            <Card
              {...item}
              objectId={objectId}
              showComments
              likeHandler={likeThread}
              likeParams={likeThreadParams}
              isDesktop={isDesktop}
              user={user}
              allowReplies={canAnswerQuestions}
              renderReplyButton={() => (
                <SubmitAnswerButton
                  {...item}
                  replyTo={item.threadId}
                  submitForm={this.submitAnswer}
                  modalActions={modalActions}
                  updateQuestionsList={() => this.fetchQuestion()}
                  user={user}
                />
              )}
              commentText="Answers"
              modalActions={modalActions}
              renderChildReplies={() => (
                <AnswerList
                  answers={answers}
                  visibleAnswersCount={visibleAnswersCount}
                  canAnswerQuestions={canAnswerQuestions}
                  canReplyToAnswers={canReplyToAnswers}
                  isDesktop={isDesktop}
                  numberOfAnswersToThread={item.replyToponlyCount}
                  objectId={objectId}
                  threadId={item.threadId}
                  topicId={item.topicId}
                  modalActions={modalActions}
                  updateQuestionsList={() => this.fetchQuestion()}
                />
              )}
            />
            <style jsx>{style}</style>
          </div>
        </Container>
      </div>
    );
  }
}
