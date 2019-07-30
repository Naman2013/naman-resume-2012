import React from 'react';
import PropTypes from 'prop-types';
import SubmitAnswerButton from 'app/modules/ask-astronomer/components/SubmitAnswerButton';
import { likeThread } from 'app/services/discussions/like';
import Card from 'app/modules/ask-astronomer/components/Card';
import { browserHistory } from 'react-router';
import noop from 'lodash/noop';
import AnswerList from './answer-list';

import style from './question-list-item.style';

const { arrayOf, any, bool, func, number, shape, string } = PropTypes;

const QuestionListItem = props => {
  const {
    answers,
    canAnswerQuestions,
    likeParams,
    fetching,
    isDesktop,
    item,
    modalActions,
    objectId,
    submitAnswer,
    user,
    updateQuestionsList,
    key,
    params,
  } = props;

  const objId = props.params.objectId || item.objectId;

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
        toggleComments={() =>
          browserHistory.push(
            `/object-details/${objId}/question/${item.threadId}`
          )
        }
        likeHandler={likeThread}
        isDesktop={isDesktop}
        user={user}
        likeParams={likeThreadParams}
        allowReplies={!!(canAnswerQuestions && !params.public)}
        renderReplyButton={() => (
          <SubmitAnswerButton
            {...props.item}
            replyTo={item.threadId}
            submitForm={submitAnswer}
            modalActions={modalActions}
            updateQuestionsList={() =>
              browserHistory.push(
                `/object-details/${objId}/question/${item.threadId}`
              )
            }
            user={user}
          />
        )}
        commentText="Answers"
        modalActions={modalActions}
        renderChildReplies={noop}
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
