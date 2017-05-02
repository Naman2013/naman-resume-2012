import React, { Component } from 'react';
import Progress from 'react-progressbar';
import styles from './neoview.scss';

export default class Neoview extends Component {

  state = {
    latestMassege: null,
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
      this.setState({
        latestMassege: `${message.messageText ? message.messageText : ''} ${message.logMessage}`,
        messages: [notHeartbeat, ...messages],
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

    return (
      <div className="neoview-container">
        <div className={`neoview-wrapper ${this.state.toggleNeoview ? 'visible' : 'hidden'}`}>
          {this.state.messages && this.state.messages.map((msg, index) => {
            return (
              <div className="neo-message" key={index}>
                <div className="col-md-4 neo-message-time">{`${msg[0]} `}</div>
                <div className="col-md-8 neo-message-text">{ msg[1] ? msg[1] : '' }</div>
              </div>
            );
          })}
        </div>

        <div className="top">

          <Progress completed={percentageMissionTimeRemaining} color="#589A9A" height="35px" />

          <p className="short">
            {this.state.latestMassege}
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
