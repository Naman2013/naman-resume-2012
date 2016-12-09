import React, { Component, PropTypes } from 'react';
import styles from './reserve-by-object.scss';

class ReserveObjectSummary extends Component {
  constructor(props) {
    super(props);
    this.handleCancelHold = this.handleCancelHold.bind(this);
    this.handleCreateHold = this.handleCreateHold.bind(this);
  }

  handleCancelHold(event) {
    event.preventDefault();
    console.log('TODO: handle cancel hold - reserve-by-object-summary');
  }

  handleCreateHold(event) {
    event.preventDefault();
    console.log('TODO: handle create hold - reserve-by-object-summary');
  }

  render() {
    const {
      object,
      clearBrowse,
      scheduleMission,
      resetForm,
      makeReservation,
      placeOnHold,
      cancelHold } = this.props;

    if(!object) {
      return null;
    }

    return(
      <div className={styles.objectSummary}>
        <span className="title">{object.item.title}</span>

        <p>{object.item.summary}</p>

        <section className="actions-container">
          {
            cancelHold ? <button className="btn-primary" onClick={this.handleCancelHold}>Cancel Hold</button> : null
          }
          {
            placeOnHold ? <button className="btn-primary" onClick={this.handleCreateHold}>Hold One Hour</button> : null
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
  cancelHold: false,
};

const { bool } = PropTypes;
ReserveObjectSummary.propTypes = {
  resetForm: bool,
  makeReservation: bool,
  placeOnHold: bool,
  cancelHold: bool,
};

export default ReserveObjectSummary;
