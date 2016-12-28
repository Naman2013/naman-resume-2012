import React, { Component, PropTypes } from 'react';
import Timer from './common/timer';
import ReserveByCatalog from '../../../../pages/reserve/reserve-by-catalog';

class ReservationByCatalog extends Component {
  render() {
    const {
      telescopeId,
      showPlaceOnHold,
      showCancelHold,
      expires,
      expireCallback,
      missionStart,
      obsId,
      domeId } = this.props;

    return(
      <div className="reservation-form-container">
        <Timer startTime={expires} expireCallback={expireCallback} />
        <ReserveByCatalog
          telescopeId={telescopeId}
          showPlaceOnHold={showPlaceOnHold}
          showCancelHold={showCancelHold}
          missionStart={missionStart}
          obsId={obsId}
          domeId={domeId}
        />
      </div>
    );
  }
}

ReservationByCatalog.defaultProps = {
  showPlaceOnHold: false,
  showCancelHold: false,
};

const { string, number, bool, func } = PropTypes;
ReservationByCatalog.propTypes = {
  showPlaceOnHold: bool,
  showCancelHold: bool,
  telescopeId: string.isRequired,
  expires: number.isRequired,
  expireCallback: func.isRequired,
  missionStart: number.isRequired,
  obsId: string.isRequired,
  domeId: number.isRequired,
};

export default ReservationByCatalog;
