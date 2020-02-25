import React from 'react';
import { ContainerWithTitle } from 'app/components/common/ContainerWithTitle';
import CenterColumn from 'app/components/common/CenterColumn';
import { MissionCard } from 'app/modules/object-details/components/mission-card';
import { MissionConfirmationModal } from 'app/modules/missions/components/mission-confirmation-modal';
import { FeaturedObjectsModal } from 'app/modules/telescope/components/featured-objects-modal';
import { MissionSuccessModal } from 'app/modules/missions/components/mission-success-modal';
import './styles.scss';

type TProfileActivityProps = {
  cancelReservation: (data: any) => Promise<any>;
  cancelPiggyback: (data: any) => Promise<any>;
  grabPiggyback: (data: any) => Promise<any>;
  reservePiggyback: (data: any) => Promise<any>;
  getPrivateProfile: (data?: any) => Promise<any>;

  getPrivateProfileMissions: () => Promise<any>;
  getPublicProfileMissions: (data?: any) => Promise<any>;

  privateProfileData: any;
  profileMissionsData: ProfileMissions;
  params: any;
  piggyBackMissionSlot: any;
  piggybackReservedMissionData: any;
  piggybackReservedMission: any;
  user: User;
};
type TProfileActivityState = {
  cancelReservationModalVisible: boolean;
  cancelPiggybackModalVisible: boolean;
  reservationPiggybackVisible: boolean;
  successModalShow: boolean;
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
    reservationPiggybackVisible: false,
    successModalShow: false,
    selectedSlot: {},
  };

  missionTimer: ReturnType<typeof setTimeout> = null;

  componentDidMount(): void {
    this.fetchMissions().then(() => this.setupRefreshMissionsInterval());
  }

  componentWillUnmount(): void {
    clearInterval(this.missionTimer);
  }

  fetchMissions = (): Promise<any> => {
    const {
      getPublicProfileMissions,
      getPrivateProfileMissions,
      params,
    } = this.props;
    const { customerUUID } = params;

    if (params.private) {
      return getPrivateProfileMissions();
    }
    return getPublicProfileMissions({ customerUUID });
  };

  setupRefreshMissionsInterval = (): void => {
    const { profileMissionsData } = this.props;
    const expiresInSec = profileMissionsData.expires;
    const currentTimestampInMs = Date.now();
    const timerVal = expiresInSec * 1000 - currentTimestampInMs;
    if (timerVal) {
      this.missionTimer = setInterval(this.fetchMissions, timerVal);
    }
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

  grabPiggyback = (mission: any) => {
    const { grabPiggyback } = this.props;
    const { scheduledMissionId, uniqueId } = mission;
    grabPiggyback({
      callSource: 'byTelescopeV4',
      scheduledMissionId,
      uniqueId,
    }).then(() => this.setState({ reservationPiggybackVisible: true }));
  };

  reservePiggyback = (): void => {
    const { reservePiggyback, piggyBackMissionSlot } = this.props;
    const {
      scheduledMissionId,
      uniqueId,
      title,
      objectIconURL,
      missionStart,
      missionType,
      obsName,
      telescopeName,
    } = piggyBackMissionSlot;

    reservePiggyback({
      callSource: 'byTelescopeV4',
      scheduledMissionId,
      uniqueId,
      title,
      objectIconURL,
      missionStart,
      missionType,
      obsName,
      telescopeName,
    }).then(() =>
      this.setState({
        successModalShow: true,
        reservationPiggybackVisible: false,
      })
    );
  };

  successModalHide = (): void => {
    clearInterval(this.missionTimer);
    this.fetchMissions().then(() => this.setupRefreshMissionsInterval());
    this.setState({ successModalShow: false });
  };

  render() {
    const {
      profileMissionsData,
      piggyBackMissionSlot,
      piggybackReservedMissionData,
      piggybackReservedMission,
      user,
    } = this.props;
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
      reservationPiggybackVisible,
      successModalShow,
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
                    grabPiggyback={this.grabPiggyback}
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

        {reservationPiggybackVisible && (
          <FeaturedObjectsModal
            onHide={() => this.setState({ reservationPiggybackVisible: false })}
            selectedMission={piggyBackMissionSlot}
            user={user}
            onMissionView={this.reservePiggyback}
            piggyback
            show
          />
        )}

        <MissionSuccessModal
          show={successModalShow}
          onHide={this.successModalHide}
          reservedMissionData={piggybackReservedMissionData}
          reservedMission={piggybackReservedMission}
          missionSlot={piggyBackMissionSlot}
        />
      </div>
    );
  }
}

export default ProfileActivity;
