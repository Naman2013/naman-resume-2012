import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classnames from 'classnames';
import styles from './mission-card.scss';

const MissionCard = (props) => {

    let featured = props.featured;
    let className = `${styles.missionCard} ${props.className || ''}`;
    const card = props.card;

    return (
      <div className={className}>
        { props.className === 'featured' ? <span className="callOut">Don't Miss</span> : null }

        <h2>{card.headline}</h2>

        <div className={styles.cardsubTitle}>
          <img className={styles.cardIcon} src="assets/icons/Jupiter.svg" />
          <h3>{card.title}</h3>
        </div>

        <p>{card.description}</p>


        <div className="join-mission-callout">
          <h5>Join an existing mission</h5>
          <p><strong>Thursday, October 18th</strong>: {!featured ? <br /> : null} 10:05pm EST  ·  7:05pm PST  ·  03:05 UTC 03:05 UTC</p>
          <a className={styles.piggybackCta} href="" onClick={ event => props.openModal('reserve', event) }>Reserve</a>
          <a className={styles.piggybackCta} href="" onClick={ event => props.openModal('piggyBack', event) }>Piggyback on mission</a>
        </div>
      </div>
    );
}

export default MissionCard;
