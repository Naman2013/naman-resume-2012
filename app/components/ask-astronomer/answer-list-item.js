import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import AnswerReplyList from './answer-reply-list';

import { avatarImgStyle } from './styles';

const {
  arrayOf,
  bool,
  func,
  number,
  shape,
  string,
} = PropTypes;

const AnswerListItem = ({
  answer,
  answerReplies,
  displayedReplies,
  fetchingReplies,
  isTopAnswer,
  objectId,
  showAllAnswers,
  showAllReplies,
  showReplies,
  threadId,
  toggleAllAnswerReplies,
  toggleAnswerReplies,
  toggleAnswers,
  topicId,
}) => {
  const avatarStyle = Object.assign(avatarImgStyle(answer.avatarURL), { height: '50px', width: '50px'});
  return (
    <div className="answer">
      {isTopAnswer && <div>Top Answer</div>}
      <div><div style={avatarStyle}></div>{answer.displayName}</div>
      <div>{answer.content}</div>
      <div>
        <span className="action-item">Like ({answer.likesCount})</span>
        <span className="action-item"><a onClick={toggleAnswerReplies}>Discuss ({answer.replyCount})</a></span>
        {!showAllReplies && showReplies && <span className="action-item"><a onClick={toggleAllAnswerReplies}>View All Discussions</a></span>}
        {!showAllAnswers && <span className="action-item"><a onClick={toggleAnswers}>View All Answers to This Question</a></span>}
      </div>

      {!fetchingReplies &&
        showReplies &&
        answerReplies &&
          <AnswerReplyList
          answerReplies={answerReplies}
          displayedReplies={displayedReplies}
          objectId={objectId}
          replyId={answer.replyId}
          showAllReplies={showAllReplies}
          showReplies={showReplies}
          threadId={threadId}
          topicId={topicId}
        />}
        {fetchingReplies && <div className="fa fa-spinner" />}

      <style jsx>{`
        .answer {
          margin-left: 15px;
          border: 1px solid black;
        }

        .action-item {
          margin: 0 5px;
        }

        .action-item:first-child {
          margin-left: 0px;
        }

      `}</style>
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
  fetchingReplies: bool,
  isTopAnswer: bool,
  objectId: string.isRequired,
  showAllReplies: bool,
  showReplies: bool,
  threadId: number.isRequired,
  toggleAllAnswerReplies: func.isRequired,
  toggleAnswerReplies: func.isRequired,
  toggleAnswers: func.isRequired,
  topicId: number.isRequired,
};

export default AnswerListItem;
