/***********************************
* V4 Private Profile Observation Item
*
*
*
***********************************/

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { backgroundImageCover } from '../../../styles/mixins/utilities';
import { likeImage } from '../../../services/my-pictures/like-image';

import { black, darkBlueGray, white, turqoise } from '../../../styles/variables/colors';
import { secondaryFont } from '../../../styles/variables/fonts';

const {
  arrayOf,
  bool,
  func,
  number,
  shape,
  string,
} = PropTypes;

const MyObservationItem = ({
  canEditFlag,
  canLikeFlag,
  commentsCount,
  commentsForumId,
  commentsThreadId,
  commentsTopicId,
  customerImageId,
  imageTitle,
  imageURL,
  likePrompt,
  likesCount,
  observationLog,
  observationTimeDisplay,
  shareToken,
  showCommentsLink,
  showLikePrompt,
}) => {

  const observationTime = observationTimeDisplay.join('  |  ');
  return (
    <div className="observation-item" key={customerImageId}>
      <div className="title" dangerouslySetInnerHTML={{ __html: imageTitle }} />
      <div className="time" dangerouslySetInnerHTML={{ __html: observationTime }} />
      <div className="body">
        <Link to={`/my-pictures/show-image/${customerImageId}/${shareToken}`}>
          <div style={{ backgroundImage: `url(${imageURL})` }} className="shared-image" />
        </Link>
        <div className="info-panel">
          <div className="description" dangerouslySetInnerHTML={{ __html: observationLog }} />
          <div className="actions">
            <div>Likes ({likesCount})</div>
            {showCommentsLink && <Link
              to={`/discussions/forums/${commentsForumId}/topics/${commentsTopicId}/threads/${commentsThreadId}`}>
                <span>{`Comments (${commentsCount})`}</span>
              </Link>}
            {canEditFlag && <Link to={`/my-pictures/show-image/${customerImageId}/${shareToken}`}>
              <div className=""><span className="fa fa-pencil"/> Edit</div>
            </Link>}
          </div>
        </div>
      </div>
      <style jsx>{`

        .observation-item {
          background-color: ${white};
          margin: 10px;
          padding: 15px;
          box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
        }

        .actions {
          position: absolute;
          bottom: 0;
        }
        .info-panel {
          position: relative;
          padding-left: 25px;
        }
        .body {
          display: flex;
          flex-direction: row;
          padding: 15px 0;
        }
        .shared-image {
          display: inline-block;
          ${backgroundImageCover}
          height: 100px;
          width: 100px;
        }
      `}</style>
    </div>
  )
};

MyObservationItem.defaultProps = {
  avatarURL: '',
  canDownloadFlag: false,
  canEditFlag: false,
  canLikeFlag: false,
  commentsCount: 0,
  commentsForumId: 0,
  commentsThreadId: 0,
  commentsTopicId: 0,
  customerImageId: 0,
  imageTitle: '',
  imageURL: '',
  likePrompt: '',
  likesCount: 0,
  observationLog: '',
  observationTimeDisplay: [],
  shareToken: '',
  showCommentsLink: false,
  showLikePrompt: false,
};
MyObservationItem.propTypes = {
  canDownloadFlag: bool,
  canEditFlag: bool,
  canLikeFlag: bool,
  commentsCount: number,
  commentsForumId: number,
  commentsThreadId: number,
  commentsTopicId: number,
  customerImageId: number,
  imageTitle: string,
  imageURL: string,
  likePrompt: string,
  likesCount: number,
  observationLog: string,
  observationTimeDisplay: arrayOf(string),
  shareToken: string,
  showCommentsLink: bool,
  showLikePrompt: bool,
};

export default MyObservationItem;
