import React, { Component, PropTypes } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment-timezone';
import _ from 'lodash';

import { cancelMissionSlot, reserveMissionSlot, missionGetCards } from '../../../modules/Missions';
import { setTags, resetClientTagData } from '../../../modules/tag-management/Tags';
import MissionTags from '../../common/tags/mission-tags';
import NewMissionReservationSuccess from './new-mission-reservation-success';
import ReservationError from './reservation-error';
import InlineCountdown from '../../common/inline-countdown/inline-countdown';
import styles from '../mission-modals.scss';

const mapStateToProps = ({ missions }) => ({
  currentMissionSlot: missions.currentMissionSlot,
  missionSlotJustReserved: missions.missionSlotJustReserved,
});

const mapDispatchToProps = ( dispatch ) => ({
  actions: bindActionCreators({
    cancelMissionSlot,
    reserveMissionSlot,
    missionGetCards,
    setTags,
    resetClientTagData,
  }, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
class ReserveConfirm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      objective: '',
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.handleCloseModalClick = this.handleCloseModalClick.bind(this);
    this.handleChangeObjective = this.handleChangeObjective.bind(this);
    this.handleBlurMissionObjective = this.handleBlurMissionObjective.bind(this);
    this.cancelMissionAndCloseModal = this.cancelMissionAndCloseModal.bind(this);
  }

  componentWillMount() {
    this.setState({
      objective: '',
    });

    this.props.actions.resetClientTagData();
  }

  onSubmit(event) {
    event.preventDefault();
    const currentMission = this.props.currentMissionSlot.missionList[0];

    this.props.actions.reserveMissionSlot({
      callSource: 'recommends',
      ...currentMission,
      objectTitle: currentMission.title,
    });

    this.props.actions.missionGetCards();

  }

  cancelMissionSlot() {
    const { currentMissionSlot } = this.props;
    const {
      scheduledMissionId,
      uniqueId
    } = currentMissionSlot.missionList[0];

    this.props.actions.cancelMissionSlot({
      scheduledMissionId,
      uniqueId,
      grabType: 'notarget',
      callSource: 'recommends',
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

  handleChangeObjective(event) {
    this.setState({ objective: event.target.value });
  }

  handleBlurMissionObjective(event) {
    const currentMission = this.props.currentMissionSlot.missionList[0];
    const { scheduledMissionId } = currentMission;
    const text = this.state.objective.trim();

    this.props.actions.setTags({
      tagClass: 'mission',
      tagType: 'objective',
      text,
      scheduledMissionId,
    });
  }

  /**
    @handleMissionReservationResponse
    deals with displaying success or error templates based on the
    the current state
  */
  handleMissionReservationResponse() {
    const {
      currentMissionSlot,
      closeModal,
    } = this.props;

    const { apiError, errorCode, errorMsg } = currentMissionSlot;
    const missionData = currentMissionSlot.missionList[0];

    return (
      apiError ?
        <ReservationError
          closeModal={closeModal}
          errorCode={errorCode}
          message={errorMsg}
        />
        :
        <NewMissionReservationSuccess
          closeModal={closeModal}
          missionStartTime={missionData.missionStart}
          missionTitle={missionData.title}
          objectIconURL={missionData.objectIconURL}
        />
    );
  }

  render () {

    const {
      open,
      currentMissionSlot,
      closeModal,
      missionSlotJustReserved,
    } = this.props;

    // validate whether or not we have a mission slot ready to render
    if(_.isEmpty(currentMissionSlot)) { return null; }

    const missionData = currentMissionSlot.missionList[0];
    const formattedUTCDate = new Date(missionData.missionStart * 1000);

    const EST_start = moment.tz(formattedUTCDate, 'America/New_York').format('dddd, MMMM Do');
    const EST_start_time = moment.tz(formattedUTCDate, 'America/New_York').format('h:mma z');
    const PST_start_time = moment.tz(formattedUTCDate, 'America/Los_Angeles').format('h:mma z');
    const UTC_start_time = moment.utc(formattedUTCDate).format('HH:mm z');

    const inlineButtonRowStyle = {
      'width': '60%',
      'margin': '0 auto 20px auto',
    };

    return (
      <Modal show={open} className="missionModal reserveMissionModal">

        {
          missionSlotJustReserved ?
            this.handleMissionReservationResponse()
          :
          <div>
            <div className="title-bar">
              <div className="icon"><img width="25" height="25" src="https://vega.slooh.com/icons/reservations/stopwatch.svg" /></div>
              <h3 className="title">
                Please complete your reservation form within <InlineCountdown startTime={missionData.expires} exitAction={this.cancelMissionAndCloseModal} />
              </h3>
            </div>

            <div className="modal-header">
              <h1 className="title-secondary">You’re reserving the { missionData.telescopeName } telescope to see:</h1>
              <img className={styles.cardIcon} src={ missionData.objectIconURL } />
              <h2 className="mission-title">{ missionData.title }</h2>
            </div>

            <div className="modal-body">
              <div className="mission-schedule">
                <h4>Mission Details:</h4>
                <p>{ EST_start } &middot; { EST_start_time } &middot; { PST_start_time } &middot; { UTC_start_time }</p>
              </div>

              <div className="share-objectives">
                <h4>SHARE YOUR MISSION OBJECTIVES:</h4>
                <textarea
                  className="mission-objectives"
                  placeholder="It’s optional, but would you consider succinctly describing your thoughts on the mission? Anything goes, tweet style."
                  value={this.state.objective}
                  onBlur={this.handleBlurMissionObjective}
                  onChange={this.handleChangeObjective}></textarea>
              </div>

              <div className="mission-tags">
                <MissionTags
                  tagClass={ `mission` }
                  tagType={ `user` }
                  scheduledMissionId={ missionData.scheduledMissionId }
                />
              </div>
            </div>

            <div className="modal-footer">
              <div style={inlineButtonRowStyle} className="button-row">
                <button className="btn-primary" onClick={ this.handleCloseModalClick }>Sorry, Cancel This.</button>
                <button className="btn-primary" onClick={ this.onSubmit }>Absolutely!</button>
              </div>
            </div>
          </div>
        }

      </Modal>
    )
  }
}

ReserveConfirm.propTypes = {};

export default ReserveConfirm;
