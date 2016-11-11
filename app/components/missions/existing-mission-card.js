import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classnames from 'classnames';
import styles from './mission-card.scss';
import moment from 'moment';

const ExistingMissionCard = ({ card, piggyback, openModal }) => {

  const startTime = piggyback.missionStart;
  const featured = card.cardType == 2;
  const className = `${styles.missionCard} ${featured ? 'featured col-md-12' : 'secondary col-md-6'}`;
  const EST_start = moment.unix(startTime).utcOffset(-5, false).format("dddd, MMMM Do");
  const EST_start_time = moment.unix(startTime).utcOffset(-5, false).format("hh:mm a");
  const PST_start_time = moment.unix(startTime).utcOffset(-8, false).format("hh:mm a");
  const UTC_start_time = moment.unix(startTime).format("hh:mm a");

  const startMissionTime = () => {
    return(
      <p>
        <strong>{EST_start}</strong>: { !featured ? <br /> : null} { EST_start_time } EST · { PST_start_time } PST · { UTC_start_time } UTC
      </p>
    );
  }

  const missionAvailable = () => {
    return (
      <div>
        <h5>Join an existing mission</h5>
        { startMissionTime() }
        <a
          className={styles.piggybackCta}
          href="#"
          onClick={event => openModal(card, 'piggyBack', event)}>
          Piggyback on Mission
        </a>
      </div>
    )
  }

  const missionNotAvailable = () => {
    if(piggyback.userHasReservation) {
      return (
        <div>
          { startMissionTime() }
          <p>You have an upcoming { piggyback.userReservationType } reservation scheduled for { startMissionTime() }</p>
        </div>
      )
    } else {
      return (
        <div>
          <h5>No existing missions are available</h5>
          <Link
            className={styles.piggybackCta}
            to="/reservations/slooh-recommends/new">
            Make Reservation
          </Link>
        </div>
      )
    }
  }

  return (
    <div className={className}>
      { featured ? <span className="callOut">Don't Miss</span> : null }
      <h2>{card.headline}</h2>

      <div className={styles.cardsubTitle}>
        <img className={styles.cardIcon} src="assets/icons/Jupiter.svg" />
        <h3>{card.title}</h3>
      </div>

      <p>{card.description}</p>

      <div className="join-mission-callout">
        { piggyback.missionAvailable ? missionAvailable() : missionNotAvailable() }
      </div>
    </div>
  );
}

export default ExistingMissionCard;
