import React, { Component, PropTypes } from 'react';
import styles from './reserve-by-object.scss';

class ReserveObjectSummary extends Component {
  render() {
    const { object, clearBrowse, scheduleMission } = this.props;

    if(!object) {
      return null;
    }

    return(
      <div className={styles.objectSummary}>
        <span className="title">{object.item.title}</span>

        <p>{object.item.summary}</p>

        <section>
          <a className="btn-primary" onClick={scheduleMission}>Schedule Mission</a>
          <a className="btn-primary" onClick={clearBrowse}>Reset Browse</a>
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

export default ReserveObjectSummary;
