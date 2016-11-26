import React, { Component, PropTypes } from 'react';

/**
  TODO: determine different displays based on error code?
*/

class ReservationError extends Component {
  render() {
    const { message } = this.props;

    return(
      <div>
        <div className="modal-header">
          <h1 className="title">Oops...</h1>
          <h2 className="title-secondary">There was a problem reserving your mission.</h2>
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

ReservationError.defaultProps = {
  message: `We are unable to determine the exact issue that occurred, please continue and try again.`,
};

ReservationError.propTypes = {
  errorCode: PropTypes.number,
  message: PropTypes.string,
};

export default ReservationError;
