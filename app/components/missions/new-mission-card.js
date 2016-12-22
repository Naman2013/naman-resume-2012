import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import classnames from 'classnames';
import styles from './mission-card.scss';
import moment from 'moment-timezone';
import _ from 'lodash';

import {
  updateSingleReservations,
  grabMissionSlot,
  updateSinglePiggyback } from '../../modules/Missions';

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      updateSingleReservations,
      grabMissionSlot,
    }, dispatch)
  };
}

@connect(null, mapDispatchToProps)
class NewMissionCard extends Component {

  constructor(props) {
    super(props);

    this.handleMakeReservationClick = this.handleMakeReservationClick.bind(this);
    this.updateReservation = this.updateReservation.bind(this);
  }

  updateReservation() {
    const { uniqueId } = this.props.card;
    const { objectId } = this.props.reservation;
    const { updateSingleReservations } = this.props.actions;

    updateSingleReservations(uniqueId, objectId);
  }

  componentDidMount() {
    const { expires } = this.props.reservation;
    const timer = moment.unix(expires).diff(moment());
    this.updateReservationTimeout = setInterval(this.updateReservation, timer);
  }

  componentWillUnmount() {
    clearInterval(this.updateReservationTimeout);
  }

  handleMakeReservationClick(event) {
    event.preventDefault();
    const { openModal, card, reservation } = this.props;
    const { grabMissionSlot } = this.props.actions;

    const mission = {
      ...reservation,
      callSource: 'recommends',
      objectTitle: card.title,
      objectType: card.objectType,
    };

    grabMissionSlot(mission);

    openModal('reserve', card);
  }

  renderMissionTime() {
    const { featured } = this.props;
    const { missionStart } = this.props.reservation;

    const formattedUTCDate = new Date(missionStart * 1000);

    const EST_start = moment.tz(formattedUTCDate, 'America/New_York').format('dddd, MMMM Do');
    const EST_start_time = moment.tz(formattedUTCDate, 'America/New_York').format('h:mma z');
    const PST_start_time = moment.tz(formattedUTCDate, 'America/Los_Angeles').format('h:mma z');
    const UTC_start_time = moment.utc(formattedUTCDate).format('HH:mm z');

    return(
      <div className="mission-available">
        <p className="start-time">
          <strong>{ EST_start }{ featured ? ':' : '' }</strong>
          { !featured ? <br /> : null} { EST_start_time } <span className="highlight">&middot;</span> { PST_start_time } <span className="highlight">&middot;</span> { UTC_start_time }
        </p>
      </div>
    );
  }

  renderCallToAction() {
    const { missionAvailable, missionStart } = this.props.reservation;
    const { openModal, card, featured } = this.props;

    if(missionAvailable) {
      return(
        <div>
          {this.renderMissionTime()}
          <Link
            className={ styles.piggybackCta }
            to="#"
            onClick={ this.handleMakeReservationClick }>
            Make Reservation
          </Link>
        </div>
      );
    }

    return null;
  }

  determineMissionStatusMessage() {
    const { reservation } = this.props;

    if(reservation.userHasReservation) {
      return(
        <div>
          <h5 className="mission-status">You have an upcoming { reservation.userReservationType } reservation scheduled for</h5>
          <div className="join-mission-callout">
            {this.renderMissionTime()}
          </div>
        </div>
      );
    }

    if(reservation.missionAvailable) {
      return(
        <h5 className="mission-status">Set up a new mission</h5>
      );
    }

    if(!reservation.missionAvailable) {
      return(
        <h5 className="mission-status">No missions are available</h5>
      );
    }
  }

  render() {
    const { openModal, reservation, card, featured } = this.props;
    const { headline, title, description } = card;
    const { missionStart, missionAvailable } = reservation;

    /**
      NOTE:
      The resolution of these classnames will determine the shape
      of the painted element.  When the element is non-featured, notice
      how col-md-6 is applied.
    */
    const newMissionCardContainerClasses = classnames({
      [styles.missionCard]: 1,
      'featured col-md-12': featured,
      'secondary col-md-6': !featured,
    });

    return (
      <div className={ newMissionCardContainerClasses }>

        <div className="card-content-container">
          {
            featured ?
            <span className="callOut"><span className="first-word">Don&apos;t</span> Miss</span> : null
          }

          <h2>{ headline }</h2>

          <div className={ styles.cardsubTitle }>
            <img className={ styles.cardIcon } src="assets/icons/Jupiter.svg" />
            <h3>{ title }</h3>
          </div>

          {
            featured ?
              <p className={ styles.cardDescription }>{ description }</p>
              :
              <p className={ styles.cardDescription }>{ _.truncate(description, { 'length': 130, 'separator': ' ' }) }</p>
          }

          {
            this.determineMissionStatusMessage()
          }

          <div className="join-mission-callout">
            {this.renderCallToAction()}
          </div>
        </div>

      </div>
    );
  }
}

NewMissionCard.propTypes = {
  openModal: PropTypes.func,
  card: PropTypes.object,
  featured:  PropTypes.bool,
  reservation: PropTypes.shape({
    missionAvailable: PropTypes.bool,
    missionStart: PropTypes.number,
    objectId: PropTypes.number,
  }),
};

export default NewMissionCard;
