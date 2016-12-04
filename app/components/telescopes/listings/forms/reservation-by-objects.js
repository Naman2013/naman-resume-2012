import React, { Component, PropTypes } from 'react';
import ReserveByObjects from '../../../../pages/reserve/reserve-by-objects';
import Timer from './common/timer';

class ReservationByObjects extends Component {
  render() {
    return(
      <div className="reservation-form-container">
        <Timer />
        <ReserveByObjects
          resetForm={false}
          makeReservation={true}
          placeOnHold={true}
        />
      </div>
    );
  }
}

export default ReservationByObjects;
