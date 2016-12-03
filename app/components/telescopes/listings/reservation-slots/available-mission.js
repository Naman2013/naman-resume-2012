import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

import MissionTime from '../partials/mission-time';
import ReservationByObjects from '../forms/reservation-by-objects';
import ReservationByCatalog from '../forms/reservation-by-catalog';

const BY_OBJECTS = 'BY_OBJECTS';
const BY_CATELOG = 'BY_CATELOG';
const BY_COORDINATE = 'BY_COORDINATE';

class AvailableMission extends Component {

  constructor(props) {
    super(props);

    this.state = {
      formType: BY_OBJECTS,
    };

    this.handleBrowserObjectsClick = this.handleBrowserObjectsClick.bind(this);
    this.handleCloseForm = this.handleCloseForm.bind(this);
    this.handleReservationTypeClick = this.handleReservationTypeClick.bind(this);
  }

  handleBrowserObjectsClick(event) {
    event.preventDefault();

    this.setState({
      formType: BY_OBJECTS,
    });

    // TODO: set internal state for browse by objects?
    this.props.toggleFormDisplay();
  }

  handleCloseForm(event) {
    event.preventDefault();
    this.props.toggleFormDisplay();
  }

  handleReservationTypeClick(formType) {
    this.setState({
      formType,
    });

    this.openFormDisplay();
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
      default:
        return(<ReservationByObjects />);
    }
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
              <button onClick={this.handleCloseForm} className="action">
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
                    className="action"
                  >
                    Browser objects
                  </button>
                </li>
                <li className="option">
                  <button
                    onClick={(event) => {this.handleReservationTypeClick(BY_CATELOG)}}
                    className="action"
                    >
                      Select by catelog #
                  </button>
                </li>
                <li className="option">
                  <button
                    onClick={(event) => {this.handleReservationTypeClick(BY_COORDINATE)}}
                    className="action"
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
