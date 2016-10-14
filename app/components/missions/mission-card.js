import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classnames from 'classnames';
import styles from './mission-card.scss';
import moment from 'moment';
import MissionCardButtonReserve from './mission-card-button-reserve';
import MissionCardButtonPiggyback from './mission-card-button-piggyback';

const MissionCard = (props) => {
    
    const { card, piggyback, openModal } = props;
        
    let featured = props.card.cardType == 2;
    let className = `${styles.missionCard} ${featured ? 'featured col-md-12' : 'secondary col-md-6'}`;    
    let EST_start = moment.unix(card.start).utcOffset(-5, false).format("dddd, MMMM Do");
    let EST_start_time = moment.unix(card.start).utcOffset(-5, false).format("hh:mm a");
    let PST_start_time = moment.unix(card.start).utcOffset(-8, false).format("hh:mm a");
    let UTC_start_time = moment.unix(card.start).format("hh:mm a");

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
          <h5>Join an existing mission</h5>
          <p><strong>{EST_start}</strong>: {!featured ? <br /> : null} {EST_start_time} EST  ·  {PST_start_time} PST  ·  {UTC_start_time} UTC</p>

          {piggyback && piggyback.missionAvailable ? <MissionCardButtonPiggyback openModal={openModal} card={card} /> : <MissionCardButtonReserve openModal={openModal} card={card} />}
        </div>
      </div>
    );
}

export default MissionCard;
