import React, { Component, PropTypes } from 'react';
import Timer from './common/timer';
import ReserveByCatalog from '../../../../pages/reserve/reserve-by-catalog';

class ReservationByCatalog extends Component {
  render() {
    return(
      <div className="reservation-form-container">
        <Timer />
        <ReserveByCatalog />
      </div>
    );
  }
}

export default ReservationByCatalog;
