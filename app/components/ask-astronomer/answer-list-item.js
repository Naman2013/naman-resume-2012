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
import DiscussionsCard from 'components/common/DiscussionsCard';
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
    numberOfRepliesToAnswer,
    objectId,
    showAllAnswers,
    showAllReplies,
    showReplies,
    threadId,
    toggleAllAnswerReplies,
    toggleAnswerReplies,
    toggleAnswers,
    topicId,
  } = props;
  console.log('props answer list item', props)
  return (
    <div className="answer-list-item">
      {isTopAnswer && <div className="top-answer">Top Answer</div>}
      <DiscussionsCard
        {...props.answer}
        replyTo={answer.replyId}
        showComments={answer.showAllReplies}
        toggleComments={toggleAllAnswerReplies}
        likeHandler={likeReply}
        isDesktop={isDesktop}
        allowReplies={canReplyToAnswers}
        renderChildReplies={({
          renderToggle,
        }) => (<AnswerReplyList
          answerReplies={answerReplies}
          numberOfRepliesToAnswer={numberOfRepliesToAnswer}
          displayedReplies={displayedReplies}
          objectId={objectId}
          isDesktop={isDesktop}
          replyId={answer.replyId}
          showAllReplies={showAllReplies}
          showReplies={showReplies}
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
  canReplyToAnswers: bool.isRequired,
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
