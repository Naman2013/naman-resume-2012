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
    };

    this.handleCloseForm = this.handleCloseForm.bind(this);
    this.handleReservationTypeClick = this.handleReservationTypeClick.bind(this);
  }

  handleCloseForm(event) {
    event.preventDefault();
    this.closeFormDisplay();
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

  closeFormDisplay() {
    if(this.props.formOpen) {
      this.props.toggleFormDisplay();
    }
  }

  openFormDisplay() {
    if(!this.props.formOpen) {
      this.props.toggleFormDisplay();
    }
  }

  renderForm() {
    const { formType } = this.state;

    switch(formType) {
      case BY_OBJECTS:
        return(<ReservationByObjects />);
        break;
      case BY_CATELOG:
        return(<ReservationByCatalog />);
        break;
      case BY_COORDINATE:
        return(<ReservationByCoordinate />);
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

  render() {
    const { formOpen } = this.props;
    const { formType } = this.state;

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
              <MissionTime />
            </div>

            <div className="col-xs-4 slot-description">
              <img className="slot-logo" src="assets/icons/alien-head.png" height="40" alt=""/>
              <span className="slot-name">This slot could be yours.</span>
            </div>

            <div className="col-xs-6 reservation-options-content">
              <ul className="reservation-options">
                <li className="option">
                  <button
                    onClick={(event) => {this.handleReservationTypeClick(BY_OBJECTS)}}
                    className={this.buttonRenderedClasses(BY_OBJECTS)}
                  >
                    Browser objects
                  </button>
                </li>
                <li className="option">
                  <button
                    onClick={(event) => {this.handleReservationTypeClick(BY_CATELOG)}}
                    className={this.buttonRenderedClasses(BY_CATELOG)}
                    >
                      Select by catelog #
                  </button>
                </li>
                <li className="option">
                  <button
                    onClick={(event) => {this.handleReservationTypeClick(BY_COORDINATE)}}
                    className={this.buttonRenderedClasses(BY_COORDINATE)}
                  >
                    Enter coordinate
                  </button>
                </li>
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

AvailableMission.defaultProps = {
  formOpen: false,
};

AvailableMission.propTypes = {
  toggleFormDisplay: PropTypes.func.isRequired,
  formOpen: PropTypes.bool.isRequired,
};

export default AvailableMission;
