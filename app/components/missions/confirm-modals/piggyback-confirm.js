import React, { Component, PropTypes } from 'react';
import { Modal, Button } from 'react-bootstrap';
import styles from '../mission-modals.scss';
import moment from 'moment';

class PiggyBackConfirm extends Component {

  constructor(props) {
    super(props);

    this.handleReservationClick = this.handleReservationClick.bind(this);
  }

  handleReservationClick(event) {
    event.preventDefault();
    const { closeModal } = this.props;
    console.log('Time to make a reservation!!!');
    closeModal();
  }

  render() {

    const { mission, closeModal, open, currentCard } = this.props;

    if( !mission.hasOwnProperty('missionList') ) { return null; }

    const currentMission = mission.missionList[0];
    const { missionStart } = currentMission;
    const { title, headline } = currentCard;

    const EST_start = moment.unix(missionStart).utcOffset(-5, false).format('dddd, MMMM Do');
    const EST_start_time = moment.unix(missionStart).utcOffset(-5, false).format('hh:mm a');
    const PST_start_time = moment.unix(missionStart).utcOffset(-8, false).format('hh:mm a');
    const UTC_start_time = moment.unix(missionStart).format('hh:mm a');

    console.group('piggyback confirm');
    console.log(this.props.currentCard);
    console.groupEnd();

    return (
      <Modal show={ open } className={ styles.missionModal }>
        <Modal.Header>
          <h1>Strap yourself in</h1>
          <h2>Your are joining a pre-scheduled mission to:</h2>
        </Modal.Header>
        <Modal.Body>

          <div className="mission-name">
            <img className={styles.cardIcon} src="assets/icons/Jupiter.svg" />
            <h4>{ title }</h4>
            <p>{ headline }</p>
          </div>

          <div className="mission-schedule">
            <h4>Mission Details:</h4>
            <p>
              { EST_start }<br />
              { EST_start_time } EST, { PST_start_time } PST, { UTC_start_time } UTC<br />
              Canary Islands
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn-primary" onClick={closeModal}>Sorry, Cancel This.</Button>
          <Button className="btn-primary" onClick={ this.handleReservationClick }>Absolutely!</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

PiggyBackConfirm.propTypes = {
  open: PropTypes.bool,
  currentCard: PropTypes.shape({
    title: PropTypes.string,
  }),
};

export default PiggyBackConfirm;
