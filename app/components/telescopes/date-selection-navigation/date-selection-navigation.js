import React, { Component } from 'react';
import { Link } from 'react-router';

import style from './date-selection-navigation.scss';

class DateSelectionNavigation extends Component {

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

export default DateSelectionNavigation;
