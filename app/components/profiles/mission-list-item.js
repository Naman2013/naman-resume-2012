/***********************************
* V4 Profiles Mission List Item
*
*
*
***********************************/
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import moment from 'moment';
import { backgroundImageCover, profilePhotoStyle } from '../../styles/mixins/utilities';
import { likeImage } from '../../services/my-pictures/like-image';

import { black, darkBlueGray, white, turqoise, gray } from '../../styles/variables/colors';
import { secondaryFont } from '../../styles/variables/fonts';

const {
  number,
  string,
} = PropTypes;


const ProfileMissionListItem = ({
  categoryDescription,
  missionIconURL,
  missionStart,
  missionTitle,
  telescopePierName,
}) => {
  const formattedUTCDate = new Date(missionStart * 1000);
  const UTCStartTime = moment.utc(formattedUTCDate).format('dddd, MMMM Do');
  const UTCStartDate = moment.utc(formattedUTCDate).format('HH:mm z');
  const avatarStyle = Object.assign(profilePhotoStyle(missionIconURL), { height: '50px', width: '50px' , backgroundSize: 'cover' });
  return (
    <div className="mission-item">
      <div style={avatarStyle} />
      <div className="object-name" dangerouslySetInnerHTML={{ __html: missionTitle }} />
      <div className="" dangerouslySetInnerHTML={{ __html: categoryDescription }} />
      <div className="section">{UTCStartDate}</div>
      <div className="section">{UTCStartTime}</div>
      <div className="section" dangerouslySetInnerHTML={{ __html: telescopePierName }} />
      <style jsx>{`
        .mission-item {
          background-color: ${white};
          margin: 10px;
          padding: 25px;
          box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
          max-width: 300px;
        }
        .category {
          margin-bottom: 15px;
        }
        .section {
          padding: 10px 0;
          border-top: 1px solid ${gray};
        }
        .object-name {
          margin: 10px 0 0 0;
          text-transform: uppercase;
          font-weight: bold;
        }
        .icon {
          margin-right: 15px;
        }
      `}</style>
    </div>
  )
};

ProfileMissionListItem.defaultProps = {
  categoryDescription: '',
  expires: 0,
  missionIconURL: '',
  missionIndex: 0,
  missionStart: 0,
  missionTitle: '',
  observatoryUniqueId: '',
  scheduledMissionId: 0,
  telescopePierName: '',
  telescopeUniqueId: '',
  userReservationType: '',
};

ProfileMissionListItem.propTypes = {
    categoryDescription: string,
    expires: number,
    missionIconURL: string,
    missionIndex: number,
    missionStart: number,
    missionTitle: string,
    observatoryUniqueId: string,
    scheduledMissionId: number,
    telescopePierName: string,
    telescopeUniqueId: string,
    userReservationType: string,
};
export default ProfileMissionListItem;
