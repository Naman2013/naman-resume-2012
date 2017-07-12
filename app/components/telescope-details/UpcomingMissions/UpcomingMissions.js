import React from 'react';
import SectionHeader from '../../common/headers/SectionHeader';
import UpcomingMissionList from './UpcomingMissionList';

const UpcomingMissions = () => (
  <div>
    <SectionHeader title="Scheduled Missions" />
    <UpcomingMissionList />
  </div>
);

export default UpcomingMissions;
