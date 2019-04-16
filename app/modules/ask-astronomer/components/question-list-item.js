import React from 'react';
import PropTypes from 'prop-types';
import SubmitAnswerButton from 'app/modules/ask-astronomer/components/SubmitAnswerButton';
import { likeThread } from 'app/services/discussions/like';
import Card from 'app/modules/ask-astronomer/components/Card';
import { browserHistory } from 'react-router';
import AnswerList from './answer-list';

import style from './question-list-item.style';

const { arrayOf, any, bool, func, number, shape, string } = PropTypes;

const QuestionListItem = props => {
  const {
    actions,
    answers,
    canAnswerQuestions,
    canReplyToAnswers,
    displayedAnswers,
    likeParams,
    fetching,
    isDesktop,
    item,
    modalActions,
    objectId,
    submitAnswer,
    toggleAllAnswersAndDisplay,
    user,
    updateQuestionsList,
    key,
    showComments,
  } = props;

  const toggleAllAnswers = () =>
    toggleAllAnswersAndDisplay({
      threadId: item.threadId,
      showAllAnswers: !answers.showAllAnswers,
    });
  const likeThreadParams = Object.assign({}, likeParams, {
    threadId: item.threadId,
    authorId: item.customerId,
    forumId: item.forumId,
  });
  return (
    <div className="shadowed-container margin" key={key}>
      <Card
        {...props.item}
        objectId={objectId}
        showComments={answers.showAllAnswers}
        // toggleComments={toggleAllAnswers}
        toggleComments={() => {
          console.log('toggle');
          console.log(props);
          browserHistory.push(
            `/object-details/${props.params.objectId}/question/${item.threadId}`
          );
          toggleAllAnswers();
        }}
        likeHandler={likeThread}
        isDesktop={isDesktop}
        user={user}
        likeParams={likeThreadParams}
        allowReplies={canAnswerQuestions}
        renderReplyButton={() => (
          <SubmitAnswerButton
            {...props.item}
            replyTo={item.threadId}
            submitForm={submitAnswer}
            modalActions={modalActions}
            updateQuestionsList={updateQuestionsList}
            user={user}
          />
        )}
        // renderReplyButton={() => {
        //   console.log('rendReply');
        //   // const path = `/repos/${userName}/${repo}`
        //   // browserHistory.push(path)
        // }}
        commentText="Answers"
        modalActions={modalActions}
        renderChildReplies={() => (
          <AnswerList
            answers={answers}
            canAnswerQuestions={canAnswerQuestions}
            canReplyToAnswers={canReplyToAnswers}
            displayedAnswers={displayedAnswers}
            isDesktop={isDesktop}
            numberOfAnswersToThread={item.replyToponlyCount}
            objectId={objectId}
            threadId={item.threadId}
            topicId={item.topicId}
            modalActions={modalActions}
            updateQuestionsList={updateQuestionsList}
          />
        )}
        // renderChildReplies={() => {} }
      />
      {fetching && <div className="fa fa-spinner loader" />}
      <style jsx>{style}</style>
    </div>
  );
};

QuestionListItem.defaultProps = {
  answers: {
    replies: [],
    topAnswer: null,
  },
  displayedAnswers: [],
  fetching: false,
};
QuestionListItem.propTypes = {
  item: shape({
    creationDate: string.isRequired,
    threadId: number.isRequired,
    content: string.isRequired,
    topicName: string.isRequired,
    displayName: string.isRequired,
    replyCount: number.isRequired,
    topicId: number.isRequired,
    title: string,
  }).isRequired,
  answers: shape({
    replies: arrayOf(
      shape({
        avatarURL: string.isRequired,
        displayName: string.isRequired,
        content: string.isRequired,
        likesCount: number.isRequired,
        replyCount: number.isRequired,
        replyId: number.isRequired,
      })
    ),
    topAnswer: number,
  }),
  displayedAnswers: arrayOf(any), // array of ids
  objectId: string.isRequired,
  fetching: bool,
  modalActions: shape({
    closeModal: func,
    setModal: func,
    showModal: func,
  }).isRequired,
  updateQuestionsList: func.isRequired,
};

export default QuestionListItem;
