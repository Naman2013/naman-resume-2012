/***********************************
* V4 Ask Astronomer Question List Item
*
*
*
***********************************/
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import AnswerList from './answer-list';
import style from './question-list-item.style';

import noop from 'lodash/noop';
import GenericButton from '../common/style/buttons/Button';
import LikeButton from '../common/style/buttons/LikeButton';
import likeReply from '../../services/discussions/like';
import CommentButton from '../common/style/buttons/CommentButton';
import ViewImagesButton from '../common/style/buttons/ViewImagesButton';

const questionImages = ['https://castor.slooh.com/dev101/2018/07/720d/b712/1530882220.jpg', 'https://castor.slooh.com/dev101/2018/07/9879/452d/1531688297.JPG']

const {
  arrayOf,
  any,
  bool,
  number,
  shape,
  string,
} = PropTypes;

const QuestionListItem = ({
  answers,
  displayedAnswers,
  fetching,
  item,
  objectId,
  toggleAllAnswersAndDisplay,
}) => {
  const closeAllAnswers = () => toggleAllAnswersAndDisplay({
    threadId: item.threadId,
    showAllAnswers: false,
  });
  return (
    <div className="question-container">
      <div className="question-details">
        <span className="author">{item.displayName} asked:</span>
      </div>
      <div className="question">
        <span dangerouslySetInnerHTML={{ __html: item.content }} />
      </div>
      <div className="date">Asked {moment(item.creationDate).fromNow()}</div>
      {item.replyCount > 0 && 
        <div className="ask-mobile-details-container">
          <div className="reply-count">
            {answers.showAllAnswers ? `${item.replyCount} answers to this question` : `1 of ${item.replyCount} answers`}
          </div>
          {displayedAnswers.length > 1 && <div><a className="close-answers" onClick={closeAllAnswers}>Close (x)</a></div>}
        </div>
      }
      {item.replyCount === 0 && <div className="reply-count">0 Answers</div>}
      <div className="ask-button-container">
        <LikeButton onClickEvent={likeReply} count="1" />
        <CommentButton onClickEvent={noop} count="1" />
        <ViewImagesButton images={questionImages} />
        <GenericButton onClickEvent={noop} text="Answer" />
      </div>
      {!fetching && <AnswerList
        answers={answers}
        displayedAnswers={displayedAnswers}
        objectId={objectId}
        threadId={item.threadId}
        topicId={item.topicId}
      />}
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
};

export default QuestionListItem;
