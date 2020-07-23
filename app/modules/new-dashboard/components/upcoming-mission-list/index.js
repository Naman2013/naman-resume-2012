import { Component } from 'react';
import React from "react";
import './style.scss';
import { FeaturedMissionList } from '../featured-mission-list';
import { UpcomingMissionCard } from '../upcoming-mission-card';
import { MissionConfirmationModal } from 'app/modules/missions/components/mission-confirmation-modal';
import { MissionSuccessModal } from 'app/modules/missions/components/mission-success-modal';
import { FeaturedObjectsModal } from 'app/modules/telescope/components/featured-objects-modal';
import { select } from 'redux-saga/effects';

export class UpcomingMissionList extends Component{

    state = {
        cancelReservationModalVisible: false,
        cancelPiggybackModalVisible: false,
        reservationPiggybackVisible: false,
        successModalShow: false,
        selectedSlot: {},
        reservationModalVisible: false,
    };

    cancelReservation = () => {
        const { cancelReservation, getPrivateProfileMissions } = this.props;
        const { selectedSlot } = this.state;
    
        cancelReservation({
          scheduledMissionId: selectedSlot.scheduledMissionId,
        }).then(() => {
          this.setState({ cancelReservationModalVisible: false });
          // getPrivateProfile();
          getPrivateProfileMissions(); 
        });
      };
    
      cancelPiggyback = () => {
        const { cancelPiggyback, getPrivateProfile, getPrivateProfileMissions } = this.props;
        const { selectedSlot } = this.state;
        const { scheduledMissionId } = selectedSlot;
        
        cancelPiggyback({ scheduledMissionId }).then(() => {
          this.setState({ cancelPiggybackModalVisible: false });
          // getPrivateProfile();      
          getPrivateProfileMissions(); 
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
        const { getDashboardFeaturedObjects, getPrivateProfileMissions } = this.props;
        
        getDashboardFeaturedObjects();
        getPrivateProfileMissions();
        // stopFeaturedObjectsExpireTimer();
        // getDashboardFeaturedObjects('').then(({ payload }) => {
        //   const timerTime = payload.expires - payload.timestamp;
        //   setupFeaturedObjectsExpireTimer(timerTime, () =>
            // this.getDashboardFeaturedObjects()
        //   );
        // });
      };

      reserveCommunityMission = () => {
        const { reserveCommunityMission, dashboardFeaturedObjects } = this.props;
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
        const {heading, scheduleMission, 
            piggyBackMissionSlot,
            piggybackReservedMissionData,
            piggybackReservedMission, 
            emptySetDisplay, 
            missionList, 
            advancedmissionList, 
            showSubHeading, 
            featuredMission, 
            dashboardFeaturedObjects,
            reservedCommunityMissionData,
            reservedCommunityMission,
            user,
            callSource,
            totalCount } = this.props;
        const {
            cancelReservationModalVisible,
            cancelPiggybackModalVisible,
            reservationPiggybackVisible,
            successModalShow,
            selectedSlot,
            reservationModalVisible,
          } = this.state;

          const {
            cancelMissionDialogPrompt,
            cancelPiggybackDialogPrompt,
          } = selectedSlot;        
          
          const emptyMissionCard = {emptyslot: true, missionTitle: "Plan new Mission", subtitle: "Empty Slot"};
          
        return (
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
                    <h2 className="upcoming-heading">{heading}</h2>  

                    {featuredMission && dashboardFeaturedObjects && (
                        <FeaturedMissionList
                            featuredMissionList={dashboardFeaturedObjects.missionList}
                            reservationModalShow={this.reservationModalShow}
                            readOnly={false}
                        />
                    )}
                    
                    {showSubHeading && (
                        <div>
                            <br/>
                            <h3 className="upcoming-subheadings">{"Missions"}</h3>
                            <h5 className="upcoming-subheading-status">{missionList.length + "/5 Missions"}</h5>  
                        </div>                    
                    )}                 
                    <div className="upcoming-list">
                        {[...Array(totalCount)].map((e,index)=>(                            
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
                                <UpcomingMissionCard
                                  mission={emptyMissionCard}                                  
                                />
                              ))
                            
                            
                        )}
                        
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
                    {/* {missionList.length === 0 ? (
                        <div className="empty-mission-card">
                            <h3 className="upcoming-subheadings">{emptySetDisplay}</h3>
                        </div>
                    ):null} */}
                    {showSubHeading &&(
                        <div>
                            <br/>
                            <h3 className="upcoming-subheadings">{"Advanced Missions"}</h3>
                            <h5 className="upcoming-subheading-status">{"1/1 Missions"}</h5> 
                        </div>                    
                    )}                
                    <div className="upcoming-list">
                        {advancedmissionList.map(mission=>(
                            <UpcomingMissionCard
                                mission={mission}
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
        );
    }

}