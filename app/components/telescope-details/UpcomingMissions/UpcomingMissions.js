import React from 'react';
import SectionHeader from '../../common/headers/SectionHeader';
import UpcomingMissionList, { propTypes as upcomingMissionListProps } from './UpcomingMissionList';

const propTypes = {
  ...upcomingMissionListProps,
};

const UpcomingMissions = ({ missions, fetchingMissions }) => (
  <div className="root">
    <SectionHeader title="Upcoming Missions" />
    <UpcomingMissionList
      missions={missions}
      fetchingMissions={fetchingMissions}
    />

    <style jsx>{`
      .root {
        margin-top: 10px;
      }
    `}</style>
  </div>
);

UpcomingMissions.propTypes = propTypes;

export default UpcomingMissions;
