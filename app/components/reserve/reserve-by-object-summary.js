import React, { Component, PropTypes } from 'react';
import styles from './reserve-by-object.scss';

class ReserveObjectSummary extends Component {
  render() {
    const {
      object,
      clearBrowse,
      scheduleMission,
      resetForm,
      makeReservation,
      placeOnHold } = this.props;

    if(!object) {
      return null;
    }

    console.log(this.props);

    return(
      <div className={styles.objectSummary}>
        <span className="title">{object.item.title}</span>

        <p>{object.item.summary}</p>

        <section className="actions-container">
          {
            placeOnHold ? <button className="btn-primary" onClick={clearBrowse}>Hold One Hour</button> : null
          }
          {
            resetForm ? <button className="btn-primary" onClick={clearBrowse}>Reset Browse</button> : null
          }
          {
            makeReservation ? <button className="btn-primary" onClick={scheduleMission}>Schedule Mission</button> : null
          }
        </section>
      </div>
    )
  }
}


ReserveObjectSummary.defaultProps = {
  resetForm: true,
  makeReservation: true,
  placeOnHold: false,
};

ReserveObjectSummary.propTypes = {
  resetForm: PropTypes.bool,
  makeReservation: PropTypes.bool,
  placeOnHold: PropTypes.bool,
};

export default ReserveObjectSummary;
