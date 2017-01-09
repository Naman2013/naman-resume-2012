import React, { Component, PropTypes } from 'react';
import ReserveByObjects from '../../../../pages/reserve/reserve-by-objects';
import Timer from './common/timer';

class ReservationByObjects extends Component {
  render() {
    const { showMakeReservation, showPlaceOnHold, showCancelHold, expires, expireCallback } = this.props;
    return(
      <div className="reservation-form-container">
        <Timer startTime={expires} expireCallback={expireCallback} />
        <ReserveByObjects
          resetForm={false}
          makeReservation={showMakeReservation}
          placeOnHold={showPlaceOnHold}
          cancelHold={showCancelHold}
        />
      </div>
    );
  }
}

ReservationByObjects.defaultProps = {
  showMakeReservation: true,
  showPlaceOnHold: true,
  showCancelHold: false,
};

const { string, number, bool, func } = PropTypes;
ReservationByObjects.propTypes = {
  showMakeReservation: bool,
  showPlaceOnHold: bool,
  showCancelHold: bool,
  expires: number.isRequired,
  expireCallback: func.isRequired,
};

export default ReservationByObjects;
