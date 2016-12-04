import React, { Component, PropTypes } from 'react';
import styles from './reserve-by-object.scss';

class ReserveObjectSummary extends Component {
  render() {
    const {
      object,
      clearBrowse,
      scheduleMission,
      summaryActions } = this.props;

    if(!object) {
      return null;
    }

    return(
      <div className={styles.objectSummary}>
        <span className="title">{object.item.title}</span>

        <p>{object.item.summary}</p>

        <section className="actions-container">
          {
            summaryActions.placeOnHold ? <button className="btn-primary" onClick={clearBrowse}>Hold One Hour</button> : null
          }
          {
            summaryActions.resetForm ? <button className="btn-primary" onClick={clearBrowse}>Reset Browse</button> : null
          }

          {
            summaryActions.makeReservation ? <button className="btn-primary" onClick={scheduleMission}>Schedule Mission</button> : null
          }
        </section>
      </div>
    )
  }
}


ReserveObjectSummary.defaultProps = {
  summaryActions: {
    resetForm: true,
    makeReservation: true,
    placeOnHold: false,
  }
};

ReserveObjectSummary.propTypes = {
  summaryActions: PropTypes.shape({
    resetForm: PropTypes.bool,
    makeReservation: PropTypes.bool,
    placeOnHold: PropTypes.bool,
  }),
};

export default ReserveObjectSummary;
