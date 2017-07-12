import React from 'react';
import PropTypes from 'prop-types';
import Mission from './Mission';
import NoUpcomingMission from './NoUpcomingMission';

const propTypes = {
  missions: PropTypes.arrayOf(PropTypes.shape({
    upcomingMissionIndex: PropTypes.number,
    upcomingMissionAvailable: PropTypes.bool,
    upcomingScheduledMissionId: PropTypes.number,
    upcomingStart: PropTypes.number,
    upcomingTitle: PropTypes.string,
    upcomingObjectIconURL: PropTypes.string,
  })),
};

const defaultProps = {
  missions: [],
};

const UpcomingMissionList = ({ missions }) => (
  <div className="upcomingMissions">
    <ul className="missionList">
      {
        missions.map(mission => (
          <li className="mission" key={`${mission.upcomingStart}-${mission.upcomingMissionIndex}`}>
            <Mission
              upcomingStart={mission.upcomingStart}
              upcomingTitle={mission.upcomingTitle}
              upcomingObjectIconURL={mission.upcomingObjectIconURL}
            />
          </li>
        ))
      }
    </ul>

    <style jsx>{`
      .upcomingMissions {
        background-color: rgba(137, 137, 137, .5);
        height: 20px;
      }

      .missionList {
        margin: 0;
      }
    `}</style>
  </div>
);

UpcomingMissionList.defaultProps = defaultProps;
UpcomingMissionList.propTypes = propTypes;

export default UpcomingMissionList;
