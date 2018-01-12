import React from 'react';
import PropTypes from 'prop-types';
import Mission from './Mission';
import NoUpcomingMission from './NoUpcomingMission';

export const propTypes = {
  fetchingMissions: PropTypes.bool,
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
  fetchingMissions: false,
  missions: [],
};

const UpcomingMissionList = ({ missions, fetchingMissions }) => (
  <div className="upcomingMissions">
    <ul className="missionList">
      { fetchingMissions && <li className="mission"><NoUpcomingMission message="Fetching missions" /></li> }
      { missions.length === 0 && !fetchingMissions && <li className="mission"><NoUpcomingMission message="No missions available" /></li> }
      {
        missions.length > 0 && missions.map(mission => (
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
        margin-bottom: 20px;
      }

      .missionList {
        margin: 0;
        padding: 0;
      }

      .mission {
        list-style-type: none;
      }
    `}</style>
  </div>
);

UpcomingMissionList.defaultProps = defaultProps;
UpcomingMissionList.propTypes = propTypes;

export default UpcomingMissionList;
