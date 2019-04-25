import React, { Component } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import {
  ObsBotWidget,
  ObservatoryInformation,
} from 'app/modules/telescope/components/old';
import { Box } from 'app/modules/telescope/components/box';
import { ConnectedAllSkyCamera } from 'app/modules/telescope/components/old/all-sky-camera';
import { DomCameraWidget } from 'app/modules/telescope/components/old/dom-camera-widget';
import { PicoDelTeidesWidget } from 'app/modules/telescope/components/old/pico-del-teide-widget';
import { MissionsList } from 'app/modules/missions/components/missions-list';
import { ReservationModal } from 'app/modules/missions/components/telescope-reservation/reservation-modal';
import { Spinner } from 'app/components/spinner/index';
import { setupMissionListTimer, stopMissionListTimer} from 'app/services/missions/timer';
import { FeaturedObjects } from '../featured-objects';
import './styles.scss';

const FEATURED_OBJECTS = {
  allowReservations: true,
  apiError: false,
  domeId: 3,
  errorCode: 0,
  errorMsg: "",
  firstMissionTimestamp: 1556224500,
  lang: "en",
  lastMissionTimestamp: 1556256600,
  missionCount: 7,
  missionList: [{
    missionAvailable: true,
    missionIndex: 0,
    missionStart: 1556224500,
    missionStartFormatted: {
      displayLabel: "",
      displayOtherTimeZones: "4:35 PM EDT / 1:35 PM PDT",
      displayTime: "20:35",
      displayTimeZone: "UTC",
      displayWeekdayMonthDayUTC: "Thu Apr. 25",
    },
    missionType: "member",
    ownerAvatarURL: "https://vega.slooh.com/icons/placeholders/avatar-dummy-2.png",
    ownerDisplayName: "AndrewF.2017",
    ownerId: 344365,
    scheduledMissionId: 1,
    showSloohUser: false,
    showUserDetails: true,
    slotIconURL: "https://vega.slooh.com/icons/objects/Nebula.svg",
    title: "Flaming Star 1",
    objectId: "2099509",
    userHasReservation: false,
    userReservationType: "none",
  },{
    missionAvailable: true,
    missionIndex: 0,
    missionStart: 1556224500,
    missionStartFormatted: {
      displayLabel: "",
      displayOtherTimeZones: "4:35 PM EDT / 1:35 PM PDT",
      displayTime: "20:35",
      displayTimeZone: "UTC",
      displayWeekdayMonthDayUTC: "Thu Apr. 25",
    },
    missionType: "member",
    ownerAvatarURL: "https://vega.slooh.com/icons/placeholders/avatar-dummy-2.png",
    ownerDisplayName: "AndrewF.2017",
    ownerId: 344365,
    scheduledMissionId: 2,
    showSloohUser: false,
    showUserDetails: true,
    slotIconURL: "https://vega.slooh.com/icons/objects/Nebula.svg",
    title: "Flaming Star 2",
    objectId: "2099509",
    userHasReservation: false,
    userReservationType: "none",
  },{
    missionAvailable: true,
    missionIndex: 0,
    missionStart: 1556224500,
    missionStartFormatted: {
      displayLabel: "",
      displayOtherTimeZones: "4:35 PM EDT / 1:35 PM PDT",
      displayTime: "20:35",
      displayTimeZone: "UTC",
      displayWeekdayMonthDayUTC: "Thu Apr. 25",
    },
    missionType: "member",
    ownerAvatarURL: "https://vega.slooh.com/icons/placeholders/avatar-dummy-2.png",
    ownerDisplayName: "AndrewF.2017",
    ownerId: 344365,
    scheduledMissionId: 3,
    showSloohUser: false,
    showUserDetails: true,
    slotIconURL: "https://vega.slooh.com/icons/objects/Nebula.svg",
    title: "Flaming Star 3",
    objectId: "2099509",
    userHasReservation: false,
    userReservationType: "none",
  },{
    missionAvailable: true,
    missionIndex: 0,
    missionStart: 1556224500,
    missionStartFormatted: {
      displayLabel: "",
      displayOtherTimeZones: "4:35 PM EDT / 1:35 PM PDT",
      displayTime: "20:35",
      displayTimeZone: "UTC",
      displayWeekdayMonthDayUTC: "Thu Apr. 25",
    },
    missionType: "member",
    ownerAvatarURL: "https://vega.slooh.com/icons/placeholders/avatar-dummy-2.png",
    ownerDisplayName: "AndrewF.2017",
    ownerId: 344365,
    scheduledMissionId: 4,
    showSloohUser: false,
    showUserDetails: true,
    slotIconURL: "https://vega.slooh.com/icons/objects/Nebula.svg",
    title: "Flaming Star 4",
    objectId: "2099509",
    userHasReservation: false,
    userReservationType: "none",
  },{
    missionAvailable: true,
    missionIndex: 0,
    missionStart: 1556224500,
    missionStartFormatted: {
      displayLabel: "",
      displayOtherTimeZones: "4:35 PM EDT / 1:35 PM PDT",
      displayTime: "20:35",
      displayTimeZone: "UTC",
      displayWeekdayMonthDayUTC: "Thu Apr. 25",
    },
    missionType: "member",
    ownerAvatarURL: "https://vega.slooh.com/icons/placeholders/avatar-dummy-2.png",
    ownerDisplayName: "AndrewF.2017",
    ownerId: 344365,
    scheduledMissionId: 5,
    showSloohUser: false,
    showUserDetails: true,
    slotIconURL: "https://vega.slooh.com/icons/objects/Nebula.svg",
    title: "Flaming Star 5",
    objectId: "2099509",
    userHasReservation: false,
    userReservationType: "none",
  },{
    missionAvailable: true,
    missionIndex: 0,
    missionStart: 1556224500,
    missionStartFormatted: {
      displayLabel: "",
      displayOtherTimeZones: "4:35 PM EDT / 1:35 PM PDT",
      displayTime: "20:35",
      displayTimeZone: "UTC",
      displayWeekdayMonthDayUTC: "Thu Apr. 25",
    },
    missionType: "member",
    ownerAvatarURL: "https://vega.slooh.com/icons/placeholders/avatar-dummy-2.png",
    ownerDisplayName: "AndrewF.2017",
    ownerId: 344365,
    scheduledMissionId: 6,
    showSloohUser: false,
    showUserDetails: true,
    slotIconURL: "https://vega.slooh.com/icons/objects/Nebula.svg",
    title: "Flaming Star 6",
    objectId: "2099509",
    userHasReservation: false,
    userReservationType: "none",
  },{
    missionAvailable: true,
    missionIndex: 0,
    missionStart: 1556224500,
    missionStartFormatted: {
      displayLabel: "",
      displayOtherTimeZones: "4:35 PM EDT / 1:35 PM PDT",
      displayTime: "20:35",
      displayTimeZone: "UTC",
      displayWeekdayMonthDayUTC: "Thu Apr. 25",
    },
    missionType: "member",
    ownerAvatarURL: "https://vega.slooh.com/icons/placeholders/avatar-dummy-2.png",
    ownerDisplayName: "AndrewF.2017",
    ownerId: 344365,
    scheduledMissionId: 7,
    showSloohUser: false,
    showUserDetails: true,
    slotIconURL: "https://vega.slooh.com/icons/objects/Nebula.svg",
    title: "Flaming Star 7",
    objectId: "2099509",
    userHasReservation: false,
    userReservationType: "none",
  }],
  obsId: "teide",
  showMoreSlotsIncrement: 10,
  showFeaturedObjects: true,
  statusCode: 200,
  telescopeId: "teide3",
  timestamp: 1556180512,
  ver: "v1",
}

export class QueueTab extends Component {
  state = {
    reservationModalVisible: false,
  };

  componentDidMount(){
    const { setTelescope, currentTelescope, currentObservatory } = this.props;
    this.getFeaturedObjectsByTelescope();
    this.getUpcomingSlotsByTelescope();
    setTelescope({
      ...currentTelescope,
      obsId: currentObservatory.obsId,
      domeId: currentTelescope.telePierNumber,
      telescopeId: currentTelescope.teleId,
    });
  }

  getUpcomingSlotsByTelescope = requestedSlotCount => {
    const { getUpcomingSlotsByTelescope, currentTelescope, currentObservatory } = this.props;
    stopMissionListTimer();
    getUpcomingSlotsByTelescope({
      obsId: currentObservatory.obsId,
      domeId: currentTelescope.telePierNumber,
      telescopeId: currentTelescope.teleId,
      requestedSlotCount,
    }).then(data => setupMissionListTimer(data.payload.refreshIntervalSec * 1000, () => this.getUpcomingSlotsByTelescope(requestedSlotCount)));
  }

  getFeaturedObjectsByTelescope = () => {
    const { getFeaturedObjectsByTelescope, currentTelescope, currentObservatory } = this.props;
    getFeaturedObjectsByTelescope({
      obsId: currentObservatory.obsId,
      domeId: currentTelescope.telePierNumber,
      telescopeId: currentTelescope.teleId,
    });
  }

  showMore = () => {
    const { upcomingSlotsData } = this.props;
    const { requestedSlotCount, showMoreSlotsIncrement } = upcomingSlotsData;
    this.getUpcomingSlotsByTelescope(requestedSlotCount + showMoreSlotsIncrement);
  }

  getTelescopeSlot = mission => {
    const { getTelescopeSlot, setSelectedSlot } = this.props;
    const { scheduledMissionId, uniqueId } = mission;
    setSelectedSlot(mission);
    getTelescopeSlot({
      finalizeReservation: false,
      grabType: 'notarget',
      scheduledMissionId,
      uniqueId,
    }).then(() => this.setState({ reservationModalVisible: true }));
  };

  reservationModalHide = () => {
    const { cancelMissionSlot, selectedSlot, upcomingSlotsData } = this.props;
    const { uniqueId, scheduledMissionId } = selectedSlot;
    const { requestedSlotCount } = upcomingSlotsData;
    cancelMissionSlot({
      callSource: 'byTelescopeV4',
      grabType: 'notarget',
      scheduledMissionId,
      uniqueId,
    }).then(() => this.getUpcomingSlotsByTelescope(requestedSlotCount));
    this.setState({ reservationModalVisible: false });
  };

  reservationComplete = () => {
    const { upcomingSlotsData } = this.props;
    const { requestedSlotCount } = upcomingSlotsData;
    this.getUpcomingSlotsByTelescope(requestedSlotCount);
    this.setState({ reservationModalVisible: false });
  };

  render(){
    const {
      upcomingSlotsData,
      isFetching,
      mobileMissionList,
      featuredObjectsData,
      currentTelescope,
      showFeaturedObjects,
    } = this.props;
    const { missionList, reservationDateFormatted, showShowMoreButton, showMoreButtonCaption } = upcomingSlotsData;
    const { reservationModalVisible } = this.state;
    
    return (
      <div className={`animated fadeIn faster queue-tab${
        mobileMissionList ? ' mobile-missions-list' : ''
      }`}>
        <Container>
          <Spinner
            loading={isFetching}
          />

          {showFeaturedObjects && (
            <FeaturedObjects 
              featuredObjectsData={FEATURED_OBJECTS}
              currentTelescope={currentTelescope}
            />
          )}

          <MissionsList 
            selectedDate={{ reservationDateFormatted }}
            missionList={missionList}
            getTelescopeSlot={this.getTelescopeSlot}
            showMore={this.showMore}
            showShowMoreButton={showShowMoreButton}
            showMoreButtonCaption={showMoreButtonCaption}
          />

          {reservationModalVisible && (
            <ReservationModal
              onHide={this.reservationModalHide}
              onComplete={this.reservationComplete}
              show
            />
          )}
        </Container>
      </div>
  )};

};
