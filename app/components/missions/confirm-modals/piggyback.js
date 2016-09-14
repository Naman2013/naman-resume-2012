import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import styles from '../mission-modals.scss';

const PiggyBackConfirm = (props) => {
  console.log(props);
  return (
    <Modal show={props.mission.isConfirmationOpen} className={styles.missionModal}>
      <Modal.Header>
        <h1>Strap yourself in</h1>
        <h2>Your are joining a pre-scheduled mission to:</h2>
      </Modal.Header>
      <Modal.Body>

        <div className="mission-name">
          <img className={styles.cardIcon} src="../../../assets/icons/Jupiter.svg" />
          <h4>Jupiter</h4>
          <p>(Carefully, the gravity is 2.5 times of earth, so tread lightly.)</p>
        </div>

        <div className="mission-schedule">
          <h4>Mission Details:</h4>
          <p>Thursday, October 18th<br />
              10:05pm EST, 7:05pm PST, 3:05 UTC<br />
            Canary Islands
          </p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button className="btn-primary" onClick={props.closeModal}>Sorry, Cancel this.</Button>
        <Button className="btn-primary" onClick={props.closeModal}>Absolutely!</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default PiggyBackConfirm;
