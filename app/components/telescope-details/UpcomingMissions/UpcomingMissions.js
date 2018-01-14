import React, { Component } from 'react';
import SectionHeader from '../../common/headers/SectionHeader';
import UpcomingMissionList, { propTypes as upcomingMissionListProps } from './UpcomingMissionList';

class UpcomingMissions extends Component {
  static propTypes = Object.assign({}, upcomingMissionListProps);

  render() {
    return (
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
  }
}

export default UpcomingMissions;
