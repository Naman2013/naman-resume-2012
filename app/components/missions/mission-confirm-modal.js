import React, {Component, PropTypes} from 'react';
import { Modal, Button } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classnames from 'classnames';
import {missionConfirmOpen, missionConfirmClose} from './../../modules/Missions';
import styles from './mission-modals.scss';


function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      missionConfirmOpen,
      missionConfirmClose}, dispatch)
  };
}

function mapStateToProps({ missions }) {
  return { missions };
}

@connect(mapStateToProps, mapDispatchToProps)

export default class MissionConfirmModal extends React.Component {

  static propTypes = {
    actions: PropTypes.object.isRequired
  }

  closeModal(event) {
    event.preventDefault();
    this.props.actions.missionConfirmClose();
  }

  render() {
    console.log(this);
    return (
        <Modal show={this.props.missions.isConfirmationOpen} className={styles.missionModal}>
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
            <Button className="btn-primary" onClick={this.closeModal.bind(this)}>Sorry, Cancel this.</Button>
            <Button className="btn-primary" onClick={this.closeModal.bind(this)}>Absolutely!</Button>
          </Modal.Footer>
        </Modal>
    )
  }
};
