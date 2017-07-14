import React from 'react';
import SectionHeader from '../../common/headers/SectionHeader';
import UpcomingMissionList, { propTypes as upcomingMissionListProps } from './UpcomingMissionList';

const propTypes = {
  ...upcomingMissionListProps,
};

const UpcomingMissions = ({ missions }) => (
  <div className="root">
    <SectionHeader title="Scheduled Missions" />
    <UpcomingMissionList missions={missions} />

    <style jsx>{`
      .root {
        margin-top: 10px;
      }
    `}</style>
  </div>
);

UpcomingMissions.propTypes = propTypes;

export default UpcomingMissions;
