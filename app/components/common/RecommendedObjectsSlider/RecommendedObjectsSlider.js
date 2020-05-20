/***********************************
 * V4 Recommended Objects Slider
 *
 *
 *
 ***********************************/
import React, { Component } from 'react';
import take from 'lodash/take';
import { FeaturedObjectCard } from 'app/modules/telescope/components/featured-object-card';
import { FeaturedObjectsModal } from 'app/modules/telescope/components/featured-objects-modal';
import { MissionSuccessModal } from 'app/modules/missions/components/mission-success-modal';
import {
  setupFeaturedObjectsExpireTimer,
  stopFeaturedObjectsExpireTimer,
} from 'app/services/dashboard/timer';
import { withTranslation } from 'react-i18next';
import SloohSlider from '../Slider';
import DisplayAtBreakpoint from '../DisplayAtBreakpoint';
import { getSliderProps } from './recommendedObjectsSliderConfiguration';
import './styles.scss';

@withTranslation()
export class RecommendedObjects extends Component {
  state = {
    reservationModalVisible: false,
    selectedMission: {},
    successModalShow: false,
  };

  getDashboardFeaturedObjects = () => {
    const { getDashboardFeaturedObjects } = this.props;
    stopFeaturedObjectsExpireTimer();
    getDashboardFeaturedObjects('').then(({ payload }) => {
      const timerTime = payload.expires - payload.timestamp;
      setupFeaturedObjectsExpireTimer(timerTime, () =>
        this.getDashboardFeaturedObjects()
      );
    });
  };

  reserveCommunityMission = () => {
    const { reserveCommunityMission, callSource } = this.props;
    const { selectedMission } = this.state;
    const { scheduledMissionId, missionStart } = selectedMission;

    reserveCommunityMission({
      callSource,
      scheduledMissionId,
      missionStart,
    }).then(() =>
      this.setState({ successModalShow: true, reservationModalVisible: false })
    );
  };

  reservationModalShow = mission => {
    this.setState({ reservationModalVisible: true, selectedMission: mission });
  };

  reservationModalHide = () => {
    this.setState({ reservationModalVisible: false, selectedMission: {} });
  };

  modalClose = () => {
    this.setState({
      successModalShow: false,
      selectedMission: {},
    });
    this.getDashboardFeaturedObjects();
  };

  render() {
    const {
      missionList,
      user,
      reservedCommunityMissionData,
      reservedCommunityMission,
      reservedButtonCaption,
      optionsButtonCaption,
      t,
      readOnly,
    } = this.props;
    const {
      reservationModalVisible,
      selectedMission,
      successModalShow,
    } = this.state;
    const sliderProps = getSliderProps(
      missionList,
      this.reservationModalShow,
      reservedButtonCaption,
      optionsButtonCaption,
      t,
      readOnly
    );
    const shortList = take(missionList, 3) || [];
    return (
      <div className="dashboard-recomended-objects">
        <DisplayAtBreakpoint screenMedium screenLarge screenXLarge>
          <SloohSlider {...sliderProps} />
        </DisplayAtBreakpoint>
        <DisplayAtBreakpoint screenSmall>
          <div className="mobile-tiles-wrapper">
            {shortList.map(object => (
              <FeaturedObjectCard
                key={object.scheduledMissionId}
                featureObject={object}
                onOptionClick={() => this.reservationModalShow(object)}
                reservedButtonCaption={reservedButtonCaption}
                optionsButtonCaption={optionsButtonCaption}
                readOnly={readOnly}
              />
            ))}
          </div>
        </DisplayAtBreakpoint>
        <style jsx>{`
          .dashboard-recomended-objects {
            margin: 0 auto;
            max-width: 644px;
          }
          @media only screen and (min-width: 1200px) {
            .dashboard-recomended-objects {
              max-width: 965px;
            }
          }
        `}</style>

        {reservationModalVisible && (
          <FeaturedObjectsModal
            onHide={this.reservationModalHide}
            onComplete={this.reserveCommunityMission}
            selectedMission={selectedMission}
            user={user}
            onMissionView={this.reserveCommunityMission}
            show
          />
        )}

        <MissionSuccessModal
          show={successModalShow}
          onHide={this.modalClose}
          reservedMissionData={selectedMission}
          reservedMission={reservedCommunityMissionData}
          missionSlot={reservedCommunityMission}
        />
      </div>
    );
  }
}
