import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classnames from 'classnames';
import styles from './mission-card.scss';
import moment from 'moment';

class NewMissionCard extends Component {

  render() {
    const { openModal, reservation, card } = this.props;

    const startTime = reservation.missionStart;
    const featured = card.cardType == 2;
    const className = `${styles.missionCard} ${featured ? 'featured col-md-12' : 'secondary col-md-6'}`;
    const EST_start = moment.unix(startTime).utcOffset(-5, false).format('dddd, MMMM Do');
    const EST_start_time = moment.unix(startTime).utcOffset(-5, false).format('hh:mm a');
    const PST_start_time = moment.unix(startTime).utcOffset(-8, false).format('hh:mm a');
    const UTC_start_time = moment.unix(startTime).format('hh:mm a');

    return (
      <div className={className}>
        { featured ? <span className="callOut">Dont Miss</span> : null }

        <h2>{ card.headline }</h2>

        <div className={ styles.cardsubTitle }>
          <img className={ styles.cardIcon } src="assets/icons/Jupiter.svg" />
          <h3>{ card.title }</h3>
        </div>

        <p>{ card.description }</p>

        <div className="join-mission-callout">
          <h5>Join an existing mission</h5>
          <p>
            <strong>{ EST_start }</strong>: {
              !featured ? <br /> : null
            } { EST_start_time } EST  ·  { PST_start_time } PST  ·  { UTC_start_time } UTC</p>

          {
            reservation.missionAvailable ?
            <Link
                className={ styles.piggybackCta }
                to="#"
                onClick={ (event) => { openModal(card, 'piggyBack', event) } }>
                Reserve
            </Link> :
            <p>No mission is available at this time.</p>
          }
        </div>
      </div>
    );
  }
}

NewMissionCard.propTypes = {
  openModal: PropTypes.func,
};

export default NewMissionCard;
