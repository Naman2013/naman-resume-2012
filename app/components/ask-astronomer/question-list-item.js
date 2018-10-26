/***********************************
* V4 Ask Astronomer Question List Item
*
*
*
***********************************/
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import noop from 'lodash/noop';
import uniqueId from 'lodash/uniqueId';
import { likeThread } from 'services/discussions/like';
import Card from 'components/ask-astronomer/Card';
import AnswerList from './answer-list';

import style from './question-list-item.style';


const {
  arrayOf,
  any,
  bool,
  func,
  number,
  shape,
  string,
} = PropTypes;

const QuestionListItem = (props) => {
  const {
    actions,
    answers,
    canAnswerQuestions,
    canReplyToAnswers,
    displayedAnswers,
    fetching,
    isDesktop,
    item,
    modalActions,
    objectId,
    submitAnswer,
    toggleAllAnswersAndDisplay,
  } = props;

  const toggleAllAnswers = () => toggleAllAnswersAndDisplay({
    threadId: item.threadId,
    showAllAnswers: !answers.showAllAnswers,
  });
    return (<div className="shadowed-container margin" key={uniqueId}>
      <Card
        {...props.item}
        objectId={objectId}
        showComments={answers.showAllAnswers}
        replyTo={item.threadId}
        toggleComments={toggleAllAnswers}
        likeHandler={likeThread}
        isDesktop={isDesktop}
        allowReplies={canAnswerQuestions}
        submitReply={submitAnswer}
        commentText="Answers"
        replyButtonText="Submit an Answer"
        modalActions={modalActions}
        renderChildReplies={() => (<AnswerList
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
        />)}
      />
      {fetching && <div className="fa fa-spinner loader" />}
      <style jsx>{style}</style>
    </div>
  )
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
  }).isRequired,
  answers: shape({
    replies: arrayOf(shape({
      avatarURL: string.isRequired,
      displayName: string.isRequired,
      content: string.isRequired,
      likesCount: number.isRequired,
      replyCount: number.isRequired,
      replyId: number.isRequired,
    })),
    topAnswer: number
  }),
  displayedAnswers: arrayOf(any), // array of ids
  objectId: string.isRequired,
  fetching: bool,
  modalActions: shape({
    closeModal: func,
    setModal: func,
    showModal: func,
  }).isRequired,
};

export default QuestionListItem;
