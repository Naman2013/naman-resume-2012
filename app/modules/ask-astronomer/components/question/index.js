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
    if (this.checkData()) {
      this.toggleAllAnswers(true);
    }

    // this.fetchAnswers();
  };

  fetchQuestions = () => {
    const {
      actions,
      params: { objectId },
    } = this.props;
    const { refetchAstronomerQuestions } = actions;

    // getAllQuestions({ objectId, ...filter });
    refetchAstronomerQuestions({ objectId });
  };

  // todo
  /*fetchAnswers = () => {
    const { fetchAstronomerAnswers, params } = this.props;
    const { threadId } = params;
    console.log(threadId);
    fetchAstronomerAnswers({ threadId });
  };*/

  componentWillUnmount = () => {
    if (this.checkData()) {
      this.toggleAllAnswers(false);
    }
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

  checkData = () => {
    const { questions, params } = this.props;

    if (!questions || !questions.length) {
      // go back to questions list
      browserHistory.push(`/object-details/${params.objectId}/ask`);
      return null;
    }
    return true;
  };

  toggleAllAnswers = res => {
    const { questions, params, actions } = this.props;
    const { toggleAllAnswersAndDisplay } = actions;

    const item = questions.find(el => +el.threadId === +params.threadId) || {};
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
      // modalActions,
      // updateQuestionsList,
      allDisplayedAnswers,
      answerFetching,
      fetchingReplies,
    } = this.props;

    if (!questions || !questions.length) {
      // go back to questions list
      browserHistory.push(`/object-details/${params.objectId}/ask`);
      return null;
    }

    const {
      showPrompt,
      promptComponent,
      promptStyles,
      // aaaQuestionPrompt,
    } = this.state;

    const { setModal, showModal, closeModal } = this;
    const modalActions = { setModal, showModal, closeModal };

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
      <div style={{ position: 'relative' }}>
        <Spinner loading={answerFetching || fetchingReplies} />

        <BackButton />

        <Modal show={showPrompt} onHide={this.closeModal}>
          {promptComponent}
        </Modal>

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
                  submitForm={this.submitAnswer}
                  modalActions={modalActions}
                  updateQuestionsList={() => {
                    this.fetchQuestions();
                  }}
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
                  updateQuestionsList={() => {
                    this.fetchQuestions();
                  }}
                />
              )}
            />
            {fetching && <div className="fa fa-spinner loader" />}
            <style jsx>{style}</style>
          </div>
        </Container>
      </div>
    );
  }
}
