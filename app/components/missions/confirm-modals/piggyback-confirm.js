import React, { Component, PropTypes } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styles from '../mission-modals.scss';
import moment from 'moment-timezone';
import NewMissionReservationSuccess from './new-mission-reservation-success';
import ReservationError from './reservation-error';
import { reservePiggyback, closeConfirmationModal } from '../../../modules/Piggyback';

const mapStateToProps = ({ piggyback }) => ({
  ...piggyback
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    reservePiggyback,
    closeConfirmationModal,
  }, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
class PiggyBackConfirm extends Component {
  constructor(props) {
    super(props);
    this.handleReservationClick = this.handleReservationClick.bind(this);
  }

  handleReservationClick(event) {
    event.preventDefault();
    this.props.actions.reservePiggyback();
  }

  handleMissionReservationResponse() {
    const { piggyback } = this.props;
    const { apiError, errorCode, missionCount } = piggyback;

    if(apiError || missionCount === 0) {
      return(
        <ReservationError
          closeModal={this.props.actions.closeConfirmationModal}
        />
      );
    }

    const currentMission = piggyback.missionList[0];
    const {
      missionStart,
      objectIconURL,
      title,
      obsName,
      telescopeName,
      missionAvailable,
      explanation,
      tip } = currentMission;

    if(!missionAvailable) {
      return(
        <ReservationError
          errorCode={errorCode}
          message={explanation}
          closeModal={this.props.actions.closeConfirmationModal}
        />
      );
    }

    return(
      <NewMissionReservationSuccess
        missionStartTime={missionStart}
        missionTitle={title}
        objectIconURL={objectIconURL}
        telescopeName={telescopeName}
        tip={tip}
        closeModal={this.props.actions.closeConfirmationModal}
      />
    );
  }

  render() {
    const { piggyback, reservationConfirmed, closeModal, open, currentCard } = this.props;

    if(!piggyback.hasOwnProperty('missionList')) { return null; }

    const currentMission = piggyback.missionList[0];
    const {
      missionStart,
      objectIconURL,
      title,
      obsName,
      telescopeName } = currentMission;

    // TODO: working on refactoring currentCard out of this component
    const { headline } = currentCard || '';

    const formattedUTCDate = new Date(missionStart * 1000);
    const EST_start = moment.tz(formattedUTCDate, 'America/New_York').format('dddd, MMMM Do');
    const EST_start_time = moment.tz(formattedUTCDate, 'America/New_York').format('h:mma z');
    const PST_start_time = moment.tz(formattedUTCDate, 'America/Los_Angeles').format('h:mma z');
    const UTC_start_time = moment.utc(formattedUTCDate).format('HH:mm z');

    const inlineButtonRowStyle = {
      'width': '60%',
      'margin': '0 auto 20px auto',
    };

    return (
      <Modal show={open} className={styles.missionModal}>
        {
          reservationConfirmed ?
            this.handleMissionReservationResponse()
          :
            <div>
              <div className="modal-header">
                <h1 className="title">Strap yourself in</h1>
                <h2 className="title-secondary">Your are joining a pre-scheduled mission to:</h2>
              </div>

              <div className="modal-body">
                <div className="mission-name">
                  <img height="50" className={styles.cardIcon} src={objectIconURL} />
                  <h4>{title}</h4>
                  <p className="headline">{headline}</p>
                </div>

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
                <div style={inlineButtonRowStyle} className="button-row">
                  <Button className="btn-primary" onClick={closeModal}>Sorry, Cancel This.</Button>
                  <Button className="btn-primary" onClick={ this.handleReservationClick }>Absolutely!</Button>
                </div>
              </div>
            </div>
        }
      </Modal>
    );
  }
}

PiggyBackConfirm.propTypes = {
  open: PropTypes.bool.isRequired,
  currentCard: PropTypes.shape({
    headline: PropTypes.string,
  }),
};

export default PiggyBackConfirm;
