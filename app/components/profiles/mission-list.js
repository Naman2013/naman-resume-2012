import React from 'react';
import PropTypes from 'prop-types';
import ProfileMissionListItem from './mission-list-item';

const {
  arrayOf,
  bool,
  func,
  number,
  shape,
  string,
} = PropTypes;

const ProfileMissionList = ({
  missionList,
}) =>
  (<div className="mission-list">
    {missionList.length === 0 && <div>There are no upcoming missions.</div>}
    <div className="mission-list-items">
      {missionList.map(missionDetail =>
        (<ProfileMissionListItem
          {...missionDetail}
          key={missionDetail.missionIndex}
        />))}
    </div>
    <style jsx>
      {`
        .mission-list-items {
          display: flex;
          flex-direction: row;
        }
      `}
    </style>
    </div>)

ProfileMissionList.defaultProps = {
  missionList: [],
};

ProfileMissionList.propTypes = {
  missionList: arrayOf(shape({
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
  })),
};

export default ProfileMissionList;
