/***********************************
* V4 Private Profile Ask Astronomer Question List Item
*
*
*
***********************************/

import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Link } from 'react-router';
import ReplyToAstronomerQuestion from './ask-astronomer-reply-to-question';
import { white } from '../../../styles/variables/colors';
import { backgroundImageCover } from '../../../styles/mixins/utilities';

// import { black, darkBlueGray, white, turqoise } from '../../styles/variables/colors';
// import { secondaryFont } from '../../styles/variables/fonts';

const {
  arrayOf,
  bool,
  number,
  shape,
  string,
} = PropTypes;

const AskAstronomerQuestionListItem = ({
  canLikeFlag,
  closedFlag,
  closedIconURL,
  content,
  creationDate,
  displayName,
  forumId,
  forumName,
  freshness,
  likePrompt,
  likesCount,
  modified,
  mostRecentAuthor,
  objectId,
  replyCount,
  S3Files,
  showLikePrompt,
  threadId,
  title,
  topicId,
  topicName,
  user,
  voiceCount,
}) => {
  return (
    <div className="question-item" key={threadId}>
      <div className="title" dangerouslySetInnerHTML={{ __html: topicName }} />
      <div className="body">
        <div>
          <div className="description" dangerouslySetInnerHTML={{ __html: content }} />
          <span className="date">{`${moment(creationDate).fromNow()}  |  `}</span>
          <span className="">Asked By <span dangerouslySetInnerHTML={{ __html: displayName }} /></span>
        </div>
        <ReplyToAstronomerQuestion
          threadId={threadId}
          topicId={topicId}
          objectId={objectId}
          user={user}
        />

      </div>
      <style jsx>{`
        .question-item {
          background-color: ${white};
          margin: 10px;
          padding: 15px;
          box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
        }
        .body {
          display: flex;
          flex-direction: column;
          padding: 15px 0;
        }

        .description {
          font-weight: bold;
          padding: 15px 0;
        }
      `}</style>
    </div>
  )
};

AskAstronomerQuestionListItem.defaultProps = {
  canLikeFlag: false,
  closedFlag: '',
  closedIconURL: '',
  content: '',
  creationDate: '',
  displayName: '',
  forumId: 0,
  forumName: '',
  freshness: '',
  likePrompt: '',
  likesCount: 0,
  modified: '',
  mostRecentAuthor: [],
  objectId: 0,
  replyCount: 0,
  S3Files: [],
  showLikePrompt: false,
  title: '',
  topicId: 0,
  topicName: '',
  user: {},
  voiceCount: 0,
};
AskAstronomerQuestionListItem.propTypes = {
  canLikeFlag: bool,
  closedFlag: string,
  closedIconURL: string,
  content: string,
  creationDate: string,
  displayName: string,
  forumId: number,
  forumName: string,
  freshness: string,
  likePrompt: string,
  likesCount: number,
  modified: string,
  mostRecentAuthor: arrayOf(shape({
    customerId: string,
    firstName: string,
    location: string,
    membershipType: string,
    displayName: string,
    userid: number,
    memberSince: string,
    avatarType: string,
    avatarURL: string,
  })),
  replyCount: number,
  S3Files: arrayOf(string),
  showLikePrompt: bool,
  threadId: number.isRequired,
  title: string,
  topicId: number,
  topicName: string,
  objectId: number,
  user: shape({
    at: string.isRequired,
    token: string.isRequired,
    cid: string.isRequired,
  }),
  voiceCount: number,
};

export default AskAstronomerQuestionListItem;
