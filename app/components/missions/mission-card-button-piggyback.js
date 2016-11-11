import React, { Component, PropTypes } from 'react';
import styles from './mission-card.scss';


const MissionCardButtonPiggyback = (props) => {

  return (
    <a
      className={styles.piggybackCta}
      href="#"
      onClick={event => props.openModal(props.card, 'piggyBack', event)}>
      Piggyback on Mission
    </a>
  )
}

export default MissionCardButtonPiggyback;
