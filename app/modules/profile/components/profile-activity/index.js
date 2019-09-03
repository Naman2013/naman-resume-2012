/** *********************************
 * V4 Private Profile Activity
 *
 ********************************** */

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import uniqueId from 'lodash/uniqueId';
import moment from 'moment';

import ProfileActivityQa from 'app/modules/profile/containers/profile-activity-qa';
import { ContainerWithTitle } from 'app/components/common/ContainerWithTitle';
import CenterColumn from 'app/components/common/CenterColumn';
import MissionTile from 'app/components/common/tiles/MissionTile';
import { MissionCard } from 'app/modules/object-details/components/mission-card';
import { ActiveGroups } from 'app/components/profiles/private-profile/active-groups';
import { ActiveObjects } from 'app/components/profiles/private-profile//active-objects';
import { MissionConfirmationModal } from 'app/modules/missions/components/mission-confirmation-modal';
import './styles.scss';

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

  state = {
    cancelReservationModalVisible: false,
    cancelPiggybackModalVisible: false,
    selectedSlot: {},
  };

  cancelReservation = timeSlot => {
    const { cancelReservation, getPrivateProfile } = this.props;
    const { selectedSlot } = this.state;
    const { scheduledMissionId } = selectedSlot;

    cancelReservation({ scheduledMissionId }).then(() => {
      this.setState({ cancelReservationModalVisible: false });
      getPrivateProfile();
    });
  };

  cancelPiggyback = timeSlot => {
    const { cancelPiggyback, getPrivateProfile } = this.props;
    const { selectedSlot } = this.state;
    const { scheduledMissionId } = selectedSlot;

    cancelPiggyback({ scheduledMissionId }).then(() => {
      this.setState({ cancelPiggybackModalVisible: false });
      getPrivateProfile();
    });
  };

  render() {
    const {
      data,
      activityData,
      cancelReservation,
      cancelPiggyback,
    } = this.props;
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

    const {
      cancelReservationModalVisible,
      cancelPiggybackModalVisible,
      selectedSlot,
    } = this.state;
    const {
      cancelMissionDialogPrompt,
      cancelPiggybackDialogPrompt,
    } = selectedSlot;

    return (
      <div className="profile-activity">
        <MissionConfirmationModal
          onConfirm={this.cancelReservation}
          onHide={() => this.setState({ cancelReservationModalVisible: false })}
          show={cancelReservationModalVisible}
          confirmationPrompt={cancelMissionDialogPrompt}
        />

        <MissionConfirmationModal
          onConfirm={this.cancelPiggyback}
          onHide={() => this.setState({ cancelPiggybackModalVisible: false })}
          show={cancelPiggybackModalVisible}
          confirmationPrompt={cancelPiggybackDialogPrompt}
        />

        <div className="profile-section">
          <CenterColumn>
            <ContainerWithTitle title={missionListHeading}>
              {missionCount > 0 ? (
                missionList.map(item => (
                  <MissionCard
                    key={item.scheduledMissionId}
                    timeSlot={item}
                    cancelReservation={selectedSlot =>
                      this.setState({
                        cancelReservationModalVisible: true,
                        selectedSlot,
                      })
                    }
                    cancelPiggyback={selectedSlot =>
                      this.setState({
                        cancelPiggybackModalVisible: true,
                        selectedSlot,
                      })
                    }
                    profileMission
                  />
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
                  <MissionCard
                    key={item.scheduledMissionId}
                    timeSlot={item}
                    profileMission
                  />
                ))
              ) : (
                <div>{emptySetRecentMissionsDisplay}</div>
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
      </div>
    );
  }
}

export default ProfileActivity;
