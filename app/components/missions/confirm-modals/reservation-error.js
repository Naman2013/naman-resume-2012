import React, { Component, PropTypes } from 'react';

class ReservationError extends Component {
  render() {
    return(
      <div>
        <div className="modal-header">
          <h1 className="title">Congratulations</h1>
          <h2 className="title-secondary">Oops...</h2>
          <h2 className="mission-title">There was a problem reserving your mission.</h2>
        </div>

        <div className="modal-body">
          <div className="mission-schedule">
            <h4>Details:</h4>
            <p>{message}</p>
          </div>
        </div>

        <div className="modal-footer">
          <div className="button-row">
            <button className="btn-primary" onClick={closeModal}>Return to Mission List</button>
          </div>
        </div>
      </div>
    );
  }
}

export default ReservationError;
