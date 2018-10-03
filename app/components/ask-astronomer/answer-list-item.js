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
import GenericButton from '../common/style/buttons/Button';
import LikeButton from '../common/style/buttons/LikeButton';
import CommentButton from '../common/style/buttons/CommentButton';
import AnswerReplyList from './answer-reply-list';

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

const AnswerListItem = ({
  answer,
  answerReplies,
  displayedReplies,
  fetchingReplies,
  isTopAnswer,
  likeParams,
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
  return (
    <div className="answer">
      {isTopAnswer && <div className="top-answer">Top Answer</div>}
      <div>
        <span className="display-name">{answer.displayName}</span>
      </div>
      <div className="content">
        <span dangerouslySetInnerHTML={{ __html: answer.content }} />
      </div>
      <div className="date">Answered {moment(answer.creationDate).fromNow()}</div>
      <div className="reply-count">Likes: {answer.likesCount} Replies: {answer.replyCount}</div>
      <div>
        <span className="action-item">
          <LikeButton onClickEvent={likeReply} count="1" />
          <CommentButton onClickEvent={toggleAllAnswerReplies} count="1" />
          <GenericButton onClickEvent={noop} text="Reply" />
          {/* <Heart
            likeAction={likeReply}
            theme="dark"
            count={answer.likesCount}
            authorId={answer.customerId}
            showLikePrompt={answer.showLikePrompt}
            likePrompt={answer.likePrompt}
            params={likeParams}
          /> */}
        </span>
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
          />
        }
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
