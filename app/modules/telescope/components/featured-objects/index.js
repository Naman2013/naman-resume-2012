import React, { PureComponent, Fragment } from 'react';
import Slider from 'react-slick';
import getDefaultConfig from 'app/components/common/Slider/sliderConfig';
import { FeaturedObjectCard } from '../featured-object-card';
import { sliderResponsiveConfig } from 'app/styles/variables/slider-config';
import { FeaturedObjectsModal } from '../featured-objects-modal';
import { MissionSuccessModal } from 'app/modules/missions/components/mission-success-modal';
import './styles.scss';

function NextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`icon-slider-right ${className}`}
      style={style}
      onClick={onClick}
    />
  );
}

function PrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`icon-slider-left ${className}`}
      style={style}
      onClick={onClick}
    />
  );
}

export class FeaturedObjects extends PureComponent {
  state = {
    reservationModalVisible: false,
    selectedMission: {},
    successModalShow: false,
  };

  reserveCommunityMission = () => {
    const { reserveCommunityMission } = this.props;
    const { selectedMission } = this.state;
    const { scheduledMissionId, missionStart } = selectedMission;

    reserveCommunityMission({
      callSource: 'featuredObjectsV4',
      scheduledMissionId,
      missionStart,
    }).then(() => this.setState({ successModalShow: true }));
  }
  
  reservationModalShow = mission => {
    this.setState({ reservationModalVisible: true, selectedMission: mission });
  }

  reservationModalHide = () => {
    this.setState({ reservationModalVisible: false, selectedMission: {} });
  };

  modalClose = () => {
    const { getFeaturedObjectsByTelescope } = this.props;
    this.setState({ successModalShow: false, reservationModalVisible: false, selectedMission: {} });
    getFeaturedObjectsByTelescope();
  }

  render() {
    const { currentTelescope, featuredObjectsData, user, reservedCommunityMissionData, reservedCommunityMission } = this.props;
    const { reservationModalVisible, selectedMission, successModalShow } = this.state;
    const { teleName } = currentTelescope;
    const { missionCount, missionList, reservedButtonCaption } = featuredObjectsData;
    const defaultSliderConfig = getDefaultConfig();
    return (
      <div className="featured-objects">
        <h3 className="featured-objects-title h3-custom">
          {`Featured objects on ${teleName} `}
          <span>({missionCount})</span>
        </h3>

        <div className="featured-objects-slider">
          <Slider 
            {...defaultSliderConfig}
            {...sliderResponsiveConfig}
            nextArrow={<NextArrow />}
            prevArrow={<PrevArrow />}
          >
            {missionList.map(item => (
              <FeaturedObjectCard
                key={item.scheduledMissionId}
                featureObject={item}
                onOptionClick={() => this.reservationModalShow(item)}
                reservedButtonCaption={reservedButtonCaption}
              />
            ))}
          </Slider>
        </div>

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
