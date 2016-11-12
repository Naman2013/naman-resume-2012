import React, { Component, PropTypes } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classnames from 'classnames';
import {missionConfirmOpen, missionConfirmClose} from './../../modules/Missions';
import styles from './mission-modals.scss';
import PiggyBackConfirm from './confirm-modals/piggyback-confirm';
import ReserveConfirm from './confirm-modals/reserve-confirm';


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

    return (
      confirmType === 'reserve' ?
        <ReserveConfirm
          mission={ mission }
          closeModal={ this.closeModal } />
        :
        <PiggyBackConfirm
          mission={ mission }
          currentCard={ currentCard }
          open={ isConfirmationOpen }
          closeModal={ this.closeModal } />
    )
  }
};

export default MissionConfirmModal;
