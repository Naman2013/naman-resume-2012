/** *********************************
 * V4 Private Profile Activity
 *
 ********************************** */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import uniqueId from 'lodash/uniqueId';
import moment from 'moment';

import { ContainerWithTitle } from '../../common/ContainerWithTitle';
import CenterColumn from '../../common/CenterColumn';
import MissionTile from '../../common/tiles/MissionTile';
import { ProfileActivityQa } from '../../../containers/profile/PrivateProfile';
import styles from './ProfileActivity.styles';

const { shape } = PropTypes;

class ProfileActivity extends Component {
  static defaultProps = {};

  static propTypes = {
    activityData: shape({
      missionsData: shape({}).isRequired,
      recentMissionsData: shape({}).isRequired,
      askAnAstronomerData: shape({}).isRequired,
    }).isRequired,
  };

  getMissionDate = timestamp => moment.unix(timestamp).format('ddd. MMM. DD');

  getMissionTime = timestamp => moment.unix(timestamp).format('HH:mm');

  render() {
    const { missionsData, recentMissionsData, askAnAstronomerData } = this.props.activityData;

    return (
      <div className="profile-activity">
        {missionsData.missionCount > 0 && (
          <div className="profile-section">
            <CenterColumn>
              <ContainerWithTitle title={missionsData.missionListHeading}>
                {missionsData.missionsList.map(item => (
                  <MissionTile
                    key={`upcomming_mission_${uniqueId()}`}
                    title={item.missionTitle}
                    telescope={item.telescopePierName}
                    date={this.getMissionDate(item.missionStart)}
                    time={this.getMissionTime(item.missionStart)}
                    timezone={item.missionStartTZ}
                  />
                ))}
              </ContainerWithTitle>
            </CenterColumn>
          </div>
        )}

        {recentMissionsData.recentMissionCount > 0 && (
          <div className="profile-section">
            <CenterColumn>
              <ContainerWithTitle
                title={recentMissionsData.recentMissionListHeading || 'Recent Missions'}
              >
                {recentMissionsData.recentMissionList.map(item => (
                  <MissionTile
                    key={`recent_mission_${uniqueId()}`}
                    title={item.missionTitle}
                    telescope={item.telescopePierName}
                    date={this.getMissionDate(item.missionStart)}
                    time={this.getMissionTime(item.missionStart)}
                  />
                ))}
              </ContainerWithTitle>
            </CenterColumn>
          </div>
        )}

        {askAnAstronomerData.showAskAnAstronomer && (
          <div className="profile-section">
            <CenterColumn>
              <ProfileActivityQa askAnAstronomerData={askAnAstronomerData} />
            </CenterColumn>
          </div>
        )}
        <style jsx>{styles}</style>
      </div>
    );
  }
}

export default ProfileActivity;
