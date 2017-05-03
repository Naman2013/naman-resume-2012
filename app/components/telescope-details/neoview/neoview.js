import React, { Component } from 'react';
import Progress from 'react-progressbar';
import classnames from 'classnames';
import styles from './neoview.scss';

export default class Neoview extends Component {

  state = {
    latestMessage: null,
    messages: [],
    toggleNeoview: false,
    showToggleOption: this.props.showToggleOption,
  }

  componentDidMount() {
    const { port, teleSystem, currentMissionServerTime } = this.props;

    const neoUrl = this.generateNeoSource(port, teleSystem);
    this.sseSource = new EventSource(neoUrl);
    this.sseSource.addEventListener(
      'message',
      event => this.handleNeoMessages(event.data), false
    )
  }

  componentWillUnmount() {
    this.sseSource.close();
    this.sseSource.removeEventListener('message', this.handleNeoMessages, false);
  }

  handleNeoMessages(data) {
    const messages = this.state.messages;
    const message = JSON.parse(data);
    const notHeartbeat = message.messageType !== 'HEARTBEAT';
    if (notHeartbeat) {
      const latestMessage = `${message.messageText ? message.messageText : ''} ${message.logMessage}`;
      this.setState({
        latestMessage,
        messages: [latestMessage, ...messages],
      });
    }
  }

  generateNeoSource(port, scope) {
    return `/dev-sse/${port}/sse/${scope}`;
  }

  /**
    * Handling toggle click of neo view (progress bar arrow)
    * by default the state of neo view is false (hidden)
    * when user clicks arrow the state is being updated which shows/hides neo view overlay
    */
  handleToggleNeoview = () => {
    this.setState({
      messages: [],
      toggleNeoview: !this.state.toggleNeoview
    });
  }

  render() {
    const { percentageMissionTimeRemaining } = this.props;
    const neoviewContainerClassnames = classnames('neoview-wrapper', {
      visible: this.state.toggleNeoview,
      hidden: !this.state.toggleNeoview,
    });

    console.log('looking to fix the undefined messages.');
    console.log(this.state);

    return (
      <div className="neoview-container">

        <div className={neoviewContainerClassnames}>
          {this.state.messages && this.state.messages.map((msg, index) => {
            return (
              <div className="neo-message" key={index}>
                <div className="col-md-4 neo-message-time">{`${msg[0]}`}</div>
                <div className="col-md-8 neo-message-text">{ msg[1] ? msg[1] : '' }</div>
              </div>
            );
          })}
        </div>

        <div className="top">

          <Progress completed={percentageMissionTimeRemaining} color="#589A9A" height="35px" />

          <p className="short">
            {this.state.latestMessage}
          </p>
          {
            <div className="toggle-description" onClick={this.handleToggleNeoview}>
              {
                (this.props.showToggleOption && this.state.toggleNeoview) ?
                  <i className="fa fa-angle-down" /> : <i className="fa fa-angle-up" />
              }
            </div>
          }
        </div>

      </div>
    )
  }

}
