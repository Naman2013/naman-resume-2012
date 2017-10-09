import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Progress from 'react-progressbar';
import classnames from 'classnames';
import uniqueId from 'lodash/uniqueId';
import noop from 'lodash/noop';
import NeoViewDescription from './NeoViewDescription';
import NewViewMessage from './NeoViewMessage';
import s from './neoview.scss';

// TODO: display a timestamp with each message

export default class Neoview extends Component {
  static propTypes = {
    toggleNeoview: PropTypes.func,
    neoviewOpen: PropTypes.bool,
  };

  static defaultProps = {
    toggleNeoview: noop,
    displayNeoview: false,
  };

  state = {
    latestMessage: null,
    messages: [],
    toggleNeoview: false,
  }

  componentDidMount() {
    this.bootstrapSSE();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.teleSystem !== this.props.teleSystem) {
      this.resetSSE();
    }
  }

  componentWillUnmount() {
    this.tearDownSSE();
  }

  bootstrapSSE() {
    const { teleSystem, currentMissionServerTime } = this.props;

    const neoUrl = `/sselog/${teleSystem}`;
    this.sseSource = new EventSource(neoUrl);
    this.sseSource.addEventListener(
      'message',
      event => this.handleNeoMessages(event.data), false);
  }

  tearDownSSE() {
    this.sseSource.close();
    this.sseSource.removeEventListener('message', this.handleNeoMessages, false);
  }

  resetSSE() {
    this.setState({
      latestMessage: null,
      messages: [],
      toggleNeoview: false,
    });
    this.tearDownSSE();
    this.bootstrapSSE();
  }

  handleNeoMessages(data) {
    const messages = this.state.messages;
    const message = JSON.parse(data);
    const notHeartbeat = message.messageType !== 'HEARTBEAT';

    if (notHeartbeat) {
      this.setState({
        latestMessage: message.logMessage,
        messages: [message.logMessage, ...messages],
      });
    }
  }

  /**
    * Handling toggle click of neo view (progress bar arrow)
    * by default the state of neo view is false (hidden)
    * when user clicks arrow the state is being updated which shows/hides neo view overlay
    * we prepend the most recent message and the neoview description
    */
  handleToggleNeoview = () => {
    // call provided prop method to ensure parent controls the display state
    this.props.toggleNeoview();
    // update internal state to reflect the appropriate message structure
    this.setState(prevState => ({
      messages: [prevState.latestMessage],
    }));
  }

  render() {
    const {
      percentageMissionTimeRemaining,
      neoviewOpen
    } = this.props;

    const neoviewContainerClassnames = classnames('neoview-wrapper', {
      hidden: !neoviewOpen,
    });

    return (
      <div
        onClick={this.handleToggleNeoview}
        className="neoview-container"
      >
        <div className={neoviewContainerClassnames}>
          {
            this.state.messages.map(
              message => <NewViewMessage key={uniqueId()} message={message} />)
          }
          <NeoViewDescription />
        </div>

        <div className="top">
          <Progress completed={percentageMissionTimeRemaining} color="#589A9A" height="35px" />
          <div className={s.progressBarStatus}>
            <p className="short">
              {this.state.latestMessage}
            </p>
          </div>
        </div>

        <style jsx>{`
          .neoview-dismiss-button {
            border: none;
            background: transparent;
            display: block;
            padding: 0;
            margin: 0;
            width: 100%;
            height: 100%;
            text-align: left;
          }
        `}</style>
      </div>
    );
  }
}
