/***********************************
* V4 Ask Astronomer Answer List Item
*
*
*
***********************************/
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { likeReply } from '../../services/discussions/like';
import Heart from '../common/heart/heart';
import noop from 'lodash/noop';
import Card from 'components/ask-astronomer/Card';
import GenericButton from '../common/style/buttons/Button';
import LikeButton from '../common/style/buttons/LikeButton';
import CommentButton from '../common/style/buttons/CommentButton';
import AnswerReplyList from './answer-reply-list';
import SubmitAnswerButton from 'components/ask-astronomer/SubmitAnswerButton';
import { avatarImgStyle } from './styles';
import { black, darkBlueGray, white, turqoise } from '../../styles/variables/colors';
import { secondaryFont } from '../../styles/variables/fonts';

import style from './AnswerListItem.style.js';


const {
  arrayOf,
  bool,
  func,
  number,
  shape,
  string,
} = PropTypes;

const AnswerListItem = (props) => {
  const {
    answer,
    answerReplies,
    canReplyToAnswers,
    displayedReplies,
    fetchingReplies,
    isDesktop,
    isTopAnswer,
    likeParams,
    modalActions,
    numberOfRepliesToAnswer,
    objectId,
    showAllReplies,
    submitReply,
    threadId,
    toggleAllAnswerReplies,
    topicId,
    user,
  } = props;

  return (
    <div className="answer-list-item">
      {isTopAnswer && <div className="top-answer">Top Answer</div>}
      <Card
        {...props.answer}
        topicId={topicId}
        objectId={objectId}
        threadId={threadId}
        allowReplies={canReplyToAnswers}
        isDesktop={isDesktop}
        likeHandler={likeReply}
        modalActions={modalActions}
        commentText="Replies"
        showComments={showAllReplies}
        submitReply={submitReply}
        user={user}
        toggleComments={toggleAllAnswerReplies}
        renderReplyButton={() => (<SubmitAnswerButton
          {...props.answer}
          replyTo={answer.replyId}
          submitForm={submitReply}
          modalActions={modalActions}
          replyButtonText="Reply"
          user={user}
        />)}
        renderChildReplies={() => (<AnswerReplyList
          answerReplies={answerReplies}
          numberOfRepliesToAnswer={numberOfRepliesToAnswer}
          displayedReplies={displayedReplies}
          objectId={objectId}
          modalActions={modalActions}
          isDesktop={isDesktop}
          replyId={answer.replyId}
          showAllReplies={showAllReplies}
          threadId={threadId}
          topicId={topicId}
        />)}
      />
      {fetchingReplies && <div className="fa fa-spinner loader" />}
      <style jsx>{style}</style>
    </div>
  )
};

AnswerListItem.defaultProps = {
  answer: {
    avatarURL: '',
    displayName: '',
    content: '',
    likesCount: 0,
    replyCount: 0,
    replyId: 0,
  },
  answerReplies: {
    avatarURL: '',
    displayName: '',
    content: '',
    likesCount: 0,
    replyCount: 0,
    replyId: 0,
  },
  fetchingReplies: false,
  showReplies: false,
  showAllReplies: false,
  isTopAnswer: false,
};
AnswerListItem.propTypes = {
  answer: shape({
    avatarURL: string.isRequired,
    displayName: string.isRequired,
    content: string.isRequired,
    likesCount: number.isRequired,
    replyCount: number.isRequired,
    replyId: number.isRequired,
  }),
  answerReplies: shape({
    page: number,
    replies: arrayOf(shape({
      avatarURL: string.isRequired,
      displayName: string.isRequired,
      content: string.isRequired,
      likesCount: number.isRequired,
      replyCount: number.isRequired,
      replyId: number.isRequired,
    })),
  }),
  modalActions: shape({
    closeModal: func,
    setModal: func,
    showModal: func,
  }).isRequired,
  canReplyToAnswers: bool.isRequired,
  fetchingReplies: bool,
  isTopAnswer: bool,
  objectId: string.isRequired,
  showAllReplies: bool,
  showReplies: bool,
  submitReply: func.isRequired,
  threadId: number.isRequired,
  toggleAllAnswerReplies: func.isRequired,
  toggleAnswers: func.isRequired,
  topicId: number.isRequired,
};

export default AnswerListItem;
