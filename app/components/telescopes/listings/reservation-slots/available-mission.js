import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

import MissionTime from '../partials/mission-time';
import ReservationByObjects from '../forms/reservation-by-objects';
import ReservationByCatalog from '../forms/reservation-by-catalog';
import ReservationByCoordinate from '../forms/reservation-by-coordinate';

const BY_OBJECTS = 'BY_OBJECTS';
const BY_CATELOG = 'BY_CATELOG';
const BY_COORDINATE = 'BY_COORDINATE';
const NONE = 'NONE';

class AvailableMission extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formType: NONE,
      formOpen: false,
    };

    this.handleCloseForm = this.handleCloseForm.bind(this);
    this.handleReservationTypeClick = this.handleReservationTypeClick.bind(this);
  }

  handleReservationTypeClick(newFormType) {
    const { formType } = this.state;

    /**
      when the next form type is the the same as the formType
      that is already set, then we toggle the form to none
      and close the menu
    */
    if(formType === newFormType || newFormType === NONE) {
      this.setState({
        formType: NONE,
      });
      this.closeFormDisplay();
    }

    if(formType != newFormType) {
      this.setState({
        formType: newFormType,
      });
      this.openFormDisplay();
    }
  }

  handleCloseForm(event) {
    event.preventDefault();
    this.closeFormDisplay();
  }

  toggleFormDisplay() {
    const { formOpen } = this.state;
    this.setState({
      formOpen: !formOpen,
    });
  }

  closeFormDisplay() {
    if(this.state.formOpen) {
      this.toggleFormDisplay();
    }
  }

  openFormDisplay() {
    if(!this.state.formOpen) {
      this.toggleFormDisplay();
    }
  }

  renderForm() {
    const { formType } = this.state;
    const {
      showHoldOneHourButtonWhenExpanded,
      showCancelHoldButtonWhenExpanded,
      telescopeId,
    } = this.props;

    switch(formType) {
      case BY_OBJECTS:
        return(
          <ReservationByObjects
            showPlaceOnHold={showHoldOneHourButtonWhenExpanded}
            showCancelHold={showCancelHoldButtonWhenExpanded}
          />
        );
        break;
      case BY_CATELOG:
        return(
          <ReservationByCatalog
            telescopeId={telescopeId}
            showPlaceOnHold={showHoldOneHourButtonWhenExpanded}
            showCancelHold={showCancelHoldButtonWhenExpanded}
          />
        );
        break;
      case BY_COORDINATE:
        return(
          <ReservationByCoordinate
            showPlaceOnHold={showHoldOneHourButtonWhenExpanded}
            showCancelHold={showCancelHoldButtonWhenExpanded}
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
    return classnames({
      'action': 1,
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

    if(formOpen) {
      return RESERVING;
    }
  }

  render() {
    const { formType, formOpen } = this.state;
    const {
      missionStart,
      showBrowseButton,
      showCatalogButton,
      showCoordinateButton,
      showSlotTimes,
      slotIconURL } = this.props;

    const containerClassnames = classnames({
      'telescope-listings-item-inline-reservation': 1,
      'available': 1,
      'expanded': formOpen,
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
};

export default AvailableMission;
