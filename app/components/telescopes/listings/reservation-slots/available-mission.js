import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  grabTelescopeSlot,
  getReservationOnHold,
  cancelReservation,
  cancelEditMission,
  cancelReservationAndRefresh,
  cancelEditCoordinateMission,
  changeFormType,
} from '../../../../modules/grab-telescope-slot/actions';

import MissionTime from '../partials/mission-time';
import ReservationByObjects from '../forms/reservation-by-objects';
import ReservationByCatalog from '../forms/reservation-by-catalog';
import ReservationByCoordinate from '../forms/reservation-by-coordinate';

import SUPPORTED_RESERVATION_TAB_FORM_TYPES from '../../../../constants/supported-reservation-tab-form-types';

const mapStateToProps = ({ telescopeSlots, missionSlotDates }) => ({
  telescopeSlots,
  missionSlotDates,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    cancelReservation,
    cancelEditMission,
    grabTelescopeSlot,
    cancelReservationAndRefresh,
    cancelEditCoordinateMission,
    changeFormType,
  }, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
class AvailableMission extends Component {

  // either set a defaultFormTab from the state OR fallback to none at all
  state = {
    formType: SUPPORTED_RESERVATION_TAB_FORM_TYPES.NONE,
  }

  renderForm() {
    const {
      uniqueId,
      scheduledMissionId,
      showHoldOneHourButtonWhenExpanded,
      showCancelHoldButtonWhenExpanded,
      telescopeId,
      telescopeSlots,
      missionStart,
      missionSlotDates,
      targetName,
    } = this.props;

    const reservationOnHold = getReservationOnHold(uniqueId, telescopeSlots.missions);

    if (!reservationOnHold) {
      return null;
    }

    const adjustedFormType = reservationOnHold.defaultFormTab || reservationOnHold.mission.defaultFormType;

    const currentMissionOnHold = reservationOnHold.mission.missionList[0];
    const { expires } = currentMissionOnHold;
    const { domeId, obsId } = missionSlotDates.dateRangeResponse.dateList[0];

    if (adjustedFormType === SUPPORTED_RESERVATION_TAB_FORM_TYPES.BY_OBJECTS) {
      return (
        <ReservationByObjects
          showPlaceOnHold={showHoldOneHourButtonWhenExpanded}
          showCancelHold={showCancelHoldButtonWhenExpanded}
          expires={expires}
          expireCallback={this.handleTimerExpiration}
          uniqueId={uniqueId}
          scheduledMissionId={scheduledMissionId}
          missionStart={missionStart}
          obsId={obsId}
          domeId={domeId}
          telescopeId={telescopeId}
        />
      );
    }

    if (adjustedFormType === SUPPORTED_RESERVATION_TAB_FORM_TYPES.BY_CATELOG) {
      return (
        <ReservationByCatalog
          telescopeId={telescopeId}
          showPlaceOnHold={showHoldOneHourButtonWhenExpanded}
          showCancelHold={showCancelHoldButtonWhenExpanded}
          expires={expires}
          expireCallback={this.handleTimerExpiration}
          missionStart={missionStart}
          domeId={domeId}
          obsId={obsId}
          uniqueId={uniqueId}
          scheduledMissionId={scheduledMissionId}
        />
      );
    }

    if (adjustedFormType === SUPPORTED_RESERVATION_TAB_FORM_TYPES.BY_COORDINATE) {
      const { objectDec, objectRA, userHasReservation } = reservationOnHold.mission.missionList[0];

      return (
        <ReservationByCoordinate
          showPlaceOnHold={showHoldOneHourButtonWhenExpanded}
          showCancelHold={showCancelHoldButtonWhenExpanded}
          expires={expires}
          expireCallback={this.handleTimerExpiration}
          scheduledMissionId={scheduledMissionId}
          domeId={domeId}
          obsId={obsId}
          missionStart={missionStart}
          telescopeId={telescopeId}
          uniqueId={uniqueId}
          objectDec={objectDec}
          objectRA={objectRA}
          userHasReservation={userHasReservation}
          targetName={targetName}
        />
      );
    }

    return null;
  }

  buttonRenderedClasses(buttonFormType) {
    return classnames('action', {
      active: this.matchFormType(buttonFormType),
    });
  }

  getAvailableSlotText() {
    const DEFAULT = this.props.slotTitle;
    const RESERVING = 'Tell us where to aim this thing...';
    const { formOpen } = this.state;

    if (!formOpen) {
      return DEFAULT;
    }

    return RESERVING;
  }

  matchFormType(matchOnFormType) {
    const { uniqueId, telescopeSlots } = this.props;
    const reservationOnHold = getReservationOnHold(uniqueId, telescopeSlots.missions);
    if (reservationOnHold) {
      return reservationOnHold.mission.defaultFormType === matchOnFormType;
    }
    return false;
  }

  handleTimerExpiration = () => {
    /**
      Using userHasReservation to determine to cancel coordinate editing or
      if we are canceling the reservation flow
      */
    const { uniqueId, scheduledMissionId, userHasReservation } = this.props;

    if (userHasReservation) {
      this.props.actions.cancelEditCoordinateMission({ uniqueId });
    } else {
      this.props.actions.cancelReservationAndRefresh({
        uniqueId,
        scheduledMissionId,
      });
    }
  }

  cancelHoldOnMission = () => {
    const { actions, uniqueId, scheduledMissionId } = this.props;
    actions.cancelReservation({
      uniqueId,
      scheduledMissionId,
    });
  }

  cancelEditingMission() {
    const { actions, uniqueId, scheduledMissionId, missionIndex } = this.props;
    actions.cancelEditMission({ uniqueId, scheduledMissionId, missionIndex });
  }

  handleReservationTypeClick = (newFormType) => {
    /**
      when the next form type is the the same as the formType
      that is already set, then we toggle the form to none
      and close the menu
    */
    const { formType } = this.state;
    const {
      scheduledMissionId,
      uniqueId,
      telescopeSlots,
      actions,
      userHasHold,
      userHoldType,
    } = this.props;

    // this is a lookup of the reservation to see if the user is already viewing
    // this timeslot
    const reservation = getReservationOnHold(uniqueId, telescopeSlots.missions);

    // handle placing the timeslot on hold
    if (!reservation) {
      actions.grabTelescopeSlot({
        defaultFormType: newFormType,
        scheduledMissionId,
        uniqueId,
        grabType: 'notarget',
        finalizeReservation: userHasHold,
      });
    } else {
      // handle setting the new form type
      const { userHasReservation } = reservation.mission.missionList[0];
      if (newFormType === SUPPORTED_RESERVATION_TAB_FORM_TYPES.NONE) {
        if (userHasReservation) {
          this.cancelEditingMission();
        } else {
          this.cancelHoldOnMission();
        }
      } else {
        this.props.actions.changeFormType({ formType: newFormType, uniqueId });
      }
    }
  }

  get activeMission() {
    const { uniqueId, telescopeSlots } = this.props;
    return getReservationOnHold(uniqueId, telescopeSlots.missions);
  }

  render() {
    const {
      missionStart,
      showBrowseButton,
      showCatalogButton,
      showCoordinateButton,
      showSlotTimes,
      slotIconURL,
      uniqueId,
      telescopeSlots,
    } = this.props;

    const templateContent = {
      missionAvailable: false,
      expires: undefined,
      explanation: '',
      missionOnHold: false,
    };

    const reservationOnHold = getReservationOnHold(uniqueId, telescopeSlots.missions);

    if (reservationOnHold) {
      Object.assign(
        templateContent,
        reservationOnHold.mission.missionList[0],
      );
    }

    const containerClassnames = classnames('telescope-listings-item-inline-reservation available', {
      expanded: templateContent.missionAvailable,
    });

    return (
      <li className={containerClassnames}>

        <div className="above-the-fold-content clearfix">
          <div className="content">
            <div className="close-button">
              <button onClick={() => { this.handleReservationTypeClick(SUPPORTED_RESERVATION_TAB_FORM_TYPES.NONE); }} className="action">
                <span className="fa fa-close" />
              </button>
            </div>

            <div className="col-xs-2">
              {
                showSlotTimes ?
                  <MissionTime
                    startTime={missionStart}
                  /> : null
              }
            </div>

            <div className="col-xs-4 slot-description">
              <img className="slot-logo" src={slotIconURL} height="40" alt="" />
              <h4 className="slot-name">{this.getAvailableSlotText()}</h4>
            </div>

            <div className="col-xs-6 reservation-options-content">
              <ul className="reservation-options">
                {
                  showBrowseButton ?
                    <li className="option">
                      <button
                        onClick={() => { this.handleReservationTypeClick(SUPPORTED_RESERVATION_TAB_FORM_TYPES.BY_OBJECTS); }}
                        className={this.buttonRenderedClasses(SUPPORTED_RESERVATION_TAB_FORM_TYPES.BY_OBJECTS)}
                      >
                        Popular Objects
                      </button>
                    </li> : null
                }

                {
                  showCatalogButton ?
                    <li className="option">
                      <button
                        onClick={(event) => {this.handleReservationTypeClick(SUPPORTED_RESERVATION_TAB_FORM_TYPES.BY_CATELOG)}}
                        className={this.buttonRenderedClasses(SUPPORTED_RESERVATION_TAB_FORM_TYPES.BY_CATELOG)}
                      >
                          Select by Catalog #
                      </button>
                    </li> : null
                }

                {
                  showCoordinateButton ?
                    <li className="option">
                      <button
                        onClick={(event) => {this.handleReservationTypeClick(SUPPORTED_RESERVATION_TAB_FORM_TYPES.BY_COORDINATE)}}
                        className={this.buttonRenderedClasses(SUPPORTED_RESERVATION_TAB_FORM_TYPES.BY_COORDINATE)}
                      >
                        Enter Coordinates
                      </button>
                    </li> : null
                }
              </ul>
            </div>
          </div>
        </div>

        {
          templateContent.missionAvailable ? this.renderForm() : null
        }
      </li>
    );
  }
}

const { string, number, bool } = PropTypes;
AvailableMission.propTypes = {
  telescopeId: string.isRequired,
  missionIndex: number.isRequired,

  missionStart: number.isRequired,

  showHoldOneHourButtonWhenExpanded: bool.isRequired,
  showCancelHoldButtonWhenExpanded: bool.isRequired,

  showCancelXWhenExpanded: bool.isRequired,
  showEditCoordinatesButton: bool.isRequired,
  showFinishReservationButton: bool.isRequired,

  showBrowseButton: bool.isRequired,
  showCatalogButton: bool.isRequired,
  showCoordinateButton: bool.isRequired,

  showSlotTimes: bool.isRequired,

  slotIconURL: string.isRequired,
  slotTitle: string.isRequired,

  userHasHold: bool.isRequired,
  userHoldType: string.isRequired,

  uniqueId: string.isRequired,
  scheduledMissionId: number.isRequired,
};

export default AvailableMission;
