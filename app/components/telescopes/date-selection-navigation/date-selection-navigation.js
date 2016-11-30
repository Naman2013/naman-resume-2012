import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import moment from 'moment-timezone';
import classnames from 'classnames';

import style from './date-selection-navigation.scss';

const MIN_DAYS = 0;
const MAX_DAYS = 7;

class DateSelectionNavigation extends Component {

  constructor(props) {
    super(props);

    this.state = {
      progressPast: false,
      progressFuture: true,
    };
  }

  componentWillMount() {
    // TODO: validate whether or not the date provided is not in the past!!!
    this.validateCurrentDate();
  }

  componentWillUpdate() {
    console.log('component updating...');
    // TODO: validate whether or not the date provided is not in the past!!!
    this.validateCurrentDate();
  }

  validateCurrentDate() {
    // if the date is before today, set it to today
    // if the date is too far in the future, set it to the max future
    const currentDate = moment(this.props.currentDate, 'YYYY-MM-DD');
    const today = moment();
    let updatedState = {
      progressPast: true,
      progressFuture: true,
    };

    // if the date is today or before today...
    if(currentDate.diff(today, 'days') <= 0) {
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

    this.setState(updatedState);
  }

  render() {

    // TODO: on click of one of the arrows, LINK to the same page with the new date

    const { progressPast, progressFuture } = this.state;
    const currentTime = moment(this.props.currentDate).format('dddd, MMMM D, YYYY');
    // Wednesday, August 11, 2016
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
          <button className="button">
            <i className={progressPastStyle}></i> Back
          </button>
        </div>

        <div className="current-date-content">
          <h3 className="title">The night of</h3>
          <p className="current-time">{currentTime}</p>
          <h5 className="last-updated">Last updated 21 seconds ago.</h5>
        </div>

        <div className="progress-time-action">
          <button className="button">
            Next Day <i className={progressFutureStyle}></i>
          </button>
        </div>

      </div>
    );
  }
}

DateSelectionNavigation.defaultProps = {
  currentDate: '2016-11-29',
};

DateSelectionNavigation.propTypes = {
  currentDate: PropTypes.string,
};

export default DateSelectionNavigation;
