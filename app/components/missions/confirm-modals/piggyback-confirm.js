import React, { Component, PropTypes } from 'react';
import { Modal, Button } from 'react-bootstrap';
import styles from '../mission-modals.scss';
import moment from 'moment-timezone';

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

    /**
      starttime is provided in UTC format
    */
    const EST_start = moment.tz(missionStart, 'America/New_York').format('dddd, MMMM Do');
    const EST_start_time = moment.tz(missionStart, 'America/New_York').format('h:mma z');
    const PST_start_time = moment.tz(missionStart, 'America/Los_Angeles').format('h:mma z');
    const UTC_start_time = moment(missionStart).format('HH:mm');

    return (
      <Modal show={ open } className={ styles.missionModal }>
        <Modal.Header>
          <h1 className="title">Strap yourself in</h1>
          <h2 className="title-secondary">Your are joining a pre-scheduled mission to:</h2>
        </Modal.Header>
        <Modal.Body>

          <div className="mission-name">
            <img className={styles.cardIcon} src="assets/icons/Jupiter.svg" />
            <h4>{ title }</h4>
            <p className="headline">{ headline }</p>
          </div>

          <div className="mission-schedule">
            <h4>Mission Details:</h4>
            <p>
              { EST_start }<br />
              { EST_start_time } &middot; { PST_start_time } &middot; { UTC_start_time } UTC<br />
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
