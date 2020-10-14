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
        const { cancelReservation, getPrivateProfileMissions, getDashboardMissionList } = this.props;
        const { selectedSlot } = this.state;
    
        cancelReservation({
          scheduledMissionId: selectedSlot.scheduledMissionId,
        }).then(() => {
          this.setState({ cancelReservationModalVisible: false });
          // getPrivateProfile();
          // getPrivateProfileMissions(); 
          getDashboardMissionList(); 
        });
      };
    
      cancelPiggyback = () => {
        const { cancelPiggyback, getPrivateProfile, getPrivateProfileMissions, getDashboardMissionList } = this.props;
        const { selectedSlot } = this.state;
        const { scheduledMissionId } = selectedSlot;
        
        cancelPiggyback({ scheduledMissionId }).then(() => {
          this.setState({ cancelPiggybackModalVisible: false });
          // getPrivateProfile();      
          // getPrivateProfileMissions();
          getDashboardMissionList(); 
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
        this.props.getDashboardMissionList();
      };

      getDashboardFeaturedObjects = () => {
        const { getDashboardFeaturedObjects, getPrivateProfileMissions } = this.props;
        
        getDashboardFeaturedObjects({callSource: "featuredObjectsDashboardV4New"});
        // getPrivateProfileMissions();
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
        const {                 
                dashboardMissionList,
                dashboardFeaturedObjects,                
                reservedCommunityMissionData,
                reservedCommunityMission,
                user,                
              } = this.props;
        
        const {
          missions,
          advancedMissions,
          pastMissions,
          missionsSectionHeader,
          missionsSectionSubheader,          
        } = dashboardMissionList;

        const {
          recommendedObjectsHeading,
          recommendedObjectsSubHeading,
          recommendedObjectsShow
        } = dashboardFeaturedObjects;

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
                  <TitleHeaderNew
                    heading = {missionsSectionHeader}
                    subHeading = {missionsSectionSubheader}
                  />

                  {/* {missionsSectionHeader && (
                      <h2 className="upcoming-heading">{missionsSectionHeader}</h2>
                  )}
                  {missionsSectionSubheader && (
                      <h5 className="upcoming-subheading-status">{missionsSectionSubheader}</h5> 
                  )}                        */}

                    {dashboardFeaturedObjects && (
                        <FeaturedMissionList
                            heading={recommendedObjectsHeading}
                            subHeading={recommendedObjectsSubHeading}
                            recommendedObjectsShow={recommendedObjectsShow}
                            featuredMissionList={dashboardFeaturedObjects.missionList}
                            reservationModalShow={this.reservationModalShow}
                            readOnly={false}
                            explanation={dashboardFeaturedObjects.explanation}
                            showExplanation={dashboardFeaturedObjects.showExplanation}
                        />
                    )}
                    {missions.showMissionsTitle && (
                        <div>
                            <br/>
                            {missions.showMissionsTitle && (
                              <h3 className="upcoming-subheadings">{missions.missionsTitle}</h3>
                            )}
                            {missions.showMissionsQuota && (                        
                              <h5 className="upcoming-subheading-status">{missions.missionsQuota}</h5>
                            )}  
                        </div> 
                    )}                  
                   
                    {missions.showMissionsList && (
                      <div className="upcoming-list">
                        {missions.missionsList.map(mission=>(
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
                    {missions.showMissionsExplanation && (
                      <div class="empty-guide">
                        <h3 class="guide-list-heading">{missions.missionsExplanation}</h3>
                      </div>                        
                    )}                  
                    
                    {/* {missionList.length === 0 ? (
                        <div className="empty-mission-card">
                            <h3 className="upcoming-subheadings">{emptySetDisplay}</h3>
                        </div>
                    ):null} */}
                    {advancedMissions.showMissionsTitle &&(
                        <div>
                            <br/>
                            {advancedMissions.showMissionsTitle && (
                              <h3 className="upcoming-subheadings">{advancedMissions.missionsTitle}</h3>
                            )}
                            {advancedMissions.showMissionsQuota && (
                              <h5 className="upcoming-subheading-status">{advancedMissions.missionsQuota}</h5> 
                            )}
                            
                        </div>                    
                    )}
                    {advancedMissions.showMissionsList && (
                      <div className="upcoming-list">
                      {advancedMissions.missionsList.map(mission=>(
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
                    {advancedMissions.showMissionsExplanation && (
                      <div class="empty-guide">
                        <h3 class="guide-list-heading">{advancedMissions.missionsExplanation}</h3>
                      </div>                         
                    )}    


                    <div>
                  <br/>
                  {pastMissions.showMissionsTitle && (
                    <h3 className="upcoming-subheadings">{pastMissions.missionsTitle}</h3>
                  )}
                  {pastMissions.showMissionsQuota && (                        
                    <h5 className="upcoming-subheading-status">{pastMissions.missionsQuota}</h5>
                  )}  
                </div>                    
                   
                    {pastMissions.showMissionsList && (
                      <div className="upcoming-list">
                        {pastMissions.missionsList.map(mission=>(
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
                    {pastMissions.showMissionsExplanation && (
                      <div class="empty-guide">
                        <h3 class="guide-list-heading">{pastMissions.missionsExplanation}</h3>
                      </div>                        
                    )}                           
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