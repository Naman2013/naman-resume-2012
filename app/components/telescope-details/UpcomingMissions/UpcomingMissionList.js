import React from 'react';
import PropTypes from 'prop-types';
import Mission from './Mission';

/**
"nextMissionAvailable" : true,
"nextScheduledMissionId" : 1621823,
"nextStart" : 1499569800,
"nextTitle" : Pending: Target name is not yet available,
"nextObjectIconURL" : https:\/\/vega.slooh.com\/icons\/reservations\/not_available_w.svg,
"upcomingMissionCount" : 3,
"upcomingMissionArray" : -[
-{
"upcomingMissionIndex" : 0,
"upcomingMissionAvailable" : true,
"upcomingScheduledMissionId" : 1621823,
"upcomingStart" : 1499569800,
"upcomingTitle" : Pending: Target name is not yet available,
"upcomingObjectIconURL" : https:\/\/vega.slooh.com\/icons\/reservations\/not_available_w.svg
},
-{
"upcomingMissionIndex" : 1,
"upcomingMissionAvailable" : true,
"upcomingScheduledMissionId" : 1621824,
"upcomingStart" : 1499570100,
"upcomingTitle" : Pending: Target name is not yet available,
"upcomingObjectIconURL" : https:\/\/vega.slooh.com\/icons\/reservations\/not_available_w.svg
},
-{
"upcomingMissionIndex" : 2,
"upcomingMissionAvailable" : true,
"upcomingScheduledMissionId" : 1621825,
"upcomingStart" : 1499570400,
"upcomingTitle" : Pending: Target name is not yet available,
"upcomingObjectIconURL" : https:\/\/vega.slooh.com\/icons\/reservations\/not_available_w.svg
}
]
*/

const propTypes = {
  missions: PropTypes.arrayOf({
    upcomingMissionIndex: PropTypes.number,
    upcomingMissionAvailable: PropTypes.bool,
    upcomingScheduledMissionId: PropTypes.number,
    upcomingStart: PropTypes.number,
    upcomingTitle: PropTypes.string,
    upcomingObjectIconURL: PropTypes.string,
  }),
};

const defaultProps = {
  missions: [],
};

const UpcomingMissionList = ({ missions }) => (
  <div>
    <ul>
      <li className="mission">
        <Mission />
      </li>
      <li className="mission">
        <Mission />
      </li>
      <li className="mission">
        <Mission />
      </li>
    </ul>
  </div>
);

UpcomingMissionList.defaultProps = defaultProps;
UpcomingMissionList.propTypes = propTypes;

export default UpcomingMissionList;
