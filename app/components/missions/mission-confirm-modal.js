import React, {Component, PropTypes} from 'react';
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

export default class MissionConfirmModal extends React.Component {

  static propTypes = {
    actions: PropTypes.object.isRequired
  }

  closeModal(event) {
    event.preventDefault();
    this.props.actions.missionConfirmClose();
  }



  render() {    
    return (
      this.props.missions.confirmType === 'reserve' ? <ReserveConfirm mission={this.props.missions} closeModal={this.closeModal.bind(this)} />  : <PiggyBackConfirm mission={this.props.missions} closeModal={this.closeModal.bind(this)} />
    )
  }
};
