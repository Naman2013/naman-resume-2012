import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment-timezone';
import isEmpty from 'lodash/isEmpty';

import { cancelMissionSlot, reserveMissionSlot, updateReservation, missionGetCards } from '../../../modules/Missions';
import { setTags, resetClientTagData } from '../../../modules/tag-management/Tags';
import MissionTags from '../../common/tags/mission-tags';
import NewMissionReservationSuccess from './new-mission-reservation-success';
import ReservationError from './reservation-error';
import InlineCountdown from '../../common/inline-countdown/inline-countdown';
import styles from '../mission-modals.scss';

const mapStateToProps = ({ missions }) => ({
  currentMissionSlot: missions.currentMissionSlot,
  missionSlotJustReserved: missions.missionSlotJustReserved,
  previousMissionSlotReservation: missions.previousMissionSlotReservation,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    cancelMissionSlot,
    reserveMissionSlot,
    updateReservation,
    setTags,
    resetClientTagData,
    missionGetCards,
  }, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
class ReserveConfirm extends Component {

  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
    this.handleCloseModalClick = this.handleCloseModalClick.bind(this);
    this.cancelMissionAndCloseModal = this.cancelMissionAndCloseModal.bind(this);
  }

  componentWillMount() {
    this.props.actions.resetClientTagData();
  }

  onSubmit(event) {
    event.preventDefault();
    const { callSource, reservationType } = this.props.currentMissionSlot;
    const currentMission = this.props.currentMissionSlot.missionList[0];
    const objective = '';

    // handle the reservation...
    if (reservationType === 'UPDATE') {
      // update existing reservation
      this.props.actions.updateReservation({
        callSource,
        ...currentMission, // allowing the currentMission to overwrite the callSource
        objective,
        objectTitle: currentMission.title,
      });
    } else {
      // make a new reservation
      this.props.actions.reserveMissionSlot({
        callSource,
        ...currentMission, // allowing the currentMission to overwrite the callSource
        objective,
        objectTitle: currentMission.title,
      });
    }
  }

  cancelMissionSlot() {
    const { currentMissionSlot } = this.props;
    const {
      scheduledMissionId,
      uniqueId,
    } = currentMissionSlot.missionList[0];

    const { callSource } = currentMissionSlot;

    this.props.actions.cancelMissionSlot({
      scheduledMissionId,
      uniqueId,
      callSource,
      grabType: 'notarget',
    });

    this.props.actions.missionGetCards();
  }

  cancelMissionAndCloseModal() {
    const { closeModal } = this.props;
    this.cancelMissionSlot();
    closeModal();
  }

  handleCloseModalClick(event) {
    event.preventDefault();
    this.cancelMissionAndCloseModal();
  }

  /**
    @handleMissionReservationResponse
    deals with displaying success or error templates based on the
    the current state
  */
  handleMissionReservationResponse() {
    const { currentMissionSlot, previousMissionSlotReservation, closeModal } = this.props;
    const { callSource } = currentMissionSlot;
    const { apiError, errorCode, missionCount } = previousMissionSlotReservation;
    if (apiError || missionCount === 0) {
      return (
        <ReservationError
          closeModal={closeModal}
        />
      );
    }

    const missionData = previousMissionSlotReservation.missionList[0];
    const {
      explanation,
      missionAvailable,
      tip,
    } = missionData;

    /**
      fetching bits of the mission information from the currentMissionSlot that are missing from
      the response from reserveMission
    */
    const { telescopeName } = currentMissionSlot.missionList[0];

    if (!missionAvailable) {
      return (
        <ReservationError
          errorCode={errorCode}
          message={explanation}
          closeModal={closeModal}
        />
      );
    }

    return (
      <NewMissionReservationSuccess
        closeModal={closeModal}
        missionStartTime={missionData.missionStart}
        missionTitle={missionData.title}
        objectIconURL={missionData.objectIconURL}
        telescopeName={telescopeName}
        tip={tip}
        callSource={callSource}
      />
    );
  }

  renderModalContent() {
    const { currentMissionSlot, missionSlotJustReserved, closeModal } = this.props;
    const missionData = currentMissionSlot.missionList[0];
    const { explanation, missionAvailable, missionStart, title } = missionData;

    const formattedUTCDate = new Date(missionStart * 1000);
    const EST_start = moment.tz(formattedUTCDate, 'America/New_York').format('dddd, MMMM Do');
    const EST_start_time = moment.tz(formattedUTCDate, 'America/New_York').format('h:mma z');
    const PST_start_time = moment.tz(formattedUTCDate, 'America/Los_Angeles').format('h:mma z');
    const UTC_start_time = moment.utc(formattedUTCDate).format('HH:mm z');

    const inlineButtonRowStyle = {
      'width': '60%',
      'margin': '0 auto 20px auto',
    };

    if (!missionAvailable) {
      return (
        <ReservationError
          closeModal={closeModal}
          message={explanation}
        />
      );
    }

    if (missionSlotJustReserved) {
      return this.handleMissionReservationResponse();
    }

    return (
      <div>
        <div className="title-bar">
          <div className="icon"><img width="25" height="25" src="https://vega.slooh.com/icons/reservations/stopwatch.svg" /></div>
          <h3 className="title">
            Please complete your reservation form within <InlineCountdown startTime={missionData.expires} exitAction={this.cancelMissionAndCloseModal} />
          </h3>
        </div>

        <div className="modal-header">
          <h1 className="title-secondary">You’re reserving the {missionData.telescopeName} telescope to see:</h1>
          <img height="50" className={styles.cardIcon} src={missionData.objectIconURL} />
          <h2 className="mission-title">{ missionData.title }</h2>
        </div>

        <div className="modal-body">
          <div className="mission-schedule">
            <h4>Mission Details:</h4>
            <p>{EST_start} &middot; {EST_start_time} &middot; {PST_start_time} &middot; {UTC_start_time}</p>
          </div>

          <div className="mission-tags">
            <MissionTags
              tagClass="mission"
              tagType="user"
              scheduledMissionId={missionData.scheduledMissionId}
            />
          </div>
        </div>

        <div className="modal-footer">
          <div style={inlineButtonRowStyle} className="button-row">
            <button className="btn-primary" onClick={this.handleCloseModalClick}>Sorry, Cancel This.</button>
            <button className="btn-primary" onClick={this.onSubmit}>Absolutely!</button>
          </div>
        </div>
      </div>
    );
  }

  render() {
    const { open, currentMissionSlot } = this.props;

    // validate whether or not we have a mission slot ready to render
    if (isEmpty(currentMissionSlot)) { return null; }

    return (
      <Modal show={open} className="missionModal reserveMissionModal">
        { this.renderModalContent() }
      </Modal>
    );
  }
}

export default ReserveConfirm;
