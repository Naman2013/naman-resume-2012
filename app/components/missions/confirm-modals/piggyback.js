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
    const { mission, time, closeModal } = this.props;

    if (mission.hasOwnProperty('missionList')) {
      time.EST_start = moment.unix(mission.missionList[0].missionStart).utcOffset(-5, false).format("dddd, MMMM Do");
      time.EST_start_time = moment.unix(mission.missionList[0].missionStart).utcOffset(-5, false).format("hh:mm a");
      time.PST_start_time = moment.unix(mission.missionList[0].missionStart).utcOffset(-8, false).format("hh:mm a");
      time.UTC_start_time = moment.unix(mission.missionList[0].missionStart).format("hh:mm a");
    }

    return (
      <Modal show={mission.isConfirmationOpen} className={styles.missionModal}>
        <Modal.Header>
          <h1>Strap yourself in</h1>
          <h2>Your are joining a pre-scheduled mission to:</h2>
        </Modal.Header>
        <Modal.Body>

          <div className="mission-name">
            <img className={styles.cardIcon} src="assets/icons/Jupiter.svg" />
            <h4>Jupiter</h4>
            <p>(Carefully, the gravity is 2.5 times of earth, so tread lightly.)</p>
          </div>

          <div className="mission-schedule">
            <h4>Mission Details:</h4>
            <p>{time.EST_start}<br />
                {time.EST_start_time} EST, {time.PST_start_time} PST, {time.UTC_start_time} UTC<br />
              Canary Islands
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn-primary" onClick={closeModal}>Sorry, Cancel this.</Button>
          <Button className="btn-primary" onClick={this.handleReservationClick}>Absolutely!</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}


PiggyBackConfirm.defaultProps = {
  mission: {
    missionList: []
  },
  time: {
    EST_start : '',
    EST_start_time: '',
    PST_start_time: '',
    UTC_start_time: ''
  }
};

export default PiggyBackConfirm;
