import React, {Component, PropTypes} from 'react';
import { Modal, Button } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classnames from 'classnames';
import styles from './mission-card.scss';
import {missionConfirmOpen, missionConfirmClose} from './../../modules/Missions';


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
        <Modal show={this.props.missions.isConfirmationOpen}>
          <Modal.Header>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Text in a modal</h4>
            <p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.closeModal.bind(this)}>Close</Button>
          </Modal.Footer>
        </Modal>
    )
  }
};
