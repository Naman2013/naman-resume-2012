import React, { Component, PropTypes } from 'react';

const DEFAULT_ERROR_MESSAGE = `We are unable to determine the exact issue that occurred.`;
const DEFAULT_TITLE = `Oops...`;
const DEFAULT_SUBTITLE = `There was a problem reserving your mission.`;

class ReservationError extends Component {
  render() {

    const { message, title, subTitle, closeModal } = this.props;

    return(
      <div>
        <div className="modal-header">
          <h1 className="title">{title}</h1>
          <h2 className="title-secondary">{subTitle}</h2>
        </div>

        <div className="modal-body">
          <div className="mission-schedule">
            <h4>Details:</h4>
            <p>{ message ? message : DEFAULT_ERROR_MESSAGE }</p>
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
