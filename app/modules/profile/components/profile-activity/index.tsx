import React from 'react';
import { ContainerWithTitle } from 'app/components/common/ContainerWithTitle';
import CenterColumn from 'app/components/common/CenterColumn';
import { MissionCard } from 'app/modules/object-details/components/mission-card';
import { MissionConfirmationModal } from 'app/modules/missions/components/mission-confirmation-modal';
import './styles.scss';
import _isEmpty from 'lodash/isEmpty';

type TProfileActivityProps = {
  cancelReservation: (data: any) => Promise<any>;
  cancelPiggyback: (data: any) => Promise<any>;
  getPrivateProfile: (data?: any) => Promise<any>;

  getPrivateProfileMissions: () => Promise<any>;
  getPublicProfileMissions: () => Promise<any>;

  data: any;
  activityData: any;
  privateProfileData: any;
  profileMissionsData: ProfileMissions;
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

  isPrivateProfile = (): boolean => {
    return !_isEmpty(this.props.privateProfileData);
  };

  componentDidMount(): void {
    this.fetchMissions();
  }

  fetchMissions = (): Promise<any> => {
    const { getPublicProfileMissions, getPrivateProfileMissions } = this.props;
    if (this.isPrivateProfile()) {
      return getPrivateProfileMissions();
    }
    return getPublicProfileMissions();
  };

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
    const { profileMissionsData } = this.props;
    const {
      recentMissionListHeading,
      recentMissionList,
      recentMissionCount,
      missionListHeading,
      missionList,
      missionCount,
      emptySetUpcomingMissionsDisplay,
      emptySetRecentMissionsDisplay,
    } = profileMissionsData;

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
      </div>
    );
  }
}

export default ProfileActivity;
