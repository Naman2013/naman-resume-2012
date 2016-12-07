import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import moment from 'moment-timezone';
import classnames from 'classnames';
import { hashHistory } from 'react-router';
import _ from 'lodash';
import { fetchDateRanges } from '../../../modules/Reserve-By-Telescope';
import style from './date-selection-navigation.scss';

const MIN_DAYS = 0;
const MAX_DAYS = 7;

class DateSelectionNavigation extends Component {
  constructor(props) {
    super(props);

    this.handleProgressClick = this.handleProgressClick.bind(this);
    this.handlePreviousClick = this.handlePreviousClick.bind(this);
  }

  validateCurrentDate() {
    const currentDate = moment(this.props.reservationDate, 'YYYY-MM-DD');
    const today = moment();
    let updatedState = {
      progressPast: true,
      progressFuture: true,
    };

    // if the date is today or before today...
    if(currentDate.diff(today, 'hours') <= 0) {
      updatedState = {
        progressPast: false,
        progressFuture: true,
      };
    }

    // if the date is the max allowed or greater
    if(currentDate.diff(today, 'days') >= MAX_DAYS) {
      updatedState = {
        progressPast: true,
        progressFuture: false,
      };
    }

    return updatedState;
  }

  forwardToURL(newDate) {
    const newRoute = `${this.props.routeRoot}/${newDate}`;
    hashHistory.push(newRoute);
  }

  handleProgressClick(event) {
    event.preventDefault();
    const { progressPast, progressFuture } = this.validateCurrentDate();

    if(!progressFuture) { return; }

    const futureDate = moment(this.props.reservationDate).add(1, 'days').format('YYYY-MM-DD');
    this.forwardToURL(futureDate);
  }

  handlePreviousClick(event) {
    event.preventDefault();
    const { progressPast, progressFuture } = this.validateCurrentDate();

    if(!progressPast) { return; }

    const previousDate = moment(this.props.reservationDate).subtract(1, 'days').format('YYYY-MM-DD');
    this.forwardToURL(previousDate);
  }

  render() {

    const { progressPast, progressFuture } = this.validateCurrentDate();
    const currentTime = moment(this.props.reservationDate).format('dddd, MMMM D, YYYY');

    const progressPastStyle = classnames({
      'available': progressPast,
      'fa fa-chevron-circle-left': 1,
    });

    const progressFutureStyle = classnames({
      'available': progressFuture,
      'fa fa-chevron-circle-right': 1,
    });

    return (
      <div className="reserve-by-telescope-date-selection-navigation">

        <div className="progress-time-action">
          <button onClick={this.handlePreviousClick} className="button">
            <i className={progressPastStyle}></i> Back
          </button>
        </div>

        <div className="current-date-content">
          <h3 className="title">The night of</h3>
          <p className="current-time">{currentTime}</p>
          <h5 className="last-updated">Last updated 21 seconds ago.</h5>
        </div>

        <div className="progress-time-action">
          <button onClick={this.handleProgressClick} className="button">
            Next Day <i className={progressFutureStyle}></i>
          </button>
        </div>

      </div>
    );
  }
}

DateSelectionNavigation.defaultProps = {
  reservationDate: '2016-11-29',
};

DateSelectionNavigation.propTypes = {
  reservationDate: PropTypes.string,
  routeRoot: PropTypes.string,
  obsId: PropTypes.string.isRequired,
  telescopeId: PropTypes.string.isRequired,
  domeId: PropTypes.string.isRequired,
};

export default DateSelectionNavigation;
