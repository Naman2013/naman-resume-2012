/** *********************************
 * V4 Object Details : Upcoming Missions
 *   Markdown support on elements????
 *   UTF-8 support....
 *   Multi-National Languages.....
 ********************************** */

import React, { Component, Fragment } from 'react';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { Button } from 'react-bootstrap';
import {
  setupCommunityMissionExpireTimer,
  stopCommunityMissionExpireTimer,
} from 'app/services/objects/timer';
import { Spinner } from 'app/components/spinner/index';
import { FeaturedObjectsModal } from 'app/modules/telescope/components/featured-objects-modal';
import { MissionSuccessModal } from 'app/modules/missions/components/mission-success-modal';
import MissionTile from 'app/components/common/tiles/MissionTile';
import { getCommunityMissions } from '../../modules/object-details/actions';
import {
  makeObjectDetailsMissionsSelector,
  makeObjectDetailsDataSelector,
  makeObjectDetailsFetchingSelector,
  makeObjectDataSelector
} from '../../modules/object-details/selectors';
import {
  makeQueueTabReservedCommunityMissionDataSelector,
  makeQueueTabReservedCommunityMissionSelector,
} from '../../modules/telescope/selectors';
import { reserveCommunityMission } from '../../modules/telescope/thunks';
import { makeUserSelector } from '../../modules/user/selectors';
import { MissionCard } from '../../modules/object-details/components/mission-card';
import DeviceProvider from '../../providers/DeviceProvider';
import ObjectDetailsSectionTitle from '../../components/object-details/ObjectDetailsSectionTitle';
import CenterColumn from '../../components/common/CenterColumn';
import './ObjectDetailsMissions.scss';
import Button1 from 'app/components/common/style/buttons/Button';
import { customModalStylesBlackOverlay } from 'app/styles/mixins/utilities';
import Popup from 'react-modal';
import { AccountDetailsHeader } from 'app/modules/account-settings/components/account-details/header';
import ObjectVisibilityProfileNew from 'app/components/object-details/ObjectVisibilityProfile/ObjectVisibilityProfileNew';


const mapStateToProps = createStructuredSelector({
  missionData: makeObjectDetailsMissionsSelector(),
  reservedCommunityMissionData: makeQueueTabReservedCommunityMissionDataSelector(),
  reservedCommunityMission: makeQueueTabReservedCommunityMissionSelector(),
  user: makeUserSelector(),
  objectDetails: makeObjectDetailsDataSelector(),
  isFetching: makeObjectDetailsFetchingSelector(),
  objectData: makeObjectDataSelector(),
});

const mapDispatchToProps = {
  getCommunityMissions,
  reserveCommunityMission,
};

@connect(
  mapStateToProps,
  mapDispatchToProps
)
@withTranslation()
class Missions extends Component {
  state = {
    reservationModalVisible: false,
    selectedMission: {},
    successModalShow: false,
    missionListExpired: false,
    errorPopup: false,
  };

  componentDidMount() {
    // this.getCommunityMissions();
  }

  componentWillUnmount() {
    stopCommunityMissionExpireTimer();
  }

  getCommunityMissions = () => {
    const {
      getCommunityMissions,
      params: { objectId },
    } = this.props;
    stopCommunityMissionExpireTimer();
    getCommunityMissions(objectId).then(({ data }) => {
      const timerTime = data.expires - data.timestamp;
      this.setState({ missionListExpired: false });
      setupCommunityMissionExpireTimer(timerTime, () =>
        this.setState({ missionListExpired: true })
      );
    });
  };

  reserveCommunityMission = () => {
    const { reserveCommunityMission, missionData } = this.props;
    const { selectedMission } = this.state;
    const { scheduledMissionId, missionStart } = selectedMission;
    const { callSource } = missionData;

    reserveCommunityMission({
      callSource,
      scheduledMissionId,
      missionStart,
    }).then(() =>{
      const { reservedCommunityMissionData } = this.props;
      if(reservedCommunityMissionData.apiError)
        this.setState({reservationModalVisible: false, errorPopup: true});
      else
         this.setState({ successModalShow: true, reservationModalVisible: false });
    }
    );
  };

  reservationModalShow = mission => {
    this.setState({ reservationModalVisible: true, selectedMission: mission });
  };

  reservationModalHide = () => {
    this.setState({ reservationModalVisible: false, selectedMission: {} });
  };

  modalClose = () => {
    this.setState({ successModalShow: false, selectedMission: {} });
    this.getCommunityMissions();
  };

  render() {
    const {
      params: { objectId },
      objectDetails,
      objectData,
      missionData,
      t,
      user,
      reservedCommunityMissionData,
      reservedCommunityMission,
      isFetching,      
    } = this.props;
    const { missionCount, missionList, explanation } = missionData;
    const {
      reservationModalVisible,
      selectedMission,
      successModalShow,
      missionListExpired,
      errorPopup,
    } = this.state;
    
    return (
      <Fragment>
        <Spinner loading={isFetching} />
        <DeviceProvider>
          <ObjectDetailsSectionTitle
            title={`${objectDetails.objectTitle}'s`}
            subTitle={t('Objects.UpcomingMissions')}
            renderNav={() => (
              <div className="object-details-missions-actions">
                {missionListExpired && (
                  <Button onClick={this.getCommunityMissions}>Refresh</Button>
                )}
              </div>
            )}
          />
        </DeviceProvider>
        <CenterColumn widths={['768px', '965px', '965px']}>
          <ObjectVisibilityProfileNew
              defaultObsId={objectData.obsIdDefault}
              objectId={objectId}    
              scheduleMission={(mission) => this.reservationModalShow(mission)}        
          />
          <br/>
        </CenterColumn>
        {/* <CenterColumn>
          {missionCount > 0 ? (
            <div style={{ margin: '0 20px 40px' }}>
              {missionList.map(item => (
                <div
                  className={`mission-card-container${
                    missionListExpired ? ' mission-expired' : ''
                  }`}
                >
                  <MissionCard
                    key={item.scheduledMissionId}
                    timeSlot={item}
                    onClickHandler={item.missionAvailable ? () => this.reservationModalShow(item) : null}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div>{!isFetching && explanation}</div>
          )}
        </CenterColumn>

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
          reservedMissionData={reservedCommunityMission}
          reservedMission={reservedCommunityMissionData}
          missionSlot={reservedCommunityMission}
        />

        {errorPopup &&(
          <Popup
          // ariaHideApp={false}
          isOpen={true}
          style={customModalStylesBlackOverlay}
          contentLabel="Error"
          shouldCloseOnOverlayClick={false}
          onRequestClose={()=>{this.setState({errorPopup: false})}}
          >
          <AccountDetailsHeader headerClass={'h-2 h-2-md text-no-transform'} title={t('Objects.ErrorStatusTitle')} showhr={true}/>
          <div className="container">
            <h4>{t('Objects.ErrorStatusMsg')} </h4>
            </div>
            <div className="actions-err-btn">
          <Button1 onClickEvent={()=>{this.setState({errorPopup: false})}} text={t('Objects.ErrorStatusBtnTxt')} /> 
          </div>
          </Popup>
        )} */}
        )
        <style jsx>{`         
          .actions-err-btn{
            display: flex;       
            justify-content: center;   
            height: 39px;  
            margin-top: 20px;
          }
        `}</style>
      </Fragment>
    );
  }
}

Missions.propTypes = {};

export default Missions;
