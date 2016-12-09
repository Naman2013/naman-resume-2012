import React, { Component, PropTypes } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classnames from 'classnames';
import {missionConfirmOpen, missionConfirmClose} from './../../modules/Missions';
import styles from './mission-modals.scss';
import PiggyBackConfirm from './confirm-modals/piggyback-confirm';
import ReserveConfirm from './confirm-modals/reserve-confirm';

// types of reservations...
const RESERVE = 'reserve';
const PIGGYBACK = 'piggyback';

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      missionConfirmOpen,
      missionConfirmClose
    }, dispatch)
  };
}

function mapStateToProps({ missions }) {
  return { missions };
}

@connect(mapStateToProps, mapDispatchToProps)
class MissionConfirmModal extends Component {

  constructor(props) {
    super(props);

    this.closeModal = this.closeModal.bind(this);
  }

  closeModal() {
    this.props.actions.missionConfirmClose();
  }

  render() {
    const {
      mission,
      isConfirmationOpen,
      confirmType,
      currentCard } = this.props.missions;

    if(confirmType === RESERVE) {
      return(
        <ReserveConfirm
          currentCard={currentCard}
          open={isConfirmationOpen}
          closeModal={this.closeModal} />
      );
    }

    if(confirmType === PIGGYBACK) {
      return(
        <PiggyBackConfirm
          mission={mission}
          currentCard={currentCard}
          open={isConfirmationOpen}
          closeModal={this.closeModal} />
      );
    }

    return null;
  }
};

export default MissionConfirmModal;
