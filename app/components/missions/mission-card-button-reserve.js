import React, { Component, PropTypes } from 'react';
import styles from './mission-card.scss';

const MissionCardButtonReserve = (props) => {

  return (
    <a
        className={styles.piggybackCta}
        href=""
        onClick={event => props.openModal(props.card, 'reserve', event)}
      >Reserve</a>
  )
}

export default MissionCardButtonReserve;
