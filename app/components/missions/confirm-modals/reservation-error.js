import React, { Component } from 'react';
import PropTypes from 'prop-types';
import reservationApiErrorCodes from '../../../constants/reservation-api-error-codes';

/**
  NOTE:
  if the component is provided an error code,
  check if that error code is supported by the constant library
  and display the appropriate message from that collection

  business order:
  1. display content based on errorCode provided / default content if none provided
  2. display raw content provided by parent component
  3. display default content
*/

const DEFAULT_TITLE = `Oops...`;
const DEFAULT_SUBTITLE = `There was a problem reserving your mission.`;
const DEFAULT_ERROR_MESSAGE = `We are unable to determine the exact issue that occurred.`;

class ReservationError extends Component {
  composeErrorMessage() {
    const { message, title, subTitle, errorCode } = this.props;

    const errorMessage = {
      title,
      subTitle,
      message,
    };

    if(errorCode) {
      if(reservationApiErrorCodes.hadOwnProperty(errorCode)) {
        Object.assign(errorMessage, reservationApiErrorCodes[errorCode]);
      }
    }

    return errorMessage;
  }

  render() {
    const { title, subTitle, message } = this.composeErrorMessage();
    const { closeModal } = this.props;

    return(
      <div>
        <div className="modal-header">
          <h1 className="title">{title}</h1>
          <h2 className="title-secondary">{subTitle}</h2>
        </div>

        <div className="modal-body">
          <div className="mission-schedule">
            <h4>Details:</h4>
            <p>{message}</p>
          </div>
        </div>

        <div className="modal-footer">
          <div className="button-row">
            <button
              className="btn-primary"
              onClick={closeModal}
            >
              Return to Mission List
            </button>
          </div>
        </div>
      </div>
    );
  }
}

ReservationError.defaultProps = {
  title: DEFAULT_TITLE,
  subTitle: DEFAULT_SUBTITLE,
  message: DEFAULT_ERROR_MESSAGE,
};

ReservationError.propTypes = {
  errorCode: PropTypes.number,
  title: PropTypes.string,
  subTitle: PropTypes.string,
  message: PropTypes.string,
  closeModal: PropTypes.func.isRequired,
};

export default ReservationError;
