import React, { Component, PropTypes } from 'react';
import moment from 'moment-timezone';

import styles from '../mission-modals.scss';

class NewMissionReservationSuccess extends Component {
  render() {

    const { closeModal, missionStartTime, missionTitle, objectIconURL } = this.props;

    const EST_start = moment.tz(missionStartTime, 'America/New_York').format('dddd, MMMM Do');
    const EST_start_time = moment.tz(missionStartTime, 'America/New_York').format('h:mma z');
    const PST_start_time = moment.tz(missionStartTime, 'America/Los_Angeles').format('h:mma z');
    const UTC_start_time = moment(missionStartTime).format('HH:mm');

    return(
      <div>
        <div className="modal-header">
          <h1 className="title">Congratulations</h1>
          <h2 className="title-secondary">We've scheduled your mission to:</h2>
          <img className={styles.cardIcon} src={ objectIconURL } />
          <h2 className="mission-title">{ missionTitle }</h2>
          <p className="tips-and-tricks">
            <span className="highlight">Tip:</span> All Images from this mission will be automatically
            saved to your "My Pictures area" within the Telescope menu.
          </p>
        </div>

        <div className="modal-body">
          <div className="mission-schedule">
            <h4>Mission Details:</h4>
            <p>
              { EST_start }<br />
              { EST_start_time } &middot; { PST_start_time } &middot; { UTC_start_time } UTC
            </p>
          </div>
        </div>

        <div className="modal-footer">
          <div className="button-row">
            <button className="btn-primary" onClick={closeModal}>Got It, Thanks.</button>
          </div>

          <div className="dark-modal-footer-container">
            <div className="dark-modal-footer-content">
              <ul className="dark-modal-footer-bar">
                <li className="item text-container"><h4 className="title">Click to tell your friends about your new mission:</h4></li>
                <li className="item action-container"><a className="action" href="#"><span className="fa fa-facebook-square"></span></a></li>
                <li className="item action-container"><a className="action" href="#"><span className="fa fa-twitter-square"></span></a></li>
                <li className="item action-container"><a className="action" href="#"><span className="fa fa-google-plus-square"></span></a></li>
                <li className="item action-container"><a className="action" href="#"><span className="fa fa-envelope-square"></span></a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

NewMissionReservationSuccess.propTypes = {
  closeModal: PropTypes.func.isRequired,
  missionStartTime: PropTypes.number.isRequired,
  missionTitle: PropTypes.string.isRequired,
  objectIconURL: PropTypes.string.isRequired,
};

export default NewMissionReservationSuccess;
