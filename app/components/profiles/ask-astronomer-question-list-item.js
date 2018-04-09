import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Link } from 'react-router';
import { backgroundImageCover } from '../../styles/mixins/utilities';

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
  replyCount,
  S3Files,
  showLikePrompt,
  threadId,
  title,
  topicId,
  topicName,
  voiceCount,
}) => {
  return (
    <div className="observation-item" key={threadId}>
      <div className="title" dangerouslySetInnerHTML={{ __html: topicName }} />
      <button>Not my specialty x</button>
      <div className="body">
        <div>
          <div className="description" dangerouslySetInnerHTML={{ __html: content }} />
          <span className="date">{moment(creationDate).fromNow()}</span>
          <span className="">Asked By <span dangerouslySetInnerHTML={{ __html: displayName }} /></span>
        </div>
        <button>Answer Now</button>
      </div>
      <style jsx>{`

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
  replyCount: 0,
  S3Files: [],
  showLikePrompt: false,
  title: '',
  topicId: 0,
  topicName: '',
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
  voiceCount: number,
};

export default AskAstronomerQuestionListItem;
