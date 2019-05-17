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
import SloohSlider from '../Slider';
import DisplayAtBreakpoint from '../DisplayAtBreakpoint';
import { getSliderProps } from './recommendedObjectsSliderConfiguration';
import './styles.scss';

export class RecommendedObjects extends Component {
  state = {
    reservationModalVisible: false,
    selectedMission: {},
    successModalShow: false,
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
    const { getDashboardFeaturedObjects } = this.props;
    this.setState({
      successModalShow: false,
      selectedMission: {},
    });
    getDashboardFeaturedObjects();
  };

  render() {
    const {
      missionList,
      user,
      reservedCommunityMissionData,
      reservedCommunityMission,
    } = this.props;
    const {
      reservationModalVisible,
      selectedMission,
      successModalShow,
    } = this.state;
    const sliderProps = getSliderProps(missionList, this.reservationModalShow);
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
