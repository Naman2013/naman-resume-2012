import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { GET_UPCOMING_MISSIONS_URL } from '../../../services/upcoming-missions/upcoming-missions';
import ExpireService from '../../common/expiring-components/expire-service';
import SectionHeader from '../../common/headers/SectionHeader';
import UpcomingMissionList from './UpcomingMissionList';

class UpcomingMissions extends Component {
  static propTypes = Object.assign({
    obsId: PropTypes.string.isRequired,
    domeId: PropTypes.string.isRequired,
  });

  render() {
    return (
      <ExpireService
        serviceURL={GET_UPCOMING_MISSIONS_URL}
        requestBody={{ obsId: this.props.obsId, domeId: this.props.domeId }}
        render={({
          serviceResponse: {
            upcomingMissionArray,
            showStatusMessage,
            statusMessage,
          }, fetchingContent }) => (
            <div className="root">
              <SectionHeader title="Upcoming Missions" />
              <UpcomingMissionList
                missions={upcomingMissionArray}
                fetchingMissions={fetchingContent}
                showStatusMessage={showStatusMessage}
                statusMessage={statusMessage}
              />
              <style jsx>{`
                .root {
                  margin-top: 10px;
                }
              `}</style>
            </div>
        )}
      />
    );
  }
}

export default UpcomingMissions;
