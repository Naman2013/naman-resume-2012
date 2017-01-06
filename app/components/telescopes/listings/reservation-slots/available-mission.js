import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  grabTelescopeSlot,
  getReservationOnHold,
  cancelReservation,
  cancelReservationAndRefresh } from '../../../../modules/grab-telescope-slot/actions';

import MissionTime from '../partials/mission-time';
import ReservationByObjects from '../forms/reservation-by-objects';
import ReservationByCatalog from '../forms/reservation-by-catalog';
import ReservationByCoordinate from '../forms/reservation-by-coordinate';

const BY_OBJECTS = 'BY_OBJECTS';
const BY_CATELOG = 'BY_CATELOG';
const BY_COORDINATE = 'BY_COORDINATE';
const NONE = 'NONE';
const DEFAULT_FORM = BY_OBJECTS;

// hold types
const NO_TARGET = 'notarget';
const PLACE_HOLDER = 'placeholder';



const mapStateToProps = ({ telescopeSlots, missionSlotDates }) => ({
  telescopeSlots,
  missionSlotDates,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    cancelReservation,
    grabTelescopeSlot,
    cancelReservationAndRefresh,
  }, dispatch),
});



@connect(mapStateToProps, mapDispatchToProps)
class AvailableMission extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formType: NONE,
      formOpen: false,
    };

    this.cancelHoldOnMission = this.cancelHoldOnMission.bind(this);
    this.handleTimerExpiration = this.handleTimerExpiration.bind(this);
    this.handleReservationTypeClick = this.handleReservationTypeClick.bind(this);
  }

  handleReservationTypeClick(newFormType) {
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
      userHoldType } = this.props;
    const reservation = getReservationOnHold(uniqueId, telescopeSlots.missions);

    // handle placing the timeslot on hold
    if(!reservation) {
      actions.grabTelescopeSlot({
        scheduledMissionId,
        uniqueId,
        grabType: 'notarget',
        finalizeReservation: userHasHold,
      });
    }

    // handle displaying the appropriate form
    if(formType === newFormType || newFormType === NONE) {
      this.setState({
        formType: NONE,
      });
      this.cancelHoldOnMission();
    } else {
      this.setState({
        formType: newFormType,
      });
    }
  }

  toggleFormDisplay() {
    const { formOpen } = this.state;
    this.setState({
      formOpen: !formOpen,
    });
  }

  openFormDisplay() {
    if(!this.state.formOpen) {
      this.toggleFormDisplay();
    }
  }

  cancelHoldOnMission() {
    const { actions, uniqueId, scheduledMissionId } = this.props;
    actions.cancelReservation({
      uniqueId,
      scheduledMissionId,
    });
  }

  handleTimerExpiration() {
    this.actions.cancelReservationAndRefresh();
  }

  renderForm() {
    const { formType } = this.state;
    const {
      uniqueId,
      scheduledMissionId,
      showHoldOneHourButtonWhenExpanded,
      showCancelHoldButtonWhenExpanded,
      telescopeId,
      telescopeSlots,
      missionStart,
      missionSlotDates } = this.props;

    const reservationOnHold = getReservationOnHold(uniqueId, telescopeSlots.missions);

    if(!reservationOnHold) {
      return null;
    }

    const currentMissionOnHold = reservationOnHold.mission.missionList[0];
    const { expires } = currentMissionOnHold;
    const { domeId, obsId } = missionSlotDates.dateRangeResponse.dateList[0];

    switch(formType) {
      case BY_OBJECTS:
        return(
          <ReservationByObjects
            showPlaceOnHold={showHoldOneHourButtonWhenExpanded}
            showCancelHold={showCancelHoldButtonWhenExpanded}
            expires={expires}
            expireCallback={this.handleTimerExpiration}
          />
        );
        break;
      case BY_CATELOG:
        return(
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
        break;
      case BY_COORDINATE:
        return(
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
          />
        );
        break;
      case NONE:
        return(null);
        break;
      default:
        return(null);
    }
  }

  matchFormType(matchOnFormType) {
    return this.state.formType === matchOnFormType;
  }

  buttonRenderedClasses(buttonFormType) {
    return classnames('action', {
      'active': this.matchFormType(buttonFormType),
    });
  }

  getAvailableSlotText() {
    const DEFAULT = this.props.slotTitle;
    const RESERVING = 'Tell us where to aim this thing...';
    const { formOpen } = this.state;

    if(!formOpen) {
      return DEFAULT;
    }

    return RESERVING;
  }

  render() {
    const { formType, formOpen } = this.state;
    const {
      missionStart,
      showBrowseButton,
      showCatalogButton,
      showCoordinateButton,
      showSlotTimes,
      slotIconURL,
      uniqueId,
      telescopeSlots } = this.props;

    const templateContent = {
      missionAvailable: false,
      expires: undefined,
      explanation: '',
      missionOnHold: false,
    };

    const reservationOnHold = getReservationOnHold(uniqueId, telescopeSlots.missions);

    if(reservationOnHold) {
      Object.assign(templateContent, reservationOnHold.mission.missionList[0], { missionOnHold: true, });
    }

    const containerClassnames = classnames('telescope-listings-item-inline-reservation available', {
      'expanded': templateContent.missionAvailable,
    });

    return(
      <li className={containerClassnames}>

        <div className="above-the-fold-content clearfix">
          <div className="content">
            <div className="close-button">
              <button onClick={(event) => {this.handleReservationTypeClick(NONE)}} className="action">
                <span className="fa fa-close"></span>
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
              <img className="slot-logo" src={slotIconURL} height="40" alt=""/>
              <h4 className="slot-name">{this.getAvailableSlotText()}</h4>
            </div>

            <div className="col-xs-6 reservation-options-content">
              <ul className="reservation-options">
                {
                  showBrowseButton ?
                  <li className="option">
                    <button
                      onClick={(event) => {this.handleReservationTypeClick(BY_OBJECTS)}}
                      className={this.buttonRenderedClasses(BY_OBJECTS)}
                    >
                      Browse Objects
                    </button>
                  </li> : null
                }

                {
                  showCatalogButton ?
                  <li className="option">
                    <button
                      onClick={(event) => {this.handleReservationTypeClick(BY_CATELOG)}}
                      className={this.buttonRenderedClasses(BY_CATELOG)}
                      >
                        Select by Catalog #
                    </button>
                  </li> : null
                }

                {
                  showCoordinateButton ?
                  <li className="option">
                    <button
                      onClick={(event) => {this.handleReservationTypeClick(BY_COORDINATE)}}
                      className={this.buttonRenderedClasses(BY_COORDINATE)}
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
          this.renderForm()
        }
      </li>
    );
  }
}

const { string, number, bool } = PropTypes;
AvailableMission.propTypes = {
  telescopeId: string.isRequired,

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
};

export default AvailableMission;
