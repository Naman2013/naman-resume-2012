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
  // avatarURL,
  // canDownloadFlag,
  // canEditFlag,
  canLikeFlag,
  // canShareFlag,
  customerImageId,
  // fileData,
  imageTitle,
  imageURL,
  likePrompt,
  likesCount,
  // linkableFileData,
  observationLog,
  // originX,
  // originY,
  // photoViewFullURL,
  // scheduledMissionId,
  shareToken,
  showLikePrompt,
  // socialShareDescription,
  // zoom,
}) => {
  return (
    <div className="observation-item" key={customerImageId}>
      <div className="title" dangerouslySetInnerHTML={{ __html: imageTitle }} />
      <div className="body">
        <Link to={`/my-pictures/show-image/${customerImageId}/${shareToken}`}>
          <div style={{ backgroundImage: `url(${imageURL})` }} className="shared-image" />
        </Link>
        <div>
          <div className="description" dangerouslySetInnerHTML={{ __html: observationLog }} />
          <div>Likes ({likesCount})</div>
        </div>
      </div>
      <style jsx>{`
        .body {
          display: flex;
          flex-direction: row;
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
  canShareFlag: false,
  customerImageId: 0,
  fileData: {
    'Photo by': '',
    'Scheduled by': '',
    'Observation date': '',
    'Observation time': '',
    Observatory: '',
  },
  imageTitle: '',
  imageURL: '',
  likePrompt: '',
  likesCount: 0,
  linkableFileData: {
    'Photo by': {},
    Telescope: {},
    Observatory: {},
    'Observation time': {
      text: '',
    },
  },
  observationLog: '',
  originX: '',
  originY: '',
  photoViewFullURL: '',
  scheduledMissionId: '',
  shareToken: '',
  showLikePrompt: false,
  socialShareDescription: '',
  zoom: '',
};
MyObservationItem.propTypes = {
  avatarURL: string,
  canDownloadFlag: bool,
  canEditFlag: bool,
  canLikeFlag: bool,
  canShareFlag: bool,
  customerImageId: number,
  fileData: shape({
    'Photo by': string,
    'Scheduled by': string,
    'Observation date': string,
    'Observation time': string,
    Observatory: string,
  }),
  imageTitle: string,
  imageURL: string,
  likePrompt: string,
  likesCount: number,
  linkableFileData: shape({
    'Photo by': PropTypes.shape({}),
    Observatory: PropTypes.shape({}),
    Telescope: PropTypes.shape({}),
    'Observation time': PropTypes.shape({
      text: PropTypes.string,
    }),
  }),
  observationLog: string,
  originX: string,
  originY: string,
  photoViewFullURL: string,
  scheduledMissionId: string,
  shareToken: string,
  showLikePrompt: bool,
  socialShareDescription: string,
  zoom: string,
};

export default MyObservationItem;
