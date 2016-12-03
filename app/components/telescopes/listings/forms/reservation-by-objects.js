import React, { Component, PropTypes } from 'react';

import Timer from './common/timer';

class ReservationByObjects extends Component {
  render() {
    return(
      <div className="reservation-form-container">

        <Timer />

        <div className="form">
          <h3 className="title">Select Category</h3>
        </div>

      </div>
    );
  }
}

export default ReservationByObjects;
