import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import moment from 'moment-timezone';
import classnames from 'classnames';

import style from './date-selection-navigation.scss';

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
  }

  componentWillUpdate() {
    console.log('component updating...');
    // TODO: validate whether or not the date provided is not in the past!!!
  }

  validateCurrentDate() {
    // if the date is before today, set it to today
    // if the date is too far in the future, set it to the max future
  }

  render() {
    return (
      <div className="reserve-by-telescope-date-selection-navigation">

        <div className="progress-time-action">
          <button className="button">
            <i className="fa fa-chevron-circle-left"></i> Back
          </button>
        </div>

        <div className="current-date-content">
          <h3 className="title">The night of</h3>
          <p className="current-time">Wednesday, August 11, 2016</p>
          <h5 className="last-updated">Last updated 21 seconds ago.</h5>
        </div>

        <div className="progress-time-action">
          <button className="button">
            Next Day <i className="fa fa-chevron-circle-right"></i>
          </button>
        </div>

      </div>
    );
  }
}

DateSelectionNavigation.defaultProps = {
  currentDate: '1480464552',
};

DateSelectionNavigation.propTypes = {
  currentDate: PropTypes.string,
};

export default DateSelectionNavigation;
