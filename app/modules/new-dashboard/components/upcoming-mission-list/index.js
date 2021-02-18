import { Component } from 'react';
import React from "react";
import './style.scss';
import { FeaturedMissionList } from '../featured-mission-list';
import { UpcomingMissionCard } from '../upcoming-mission-card';
import { MissionConfirmationModal } from 'app/modules/missions/components/mission-confirmation-modal';
import { MissionSuccessModal } from 'app/modules/missions/components/mission-success-modal';
import { FeaturedObjectsModal } from 'app/modules/telescope/components/featured-objects-modal';
import { select } from 'redux-saga/effects';
import { getMissionSlotEdit } from 'app/modules/missions/thunks';
import { TitleHeaderNew } from '../title-header-new';
import { cancelMissionReservationApi } from 'app/modules/missions/api';
import { getUserInfo } from 'app/modules/User';
import { RecentMissionCard } from '../recent-mission-card';
import { getDashboardFeaturedObjects, getDashboardMissionList } from '../../dashboardApi';
import { Spinner } from 'app/components/spinner/index';
import Modal from 'react-modal';
import MissionDetails from 'app/modules/mission-details/containers/mission-details';
import { browserHistory } from 'react-router';
import { Button } from '../button';
import MissionDetailsNew from 'app/modules/mission-details/containers/mission-details-new';

const customModalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    minWidth: '300px',
    width: '90%',
    height: '90%',
    maxWidth: '95%',
    padding: '10px 20px',      
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
};

export class UpcomingMissionList extends Component{

    state = {
        cancelReservationModalVisible: false,
        cancelPiggybackModalVisible: false,
        reservationPiggybackVisible: false,
        successModalShow: false,
        selectedSlot: {},
        reservationModalVisible: false,
        loading: true,
        dashboardFeaturedObjects: undefined,
        dashboardMissionList: undefined,
        showModal: false,
        modalParams:{},
    };

    timerId = null;

    constructor (props){
      super(props);
      this.getDashboardFeaturedObjects();
    }

    componentWillUnmount(){
      if(this.timerId !==null)
        clearTimeout(this.timerId);
    }

    cancelReservation = () => {       
        const { selectedSlot } = this.state;
        const { at, cid, token } = getUserInfo();
        cancelMissionReservationApi({ at, cid, token, 
          scheduledMissionId: selectedSlot.scheduledMissionId,
        }).then((response) => {
          const res=response.data;
          if(!res.apiError){
            this.setState({ cancelReservationModalVisible: false });            
            this.getDashboardFeaturedObjects(); 
          }
          else  
            this.props.validateResponseAccess(res)
        });
      };
    
      cancelPiggyback = () => {
        const { cancelPiggyback } = this.props;
        const { selectedSlot } = this.state;
        const { scheduledMissionId } = selectedSlot;
        
        cancelPiggyback({ scheduledMissionId }).then(() => {
          this.setState({ cancelPiggybackModalVisible: false });
          this.getDashboardMissionListAction(); 
        });
      };

      grabPiggyback = (mission) => {
        const { grabPiggyback } = this.props;
        const { scheduledMissionId, uniqueId } = mission;
        grabPiggyback({
          callSource: 'byTelescopeV4',
          scheduledMissionId,
          uniqueId,
        }).then(() => this.setState({ reservationPiggybackVisible: true }));
      };
    
      reservePiggyback = () => {
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

      getMissionSlot = mission => {
        const { selectedTelescope, selectedDate } = this.props;
        const { scheduledMissionId } = mission;
        const { obsId, domeId } = selectedTelescope;
        const { reservationDate } = selectedDate;
    
        getMissionSlotEdit({
          type: 'editCoords',
          scheduledMissionId,
          obsId,
          domeId,
          reservationDate,
        }).then(() =>
          this.setState({ reservationModalVisible: true, editCoordinates: true })
        );
      };
    
      successModalHide = () => {
        clearInterval(this.missionTimer);
        this.fetchMissions().then(() => this.setupRefreshMissionsInterval());
        this.setState({ successModalShow: false });
      };

      reservationModalShow = mission => {
        this.setState({ reservationModalVisible: true, selectedSlot: mission });
      };

      reservationModalHide = () => {
        this.setState({ reservationModalVisible: false, selectedSlot: {} });
      };
    
      modalClose = () => {
        this.setState({
          successModalShow: false,
          selectedMission: {},
        });
        this.getDashboardFeaturedObjects();        
      };

      getDashboardFeaturedObjects = () => {        
        const { at, cid, token } = getUserInfo();
        getDashboardFeaturedObjects({at, cid, token, callSource: "featuredObjectsDashboardV4New" }).then(response=>{
            const res=response.data;
            if(!res.apiError){
              const duration = (res.expires-res.timestamp) * 1000;
              if(this.timerId !== null)
                clearTimeout(this.timerId);
              if(duration > 1000)
                this.timerId = setTimeout(this.getDashboardFeaturedObjects, duration);
              this.setState({dashboardFeaturedObjects: res});
            }
            else  
              this.props.validateResponseAccess(res)
        });
        this.getDashboardMissionListAction();        
      };

      getDashboardMissionListAction = () => {        
        const { at, cid, token } = getUserInfo();
        getDashboardMissionList({at, cid, token }).then(response=>{
            const res=response.data;
            if(!res.apiError){              
              this.setState({dashboardMissionList: res, loading: false});
            }
            else  
              this.props.validateResponseAccess(res)
        });              
      };

      reserveCommunityMission = () => {        
        const { reserveCommunityMission } = this.props;
        const { dashboardFeaturedObjects } = this.state;
        const { callSource } = dashboardFeaturedObjects;
        const { selectedSlot } = this.state;
        const { scheduledMissionId, missionStart } = selectedSlot;
        
        reserveCommunityMission({
          callSource,
          scheduledMissionId,
          missionStart,
        }).then(() =>
          this.setState({ successModalShow: true, reservationModalVisible: false })
        );
      };

    render() {
        const {                 
                // dashboardMissionList,
                // dashboardFeaturedObjects,                
                reservedCommunityMissionData,
                reservedCommunityMission,
                user,                
              } = this.props;

              const {
                cancelReservationModalVisible,
                cancelPiggybackModalVisible,
                reservationPiggybackVisible,
                successModalShow,
                selectedSlot,
                reservationModalVisible,
                dashboardMissionList,
                dashboardFeaturedObjects, 
                loading,  
                showModal,
                modalParams,
              } = this.state;             

          const {
            cancelMissionDialogPrompt,
            cancelPiggybackDialogPrompt,
          } = selectedSlot;        
          
          const emptyMissionCard = {emptyslot: true, missionTitle: "Plan new Mission", subtitle: "Empty Slot"};
          
        return (
          <div>
            {dashboardMissionList && dashboardFeaturedObjects && (
              <div>
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
                <div className="upcoming-main">
                  <div className="mission-header">
                    <TitleHeaderNew
                      heading = {dashboardMissionList.missionsSectionHeader}
                      subHeading = {dashboardMissionList.missionsSectionSubheader}
                    />

                    <Button
                      type={"button"}
                      onClickEvent={()=>browserHistory.push("/missions/bySlooh1000")} 
                      text={"Mission Setup"}                                             
                      style={"button-border"}
                      icon={null}
                    />
                  </div>

                  {/* {missionsSectionHeader && (
                      <h2 className="upcoming-heading">{missionsSectionHeader}</h2>
                  )}
                  {missionsSectionSubheader && (
                      <h5 className="upcoming-subheading-status">{missionsSectionSubheader}</h5> 
                  )}                        */}

                    {dashboardFeaturedObjects && (
                        <FeaturedMissionList
                            heading={dashboardFeaturedObjects.recommendedObjectsHeading}
                            subHeading={dashboardFeaturedObjects.recommendedObjectsSubHeading}
                            recommendedObjectsShow={dashboardFeaturedObjects.recommendedObjectsShow}
                            featuredMissionList={dashboardFeaturedObjects.missionList}
                            reservationModalShow={this.reservationModalShow}
                            readOnly={false}
                            explanation={dashboardFeaturedObjects.explanation}
                            showExplanation={dashboardFeaturedObjects.showExplanation}
                        />
                    )}
                    {dashboardMissionList.missions.showMissionsTitle && (
                        <div>
                            <br/>
                            {dashboardMissionList.missions.showMissionsTitle && (
                              <h3 className="upcoming-subheadings">{dashboardMissionList.missions.missionsTitle}</h3>
                            )}
                            {dashboardMissionList.missions.showMissionsQuota && (                        
                              <h5 className="upcoming-subheading-status">{dashboardMissionList.missions.missionsQuota}</h5>
                            )}  
                        </div> 
                    )}                  
                  
                    {dashboardMissionList.missions.showMissionsList && (
                      <div className="upcoming-list">
                        {dashboardMissionList.missions.missionsList.map(mission=>(
                            <UpcomingMissionCard
                              mission={mission}
                              key={mission.scheduledMissionId}
                              timeSlot={mission}
                              cancelReservation={(selectedSlot) => 
                                  this.setState({cancelReservationModalVisible: true, selectedSlot, })}
                              cancelPiggyback={(selectedSlot) =>
                                  this.setState({ cancelPiggybackModalVisible: true, selectedSlot, })}
                              grabPiggyback={this.grabPiggyback}
                            />
                        ))}

                        {/* empty slot to plan an mission */}

                        {/* {[...Array(totalCount)].map((e,index)=>(                            
                              index < missionList.length ? (
                                <UpcomingMissionCard
                                  mission={missionList[index]}
                                  key={missionList[index].scheduledMissionId}
                                  timeSlot={missionList[index]}
                                  cancelReservation={(selectedSlot) => 
                                      this.setState({cancelReservationModalVisible: true, selectedSlot, })}
                                  cancelPiggyback={(selectedSlot) =>
                                      this.setState({ cancelPiggybackModalVisible: true, selectedSlot, })}
                                  grabPiggyback={this.grabPiggyback}
                                />
                              ):(
                                // <UpcomingMissionCard
                                //   mission={emptyMissionCard}                                  
                                // />
                                null
                              ))
                            
                            
                        )} */}
                        
                        {/* {scheduleMission &&(
                            <div className="schedule-mission-card">
                                <div className="upcoming-mission-card-head">
                                    <h4 className="schedule-misssion-title">Schedule a New Mission</h4>
                                    <img className="card-options" src="https://vega.slooh.com/assets/v4/dashboard-new/right_arrow_white.svg"/>
                                </div>        
                                <h4 className="schedule-mission-subtitle">Schedule your next adventure</h4>
                        </div>
                        )}                             */}
                        
                    </div>
                    )}
                    {dashboardMissionList.missions.showMissionsExplanation && (
                      <div class="empty-guide">
                        <h3 class="guide-list-heading">{dashboardMissionList.missions.missionsExplanation}</h3>
                      </div>                        
                    )}                  
                    
                    {/* {missionList.length === 0 ? (
                        <div className="empty-mission-card">
                            <h3 className="upcoming-subheadings">{emptySetDisplay}</h3>
                        </div>
                    ):null} */}
                    {dashboardMissionList.advancedMissions.showMissionsTitle &&(
                        <div>
                            <br/>
                            {dashboardMissionList.advancedMissions.showMissionsTitle && (
                              <h3 className="upcoming-subheadings">{dashboardMissionList.advancedMissions.missionsTitle}</h3>
                            )}
                            {dashboardMissionList.advancedMissions.showMissionsQuota && (
                              <h5 className="upcoming-subheading-status">{dashboardMissionList.advancedMissions.missionsQuota}</h5> 
                            )}
                            
                        </div>                    
                    )}
                    {dashboardMissionList.advancedMissions.showMissionsList && (
                      <div className="upcoming-list">
                      {dashboardMissionList.advancedMissions.missionsList.map(mission=>(
                          <UpcomingMissionCard
                              mission={mission}
                              key={mission.scheduledMissionId}
                              timeSlot={mission}
                              cancelReservation={(selectedSlot) => 
                                this.setState({cancelReservationModalVisible: true, selectedSlot, })}
                              cancelPiggyback={(selectedSlot) =>
                                  this.setState({ cancelPiggybackModalVisible: true, selectedSlot, })}
                              grabPiggyback={this.grabPiggyback}
                          />
                      ))}
                      {/* {scheduleMission &&(
                          <div className="schedule-mission-card">
                              <div className="upcoming-mission-card-head">
                                  <h4 className="schedule-misssion-title">Schedule a New Mission</h4>
                                  <img className="card-options" src="https://vega.slooh.com/assets/v4/dashboard-new/right_arrow_white.svg"/>
                              </div>        
                              <h4 className="schedule-mission-subtitle">Schedule your next adventure</h4>
                      </div>
                      )}                             */}
                      </div>    
                    )}                
                    {dashboardMissionList.advancedMissions.showMissionsExplanation && (
                      <div class="empty-guide">
                        <h3 class="guide-list-heading">{dashboardMissionList.advancedMissions.missionsExplanation}</h3>
                      </div>                         
                    )}    


                    <div>
                  <br/>
                  {dashboardMissionList.pastMissions.showMissionsTitle && (
                    <h3 className="upcoming-subheadings">{dashboardMissionList.pastMissions.missionsTitle}</h3>
                  )}
                  {dashboardMissionList.pastMissions.showMissionsQuota && (                        
                    <h5 className="upcoming-subheading-status">{dashboardMissionList.pastMissions.missionsQuota}</h5>
                  )}  
                </div>                    
                  
                    {dashboardMissionList.pastMissions.showMissionsList && (
                      <div className="upcoming-list">
                        {dashboardMissionList.pastMissions.missionsList.map(mission=>(
                            <RecentMissionCard
                              mission={mission}
                              key={mission.scheduledMissionId}
                              timeSlot={mission}
                              cancelReservation={(selectedSlot) => 
                                  this.setState({cancelReservationModalVisible: true, selectedSlot, })}
                              cancelPiggyback={(selectedSlot) =>
                                  this.setState({ cancelPiggybackModalVisible: true, selectedSlot, })}
                              grabPiggyback={this.grabPiggyback}
                              showModal={(params)=>this.setState({showModal: true, modalParams: {missionId: params}})}
                            />
                        ))}

                        {/* {[...Array(totalCount)].map((e,index)=>(                            
                              index < missionList.length ? (
                                <UpcomingMissionCard
                                  mission={missionList[index]}
                                  key={missionList[index].scheduledMissionId}
                                  timeSlot={missionList[index]}
                                  cancelReservation={(selectedSlot) => 
                                      this.setState({cancelReservationModalVisible: true, selectedSlot, })}
                                  cancelPiggyback={(selectedSlot) =>
                                      this.setState({ cancelPiggybackModalVisible: true, selectedSlot, })}
                                  grabPiggyback={this.grabPiggyback}
                                />
                              ):(
                                // <UpcomingMissionCard
                                //   mission={emptyMissionCard}                                  
                                // />
                                null
                              ))
                            
                            
                        )} */}
                        
                        {/* {scheduleMission &&(
                            <div className="schedule-mission-card">
                                <div className="upcoming-mission-card-head">
                                    <h4 className="schedule-misssion-title">Schedule a New Mission</h4>
                                    <img className="card-options" src="https://vega.slooh.com/assets/v4/dashboard-new/right_arrow_white.svg"/>
                                </div>        
                                <h4 className="schedule-mission-subtitle">Schedule your next adventure</h4>
                        </div>
                        )}                             */}
                        
                    </div>
                    )}
                    {dashboardMissionList.pastMissions.showMissionsExplanation && (
                      <div class="empty-guide">
                        <h3 class="guide-list-heading">{dashboardMissionList.pastMissions.missionsExplanation}</h3>
                      </div>                        
                    )}                           
                </div>
                
                <div className="overlay-loading-div">
                  <Spinner loading={loading} />
                </div>
                




                {/* {reservationPiggybackVisible && (
                    <FeaturedObjectsModal
                        onHide={() => this.setState({ reservationPiggybackVisible: false })}
                        selectedMission={piggyBackMissionSlot}
                        user={user}
                        onMissionView={this.reservePiggyback}
                        piggyback
                        show
                    />
                )} */}

                {reservationModalVisible && (
                    <FeaturedObjectsModal
                        onHide={this.reservationModalHide}
                        onComplete={this.reserveCommunityMission}
                        selectedMission={selectedSlot}
                        user={user}
                        onMissionView={this.reserveCommunityMission}
                        show
                    />
                )}

                {/* <MissionSuccessModal
                    show={successModalShow}
                    onHide={this.successModalHide}
                    reservedMissionData={piggybackReservedMissionData}
                    reservedMission={piggybackReservedMission}
                    missionSlot={piggyBackMissionSlot}
                /> */}
                <MissionSuccessModal
                    show={successModalShow}
                    onHide={this.modalClose}
                    reservedMissionData={selectedSlot}
                    reservedMission={reservedCommunityMissionData}
                    missionSlot={reservedCommunityMission}
                />
            </div>
            )}

            <Modal
              isOpen={showModal}
              contentLabel="Bio"
              onRequestClose={()=>this.setState({showModal: false})}
              style={customModalStyles}
              ariaHideApp={false}
              shouldCloseOnOverlayClick={false}
            >
                <i
                  className="fa fa-close"
                  onClick={()=>this.setState({showModal: false})}
                  role="button"
                  style={{float: "right", fontSize: "20px"}}
                />
                <MissionDetailsNew
                  params={modalParams}
                  newDash
                />
            </Modal>   
          </div>
            
        );
    }

}