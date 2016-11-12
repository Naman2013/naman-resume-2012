import React, { Component, PropTypes } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classnames from 'classnames';
import {missionConfirmOpen, missionConfirmClose} from './../../modules/Missions';
import styles from './mission-modals.scss';
import PiggyBackConfirm from './confirm-modals/piggyback';
import ReserveConfirm from './confirm-modals/reserve';


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

  static propTypes = {
    actions: PropTypes.object.isRequired
  }

  closeModal(event) {
    event.preventDefault();
    this.props.actions.missionConfirmClose();
  }

  render() {
    console.group('From mission confirm modal');
    console.log(this.props.missions);
    console.groupEnd();
    const currentMission = this.props.missions[0];

    return (
      this.props.missions.confirmType === 'reserve' ?
        <ReserveConfirm
          mission={ currentMission }
          closeModal={ this.closeModal } />
        :
        <PiggyBackConfirm
          mission={ currentMission }
          closeModal={ this.closeModal } />
    )
  }
};

export default MissionConfirmModal;
