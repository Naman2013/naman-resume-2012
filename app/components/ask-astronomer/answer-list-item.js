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
import AnswerReplyList from './answer-reply-list';

import { avatarImgStyle } from './styles';
import { black, darkBlueGray, white, turqoise } from '../../styles/variables/colors';
import { secondaryFont } from '../../styles/variables/fonts';



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
  const avatarStyle = Object.assign(avatarImgStyle(answer.avatarURL), { height: '50px', width: '50px'});
  return (
    <div className="answer">
      {isTopAnswer && <div className="top-answer">Top Answer</div>}
      <div>
        <div style={avatarStyle} />
        <span className="display-name">{answer.displayName}</span>
      </div>
      <div className="content">
        <span dangerouslySetInnerHTML={{ __html: answer.content }} />
      </div>
      <div>
        <span className="action-item">
          <Heart
            likeAction={likeReply}
            theme="dark"
            count={answer.likesCount}
            authorId={answer.customerId}
            showLikePrompt={answer.showLikePrompt}
            likePrompt={answer.likePrompt}
            params={likeParams}
            />
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

      <style jsx>{`
        .answer {
          padding: 15px;
          margin-left: 25px;

        }

        .answer:not(:last-child) {
          border-bottom: 1px solid ${black};
        }

        .top-answer {
          background-color: ${darkBlueGray};
          padding: 5px 10px;
          text-transform: uppercase;
          font-weight: bold;
          font-size: 10px;
          color: ${white};
          float: right;
          margin-top: -15px;
        }

        .action-item,
        .action-item a {
          color: ${turqoise};
          cursor: pointer;
        }

        .action-item :global(.heart-wrapper) {
          display: inline-block;
        }

        .action-item :global(.likeText) {
          font-size: 16px;
          display: inline;
        }
        .action-item,
        .display-name {
          margin: 0 5px;
        }

        .display-name {
          font-weight: bold;
          text-transform: uppercase;
          font-size: 10px;
        }

        .action-item:first-child {
          margin-left: 25px;
        }

        .content {
          margin: 15px 0;
          margin-left: 25px;
          font-family: ${secondaryFont};
        }

        .loader {
          display: block;
          text-align: center;
          font-size: 12px;
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
