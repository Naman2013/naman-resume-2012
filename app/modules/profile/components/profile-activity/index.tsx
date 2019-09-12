import React from 'react';
import ProfileActivityQa from 'app/modules/profile/containers/profile-activity-qa';
import { ContainerWithTitle } from 'app/components/common/ContainerWithTitle';
import CenterColumn from 'app/components/common/CenterColumn';
import { MissionCard } from 'app/modules/object-details/components/mission-card';
import { ActiveGroups } from 'app/components/profiles/private-profile/active-groups';
import { ActiveObjects } from 'app/components/profiles/private-profile//active-objects';
import { MissionConfirmationModal } from 'app/modules/missions/components/mission-confirmation-modal';
import './styles.scss';

type TProfileActivityProps = {
  cancelReservation: (data: any) => Promise<any>;
  cancelPiggyback: (data: any) => Promise<any>;
  getPrivateProfile: (data?: any) => Promise<any>;

  data: any;
  activityData: any;
};
type TProfileActivityState = {
  cancelReservationModalVisible: boolean;
  cancelPiggybackModalVisible: boolean;
  selectedSlot: {
    scheduledMissionId?: number;
    cancelMissionDialogPrompt?: string;
    cancelPiggybackDialogPrompt?: string;
  };
};

class ProfileActivity extends React.Component<
  TProfileActivityProps,
  TProfileActivityState
> {
  state: TProfileActivityState = {
    cancelReservationModalVisible: false,
    cancelPiggybackModalVisible: false,
    selectedSlot: {},
  };

  componentDidMount(): void {
    console.log('didMount');
  }

  cancelReservation = () => {
    const { cancelReservation, getPrivateProfile } = this.props;
    const { selectedSlot } = this.state;

    cancelReservation({
      scheduledMissionId: selectedSlot.scheduledMissionId,
    }).then(() => {
      this.setState({ cancelReservationModalVisible: false });
      getPrivateProfile();
    });
  };

  cancelPiggyback = () => {
    const { cancelPiggyback, getPrivateProfile } = this.props;
    const { selectedSlot } = this.state;
    const { scheduledMissionId } = selectedSlot;

    cancelPiggyback({ scheduledMissionId }).then(() => {
      this.setState({ cancelPiggybackModalVisible: false });
      getPrivateProfile();
    });
  };

  render() {
    const { data, activityData } = this.props;
    const { askAnAstronomerData } = activityData;
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
                missionList.map((item: any) => (
                  <MissionCard
                    key={item.scheduledMissionId}
                    timeSlot={item}
                    cancelReservation={(selectedSlot: any) =>
                      this.setState({
                        cancelReservationModalVisible: true,
                        selectedSlot,
                      })
                    }
                    cancelPiggyback={(selectedSlot: any) =>
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
                recentMissionList.map((item: any) => (
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
                <>
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
                </>
              </ContainerWithTitle>
            </CenterColumn>
          </div>
        )}
      </div>
    );
  }
}

export default ProfileActivity;
