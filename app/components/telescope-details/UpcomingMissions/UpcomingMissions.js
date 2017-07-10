import React from 'react';
import PropTypes from 'prop-types';
import SectionHeader from '../../common/headers/SectionHeader';
import UpcomingMissionList from './UpcomingMissionList';

const UpcomingMissions = () => (
  <div>
    <SectionHeader title="Scheduled Missions" />
    <UpcomingMissionList />
  </div>
);

export default UpcomingMissions;
