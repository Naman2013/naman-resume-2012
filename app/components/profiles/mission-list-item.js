import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import moment from 'moment';
import { backgroundImageCover, profilePhotoStyle } from '../../styles/mixins/utilities';
import { likeImage } from '../../services/my-pictures/like-image';

import { black, darkBlueGray, white, turqoise } from '../../styles/variables/colors';
import { secondaryFont } from '../../styles/variables/fonts';

const {
  number,
  string,
} = PropTypes;


const ProfileMissionListItem = ({
  categoryDescription,
  expires,
  missionIconURL,
  missionIndex,
  missionStart,
  missionTitle,
  observatoryUniqueId,
  scheduledMissionId,
  telescopePierName,
  telescopeUniqueId,
  userReservationType,
}) => {
  const formattedUTCDate = new Date(missionStart * 1000);
  const UTCStartTime = moment.utc(formattedUTCDate).format('dddd, MMMM Do');
  const UTCStartDate = moment.utc(formattedUTCDate).format('HH:mm z');

  return (
    <div className="observation-item">
      <div style={profilePhotoStyle(missionIconURL)} />
      <div className="category" dangerouslySetInnerHTML={{ __html: categoryDescription }} />
      <div><span className="fa fa-calendar" />{UTCStartDate}</div>
      <div><span className="fa fa-clock" />{UTCStartTime}</div>
      <div className="category" dangerouslySetInnerHTML={{ __html: telescopePierName }} />
      <style jsx>{`

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
