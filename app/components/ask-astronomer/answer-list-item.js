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
import { intlShape, injectIntl } from 'react-intl';
import Card from 'app/components/ask-astronomer/Card';
import GenericButton from '../common/style/buttons/Button';
import LikeButton from '../common/style/buttons/LikeButton';
import CommentButton from '../common/style/buttons/CommentButton';
import AnswerReplyList from './answer-reply-list';
import SubmitAnswerButton from 'app/components/ask-astronomer/SubmitAnswerButton';
import SubmitAnswerReplyButton from 'app/components/ask-astronomer/SubmitAnswerReplyButton';
import { avatarImgStyle } from './styles';
import { black, darkBlueGray, white, turqoise } from '../../styles/variables/colors';
import { secondaryFont } from '../../styles/variables/fonts';

import style from './AnswerListItem.style';
import messages from './answer-list-item.messages';


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
    intl,
    updateQuestionsList,
  } = props;
  return (
    <div className="answer-list-item">
      {isTopAnswer && <div className="top-answer">{intl.formatMessage(messages.TopAnswer)}</div>}
      <Card
        {...props.answer}
        topicId={topicId}
        objectId={objectId}
        threadId={threadId}
        allowReplies={canReplyToAnswers}
        isDesktop={isDesktop}
        likeHandler={likeReply}
        likeParams={likeParams}
        modalActions={modalActions}
        commentText={intl.formatMessage(messages.Replies)}
        showComments={showAllReplies}
        submitReply={submitReply}
        user={user}
        toggleComments={toggleAllAnswerReplies}
        renderReplyButton={() => (<SubmitAnswerReplyButton
          {...props.answer}
          replyTo={answer.replyId}
          submitForm={submitReply}
          modalActions={modalActions}
          replyButtonText={intl.formatMessage(messages.Reply)}
          user={user}
          topicId={topicId}
          objectId={objectId}
          threadId={threadId}
          updateQuestionsList={updateQuestionsList}
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
  intl: intlShape.isRequired,
  updateQuestionsList: func.isRequired,
};

export default injectIntl(AnswerListItem);
