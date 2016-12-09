import React, { Component, PropTypes } from 'react';
import Timer from './common/timer';
import ReserveByCatalog from '../../../../pages/reserve/reserve-by-catalog';

class ReservationByCatalog extends Component {
  render() {
    const { showPlaceOnHold, showCancelHold } = this.props;
    return(
      <div className="reservation-form-container">
        <Timer />
        <ReserveByCatalog
          showPlaceOnHold={showPlaceOnHold}
          showCancelHold={showCancelHold}
        />
      </div>
    );
  }
}

ReservationByCatalog.defaultProps = {
  showPlaceOnHold: false,
  showCancelHold: false,
};

const { string, number, bool } = PropTypes;
ReservationByCatalog.propTypes = {
  showPlaceOnHold: bool,
  showCancelHold: bool,
};

export default ReservationByCatalog;
