import React, { Component, Props } from 'react';
import moment from 'moment';
import ModalGeneric from './modals/modal-generic';
import styles from './common.scss';

class UniversalTime extends Component {

  constructor(props) {
    super(props);

    this.state = {
      time: moment.utc().format('HH:mm:ss'),
      displayUTCModal: false,
    };

    this.handleToggleModal = this.handleToggleModal.bind(this);
  }

  componentDidMount() {
    this.intervalCounter = setInterval(this.timer.bind(this), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalCounter);
  }

  timer() {
    this.setState({ time: moment.utc().format('HH:mm:ss') });
  }

  handleToggleModal(event) {
    event.preventDefault();
    const { displayUTCModal } = this.state;
    this.setState({
      displayUTCModal: !displayUTCModal,
    });
  }

  render() {
    const { displayUTCModal } = this.state;
    const className = `${styles.universalTime} ${this.props.extraClass || ''}`;
    return (
      <div className={className}>
        <span className="light-gray">Universal Time: </span>
        <span className="time"><b>{this.state.time}</b></span>
        <br />
        <a
          onClick={this.handleToggleModal}
          className="time-action" href="#">What is UTC?</a>

        <ModalGeneric
          closeModal={this.handleToggleModal}
          open={displayUTCModal}
          title={`What is UTC?`}
          description={`Coordinated Universal Time (UTC) is the time standard used by astronomers and Slooh to coordinate the timing of observations from different locations around the world.`}
        />
      </div>
    )
  }
}

export default UniversalTime;
