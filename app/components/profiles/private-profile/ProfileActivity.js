/** *********************************
 * V4 Private Profile Activity
 *
 ********************************** */

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import uniqueId from 'lodash/uniqueId';
import moment from 'moment';

import ProfileActivityQa from 'app/modules/profile/containers/profile-activity-qa';
import { ContainerWithTitle } from '../../common/ContainerWithTitle';
import CenterColumn from '../../common/CenterColumn';
import MissionTile from '../../common/tiles/MissionTile';
import { MissionCard } from '../../../modules/object-details/components/mission-card';
import { ActiveGroups } from './active-groups';
import { ActiveObjects } from './active-objects';
import styles from './ProfileActivity.styles';

const { shape } = PropTypes;

class ProfileActivity extends Component {
  static propTypes = {
    activityData: shape({
      missionsData: shape({}).isRequired,
      recentMissionsData: shape({}).isRequired,
      askAnAstronomerData: shape({}).isRequired,
    }).isRequired,
    data: shape({}).isRequired,
  };

  static defaultProps = {};

  getMissionDate = timestamp => moment.unix(timestamp).format('ddd. MMM. DD');

  getMissionTime = timestamp => moment.unix(timestamp).format('HH:mm');

  render() {
    const { data, activityData } = this.props;
    const {
      missionsData,
      recentMissionsData,
      askAnAstronomerData,
    } = activityData;
    const {
      showTopPicksForYou,
      topPicksForYouHeading,
      activeGroupsCount,
      activeGroupsList,
      activeObjectsCount,
      activeObjectsList,
      topPicksForYouGroupsHeading,
      topPicksForYouObjectsHeading,
      recentMissionListHeading,
      recentMissionList,
      recentMissionCount,
      missionListHeading,
      missionList,
      missionCount,
      emptySetUpcomingMissionsDisplay,
      emptySetRecentMissionsDisplay,
    } = data;
    
    return (
      <div className="profile-activity">
        <div className="profile-section">
          <CenterColumn>
            <ContainerWithTitle title={missionListHeading}>
              {missionCount > 0 ? (
                missionList.map(item => (
                  <MissionCard key={item.scheduledMissionId} timeSlot={item} />
                ))
              ) : (
                <div>{emptySetUpcomingMissionsDisplay}</div>
              )}
            </ContainerWithTitle>
          </CenterColumn>
        </div>

        <div className="profile-section">
          <CenterColumn>
            <ContainerWithTitle title={recentMissionListHeading}>
              {recentMissionCount > 0 ? (
                recentMissionList.map(item => (
                  <MissionCard key={item.scheduledMissionId} timeSlot={item} />
                ))
              ) : (
                <div>{emptySetUpcomingMissionsDisplay}</div>
              )}
            </ContainerWithTitle>
          </CenterColumn>
        </div>

        {askAnAstronomerData.showAskAnAstronomer && (
          <div className="profile-section ask-section">
            <CenterColumn>
              <ProfileActivityQa askAnAstronomerData={askAnAstronomerData} />
            </CenterColumn>
          </div>
        )}

        {showTopPicksForYou && (
          <div className="profile-section">
            <CenterColumn>
              <ContainerWithTitle title={topPicksForYouHeading}>
                <Fragment>
                  <ActiveGroups
                    count={activeGroupsCount}
                    list={activeGroupsList}
                    header={topPicksForYouGroupsHeading}
                  />
                  <ActiveObjects
                    count={activeObjectsCount}
                    list={activeObjectsList}
                    header={topPicksForYouObjectsHeading}
                  />
                </Fragment>
              </ContainerWithTitle>
            </CenterColumn>
          </div>
        )}
        <style jsx>{styles}</style>
      </div>
    );
  }
}

export default ProfileActivity;
