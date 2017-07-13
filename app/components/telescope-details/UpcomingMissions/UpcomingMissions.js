import React from 'react';
import SectionHeader from '../../common/headers/SectionHeader';
import UpcomingMissionList, { propTypes as upcomingMissionListProps } from './UpcomingMissionList';

const propTypes = {
  ...upcomingMissionListProps,
};

const UpcomingMissions = ({ missions }) => (
  <div>
    <SectionHeader title="Scheduled Missions" />
    <UpcomingMissionList missions={missions} />
  </div>
);

UpcomingMissions.propTypes = propTypes;

export default UpcomingMissions;
