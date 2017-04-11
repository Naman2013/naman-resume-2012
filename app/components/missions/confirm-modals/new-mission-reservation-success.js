import React, { Component, PropTypes } from 'react';
import moment from 'moment-timezone';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { missionGetCards } from '../../../modules/Missions';
import { refreshListings } from '../../../modules/grab-telescope-slot/actions';
import { resetBrowseByPopularObjects } from '../../../modules/browse-popular-objects/actions';

import styles from '../mission-modals.scss';

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    missionGetCards,
    refreshListings,
    resetBrowseByPopularObjects,
  }, dispatch),
});

@connect(null, mapDispatchToProps)
class NewMissionReservationSuccess extends Component {
  static propTypes = {
    closeModal: PropTypes.func.isRequired,
    missionStartTime: PropTypes.number.isRequired,
    missionTitle: PropTypes.string.isRequired,
    objectIconURL: PropTypes.string.isRequired,
    telescopeName: PropTypes.string.isRequired,
    callSource: PropTypes.string.isRequired,
  }

  flushReservationProcess = (event) => {
    event.preventDefault();

    // depending on the callsource, run the appropriate background actions
    const { callSource } = this.props;

    if (callSource === 'byTelescope') {
      this.props.actions.refreshListings();
    }

    if (callSource === 'recommends') {
      this.props.actions.missionGetCards();
    }

    if (callSource === 'byPopularObjects') {
      this.props.actions.resetBrowseByPopularObjects();
    }

    this.props.closeModal();
  }

  render() {
    const {
      closeModal,
      missionStartTime,
      missionTitle,
      tip,
      objectIconURL,
      telescopeName,
    } = this.props;

    const formattedUTCDate = new Date(missionStartTime * 1000);

    const EST_start = moment.tz(formattedUTCDate, 'America/New_York').format('dddd, MMMM Do');
    const EST_start_time = moment.tz(formattedUTCDate, 'America/New_York').format('h:mma z');
    const PST_start_time = moment.tz(formattedUTCDate, 'America/Los_Angeles').format('h:mma z');
    const UTC_start_time = moment.utc(formattedUTCDate).format('HH:mm z');

    return (
      <div>
        <div className="modal-header">
          <h1 className="title">Congratulations</h1>
          <h2 className="title-secondary">We&#8217;ve scheduled your mission to:</h2>
          <img height="50" className={styles.cardIcon} src={objectIconURL} />
          <h2 className="mission-title">{missionTitle}</h2>
          <p className="tips-and-tricks">
            <span className="highlight">Tip:</span> {tip}
          </p>
        </div>

        <div className="modal-body">
          <div className="mission-schedule">
            <h4>Mission Details:</h4>
            <p>
              {EST_start}<br />
              {EST_start_time} &middot; {PST_start_time} &middot; {UTC_start_time}<br />
              {telescopeName}
            </p>
          </div>
        </div>

        <div className="modal-footer">
          <div className="button-row">
            <button className="btn-primary" onClick={this.flushReservationProcess}>Got It, Thanks.</button>
          </div>

          {
            /**
              deferred for a later build
              see guide: https://docs.google.com/document/d/1ev1CmnIPv2UlA-PnDePjD5-odzt0yAf-euRFlAq5P24/edit

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
              */
          }
        </div>
      </div>
    );
  }
}

export default NewMissionReservationSuccess;
