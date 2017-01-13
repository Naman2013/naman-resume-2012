import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import styles from './reserve-by-object.scss';

class ReserveObjectSummary extends Component {
  render() {
    const {
      objectTitle,
      objectSummary,
      handleClearBrowse,
      handleScheduleMission,
      handlePlaceHold,
      handleCancelHold,
      resetForm,
      makeReservation,
      placeOnHold,
      cancelHold } = this.props;

    return (
      <div className={styles.objectSummary}>
        <span className="title">{objectTitle}</span>

        <p>{objectSummary}</p>

        <section className="actions-container">
          {
            cancelHold ? <button className="btn-primary" onClick={handleCancelHold}>Cancel Hold</button> : null
          }
          {
            placeOnHold ? <button className="btn-primary" onClick={handlePlaceHold}>Hold One Hour</button> : null
          }
          {
            resetForm ? <button className="btn-primary" onClick={handleClearBrowse}>Reset Browse</button> : null
          }
          {
            makeReservation ? <button className="btn-primary" onClick={handleScheduleMission}>Schedule Mission</button> : null
          }
        </section>
      </div>
    );
  }
}


ReserveObjectSummary.defaultProps = {
  resetForm: true,
  makeReservation: true,
  placeOnHold: false,
  cancelHold: false,
  handleClearBrowse: () => { _.noop(); },
  handleScheduleMission: () => { _.noop(); },
};

const { bool, string, func } = PropTypes;
ReserveObjectSummary.propTypes = {
  objectTitle: string.isRequired,
  objectSummary: string.isRequired,
  handleClearBrowse: func,
  handleScheduleMission: func,
  // handlePlaceHold: func,
  // handleCancelHold: func,
  resetForm: bool,
  makeReservation: bool,
  placeOnHold: bool,
  cancelHold: bool,
};

export default ReserveObjectSummary;
