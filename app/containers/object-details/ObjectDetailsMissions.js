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
import { API } from 'app/api';
import { GET_JOIN_MISSIONS } from 'app/services/objects';
import { getUserInfo } from 'app/modules/User';
import { DEFAULT_OBSID } from 'app/components/object-details/ObjectVisibilityProfile/constants';
import ObjectDetailsSectionTitleNew from 'app/components/object-details/ObjectDetailsSectionTitle/ObjectDetailsSectionTitleNew';


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
    callSource: '',
    joinMissionData: undefined,
    isFetching: true,
    obsId: DEFAULT_OBSID,
    tzId: undefined,
    refreshMissionCard: false,
  };

  componentDidMount() {
    this.getJoinMissions();
  }

  componentWillUnmount() {
    stopCommunityMissionExpireTimer();
  }

  getJoinMissions = (dateString, tzId) =>{    
    const { params: { objectId }, onExpired } = this.props;
    const { refreshMissionCard } = this.state;
    const { at, cid, token } = getUserInfo();
    this.setState({isFetching: true, dateString: dateString, tzId: tzId});
    stopCommunityMissionExpireTimer();
    API.post(GET_JOIN_MISSIONS,{ at, cid, token, dateString, objectId, tz: tzId,}).then(response=>{
      const res=response.data;
      if(!res.apiError){       
        const timerTime = (res.expires - res.timestamp);
        // this.setState({ missionListExpired: false });
        // const timerTime=10;
        // if(timerTime > 1000 )
          setupCommunityMissionExpireTimer(timerTime, () =>this.setState({ missionListExpired: true }));
        this.setState({joinMissionData: res, isFetching: false, missionListExpired: false, refreshMissionCard: !refreshMissionCard});
      }
    })
  }

  // getCommunityMissions = () => {
  //   const {
  //     getCommunityMissions,
  //     params: { objectId },
  //   } = this.props;
  //   stopCommunityMissionExpireTimer();
  //   getCommunityMissions(objectId).then(({ data }) => {
  //     const timerTime = data.expires - data.timestamp;
  //     this.setState({ missionListExpired: false });
  //     setupCommunityMissionExpireTimer(timerTime, () =>
  //       this.setState({ missionListExpired: true })
  //     );
  //   });
  // };

  reserveCommunityMission = () => {
    const { reserveCommunityMission, missionData } = this.props;
    const { selectedMission, callSource } = this.state;
    const { scheduledMissionId, missionStart } = selectedMission;
    // const { callSource } = missionData;

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

  reservationModalShow = (mission, callSource ) => {    
    this.setState({ reservationModalVisible: true, selectedMission: mission, callSource: callSource });
  };

  reservationModalHide = () => {
    this.setState({ reservationModalVisible: false, selectedMission: {} });
  };

  modalClose = () => {
    this.setState({ successModalShow: false, selectedMission: {} });
    // this.getCommunityMissions();
    this.getJoinMissions(this.state.dateString, this.state.tzId);
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
      // isFetching,      
    } = this.props;
    // const { missionCount, missionList, explanation } = missionData;
    const {
      reservationModalVisible,
      selectedMission,
      successModalShow,
      missionListExpired,
      errorPopup,
      isFetching,
      joinMissionData,
      dateString,
      tzId,
      refreshMissionCard
    } = this.state;
    
    return (
      <Fragment>
        <Spinner loading={isFetching} />
        <DeviceProvider>
          {joinMissionData && (
            <ObjectDetailsSectionTitleNew
              // title={`${objectDetails.objectTitle}'s`}
              // subTitle={t('Objects.UpcomingMissions')}
              title={`${joinMissionData.pageHeading}`}
              subTitle={joinMissionData.pageSubheading}
              renderNav={() => (
                <div className="object-details-missions-actions">
                  {missionListExpired && (
                    <Button onClick={()=>this.getJoinMissions(dateString, tzId)}>Refresh</Button>
                  )}
                </div>
              )}
            />
          )}
          
        </DeviceProvider>
        <CenterColumn widths={['768px', '965px', '965px']}>
          <ObjectVisibilityProfileNew
              defaultObsId={objectData.obsIdDefault}
              objectId={objectId}    
              scheduleMission={(mission, callSource) => this.reservationModalShow(mission, callSource)}        
              // onExpired={() => this.setState({ missionListExpired: true })}
              isFetching={isFetching}
              joinMissionData={joinMissionData}
              getJoinMissions={this.getJoinMissions}
              refreshMissionCard={refreshMissionCard}
              missionListExpired={missionListExpired}
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
        </CenterColumn> */}

        {reservationModalVisible && (
          <FeaturedObjectsModal
            onHide={this.reservationModalHide}
            onComplete={()=>this.reserveCommunityMission(selectedMission)}
            selectedMission={selectedMission}
            user={user}
            onMissionView={()=>this.reserveCommunityMission(selectedMission)}
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
        )}
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
