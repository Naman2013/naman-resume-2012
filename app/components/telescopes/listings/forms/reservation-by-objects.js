import React, { Component, PropTypes } from 'react';

class ReservationByObjects extends Component {
  render() {
    return(
      <div className="reservation-form-container">

        <div className="timer-container">
          <h5 className="timer">
            <span className="fa fa-clock-o"></span> Please complete your reservation form within 04:47
          </h5>
        </div>

        <div className="form">
          <h3 className="title">Select Category</h3>
        </div>

      </div>
    );
  }
}

export default ReservationByObjects;
