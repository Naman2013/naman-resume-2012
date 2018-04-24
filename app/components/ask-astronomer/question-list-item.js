/***********************************
* V4 Ask Astronomer Question List Item
*
*
*
***********************************/
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { black } from '../../styles/variables/colors';
import { primaryFont } from '../../styles/variables/fonts';
import AnswerList from './answer-list';

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
      {item.topicName}
      <div className="question-details">
        <span className="date">{moment(item.creationDate).fromNow()}</span>
        <span className="author">Asked By {item.displayName}</span>
      </div>

      <div className="question"><span dangerouslySetInnerHTML={{ __html: item.content }} /></div>
      {item.replyCount > 0 && <div className="bottom-container">
        <div className="reply-count">
          {answers.showAllAnswers ? `${item.replyCount} answers to this question` : `1 of ${item.replyCount} answers`}
        </div>
        {displayedAnswers.length > 1 && <div><a className="close-answers" onClick={closeAllAnswers}>Close (x)</a></div>}
      </div>}
      {item.replyCount === 0 && <div className="reply-count">0 Answers</div>}
      {!fetching && <AnswerList
        answers={answers}
        displayedAnswers={displayedAnswers}
        objectId={objectId}
        threadId={item.threadId}
        topicId={item.topicId}
      />}
      {fetching && <div className="fa fa-spinner loader" />}
      <style jsx>{`
        .question-container {
          border: 1px solid ${black};
          margin: 10px;
          padding: 15px;
        }
        .question-details {
          display: flex;
          flex-direction: row;
        }

        .question {
          margin: 20px;
          font-weight: bold;
          font-size: 18px;
          font-family: ${primaryFont};
        }

        .date {
          padding-right: 15px;
          border-right: 1px solid ${black};
        }

        .author {
          padding: 0 15px;
        }

        .date,
        .author,
        .reply-count {
          text-transform: uppercase;
          font-size: 10px;
          font-weight: bold;
        }

        .bottom-container {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          padding-bottom: 10px;
          border-bottom: 1px solid ${black};
        }

        .reply-count {
          height: 25px;
        }

        .close-answers {
          cursor: pointer;
          height: 25px;
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
