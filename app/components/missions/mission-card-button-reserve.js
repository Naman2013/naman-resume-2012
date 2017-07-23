import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import styles from './mission-card.scss';

class MissionCardButtonReserve extends Component {

  constructor(props) {
    super(props);

    this.handleOpenModal = this.handleOpenModal.bind(this);
  }

  handleOpenModal(event) {
    event.preventDefault();
    const { openModal, card } = this.props;
    openModal(card, 'reserve', event);

    // TODO: call getNextPiggyback
    // resolve the promise, and toggle the result

    // TODO: on result of the API, either open the modal, OR open the "login or signup modal"
  }

  render() {
    const { openModal, card } = this.props;

    return(
      <Link
          className={ styles.piggybackCta }
          to="#"
          onClick={ this.handleOpenModal }>
          Reserve
      </Link>
    );
  }
}

MissionCardButtonReserve.propTypes = {
  card: PropTypes.object,
  openModal: PropTypes.func,
};

export default MissionCardButtonReserve;
