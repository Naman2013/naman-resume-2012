import Card from 'app/modules/ask-astronomer/components/Card';
import SubmitAnswerReplyButton from 'app/modules/ask-astronomer/components/SubmitAnswerReplyButton';
import React from 'react';
import { injectIntl } from 'react-intl';
import { likeReply } from '../../../services/discussions/like';
import messages from './answer-list-item.messages';
import AnswerReplyList from './answer-reply-list';

import style from './AnswerListItem.style';

const AnswerListItem = props => {
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
      {isTopAnswer && (
        <div className="top-answer">
          {intl.formatMessage(messages.TopAnswer)}
        </div>
      )}
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
        renderReplyButton={() => (
          <SubmitAnswerReplyButton
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
          />
        )}
        renderChildReplies={() => (
          <AnswerReplyList
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
          />
        )}
      />
      {fetchingReplies && <div className="fa fa-spinner loader" />}
      <style jsx>{style}</style>
    </div>
  );
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

export default injectIntl(AnswerListItem);
